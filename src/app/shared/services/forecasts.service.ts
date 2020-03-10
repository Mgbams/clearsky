import { StandardForecasts } from './../models/standard-forecasts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityWeather } from './../models/city-weather';

@Injectable({
  providedIn: 'root'
})
export class ForecastsService {

  constructor(private http: HttpClient) { }

  public getWeatherForecasts(cityName): Promise< any > {
    return this.http.get < any >
    (`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=d16d7dcb95c567985adc924667a7e2cf`)
    .toPromise();
   }
}
