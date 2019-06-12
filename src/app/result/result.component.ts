import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { City } from '../shared/model/weather';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0}),
          animate('400ms ease-in-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({overflow: 'hidden', height: '*', opacity: 1}),
          animate('400ms ease-in-out', style({ overflow: 'hidden', height: '0px', opacity: 0 }))
        ])
      ])],
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() city1: City;
  @Input() city2: City;
  @Output() reset = new EventEmitter<boolean>();
  animationOver = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() =>
      this.animationOver = true, 11500);
  }
  playAgain() {
    this.reset.emit(true);
  }

  get winner() {
    return this.city1.winner ? this.city1 : this.city2;
  }
  get winnerName() {
    return this.winner.cityInfo.cityName.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  }

  get winnerWeather() {
    return this.city1.winner ? this.city1.cityInfo.weatherResults.avgWeather : this.city2.cityInfo.weatherResults.avgWeather;
  }

  get winnerTemp() {
    return Math.round(this.winner.cityInfo.weatherResults.avgWeather.avgTemp) + '° F'
  }

  get winnerWind() {
    return Math.round(this.winner.cityInfo.weatherResults.avgWeather.maxWind) + ' MPH'
  }

  get winnerPrecip() {
    return Math.round(this.winner.cityInfo.weatherResults.avgWeather.totalPrecip) + ' inches'
  }
}
