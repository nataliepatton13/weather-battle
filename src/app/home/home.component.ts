import { CityComponent } from './../city/city.component';
import { Weather, CityInfo, City, WeatherResults } from './../shared/model/weather';
import { WeatherService } from './../shared/services/weather.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':leave', [
          animate('500ms 100ms', style({ transform: 'translateY(-1000px)'}))
        ])
      ])],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('city1') city1Ref: CityComponent;
  @ViewChild('city2') city2Ref: CityComponent;
  city1: City;
  city2: City;
  error = false;
  submitted = false;
  winnerChosen = false;
  forecastPeriodOptions = [
    { value: '1', viewValue: 'Today' },
    { value: '7', viewValue: 'One Week' },
    { value: '10', viewValue: 'Ten Days' }
  ];
  selectedForecastPeriod: string = this.forecastPeriodOptions[1].value;

  constructor(private weatherService: WeatherService) { }

  compareForecasts() {
    this.city1Ref.cityFormControl.markAsTouched();
    this.city2Ref.cityFormControl.markAsTouched();
    if (!this.city1Ref.selectedLocation) {
      this.city1Ref.cityFormControl.setErrors({ 'wrongFormat': true });
    }
    if (!this.city2Ref.selectedLocation) {
      this.city2Ref.cityFormControl.setErrors({ 'wrongFormat': true });
    }
    if (this.city1Ref.selectedLocation && this.city2Ref.selectedLocation) {
      this.city1 = {
        cityInfo : {
          cityName: this.city1Ref.selectedLocation.name,
          weatherResults: { avgWeather: {  avgTemp: 0, totalPrecip: 0, maxWind: 0}, score: 0}
        },
        winner: false
      }
      this.city2 = {
        cityInfo : {
          cityName: this.city2Ref.selectedLocation.name,
          weatherResults: { avgWeather: {  avgTemp: 0, totalPrecip: 0, maxWind: 0}, score: 0}
        },
        winner: false
      }
      this.submitted = true;
      this.weatherService.getForecasts(this.city1Ref.selectedLocation,
        this.city2Ref.selectedLocation, this.selectedForecastPeriod).subscribe(
          responseList => this.setWinner(responseList),
          error => this.error = true
        );
    }
  }

  setWinner(responseList: CityInfo[]) {
    let city1 = responseList.find(response => response.cityName.toLowerCase() === this.city1.cityInfo.cityName.toLowerCase());
    let city2 = responseList.find(response => response.cityName.toLowerCase() === this.city2.cityInfo.cityName.toLowerCase());
    if (!city1 || !city2) {
      console.log('Error retrieving forecast');
      this.error = true;
    }
    this.city1.winner = city1.weatherResults.score < city2.weatherResults.score;
    this.city2.winner = !this.city1.winner;
    this.city1.cityInfo = city1;
    this.city2.cityInfo = city2;
    this.winnerChosen = true;
  }

  reset() {
    this.submitted = false;
    this.winnerChosen = false;
  }
}
