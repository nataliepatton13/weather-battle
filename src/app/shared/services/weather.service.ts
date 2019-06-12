import { Weather, CityInfo, WeatherResults } from './../model/weather';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable, forkJoin } from 'rxjs';
import { } from 'googlemaps';

const apixuApiKey = '953569584dac4183994174512192405';
const apixuBaseUrl = 'http://api.apixu.com/v1/forecast.json';
const idealTemp = 72;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecasts(city1: google.maps.places.PlaceResult, city2: google.maps.places.PlaceResult, forecastPeriod: string) {
    let cityLocation1 = this.getCoordinates(city1);
    let cityLocation2 = this.getCoordinates(city2);
    let forecastCity1 = this.getForecast(cityLocation1, forecastPeriod);
    let forecastCity2 = this.getForecast(cityLocation2, forecastPeriod);
    return forkJoin([forecastCity1, forecastCity2]);
  }

  getCoordinates(location: google.maps.places.PlaceResult) {
    let latitude = location.geometry.location.lat().toString();
    let longitude = location.geometry.location.lng().toString();
    return latitude + ',' + longitude;
  }
  getForecast(city: string, forecastPeriod: string): Observable<CityInfo> {
    return this.http.get<CityInfo>(apixuBaseUrl,
      {
        params: {
          'key': apixuApiKey,
          'q': city,
          'days': forecastPeriod
        }
      }).pipe(
        map(response => {
          let cityInfo : CityInfo = {
            cityName: response['location']['name'],
            weatherResults: this.getWeatherResults(response['forecast']['forecastday'])
          };
          return cityInfo;
        })
      )
  }

  getWeatherResults(weatherDays: any[]) : WeatherResults {
    let avgWeather = this.getAvgWeather(weatherDays);
    let tempPoints = Math.abs(avgWeather.avgTemp - idealTemp);
    let windPoints = avgWeather.maxWind / 5;
    let precipPoints = avgWeather.totalPrecip * 8;
    let totalPoints = tempPoints + windPoints + precipPoints;
    let results = <WeatherResults>{score: totalPoints, avgWeather: avgWeather};
    return results;
  }
  
  getAvgWeather(weatherDays: any[]): Weather {
    let avgWeather = <Weather>{avgTemp: 0, maxWind: 0, totalPrecip: 0};
    weatherDays.forEach(weatherDay => {
      avgWeather.avgTemp += weatherDay.day.avgtemp_f;
      avgWeather.maxWind += weatherDay.day.maxwind_mph ;
      avgWeather.totalPrecip += weatherDay.day.totalprecip_in;
    });
    avgWeather.avgTemp /= weatherDays.length;
    avgWeather.totalPrecip /= weatherDays.length;
    avgWeather.maxWind /= weatherDays.length;
    return avgWeather;
  }
}
