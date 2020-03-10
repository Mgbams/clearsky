import { CityWeather } from './../models/city-weather';
import { Injectable } from '@angular/core';
import { ForecastsService } from './forecasts.service';
import { CityNews } from '../models/city-news';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityWeatherResponseService {

 public errorMessage: string;

  constructor(private http: HttpClient, private forecasts: ForecastsService) { }

  public getCityWeather(city: string): Promise< CityWeather> {
    return this.http.get < CityWeather >
    (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d16d7dcb95c567985adc924667a7e2cf`)
    .toPromise();
   }

getCurrentCityWeather(latitude, longitude): Promise < CityWeather> {
  return this.http.get <CityWeather>
  (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&units=metric
  &lon=${longitude}&appid=d16d7dcb95c567985adc924667a7e2cf`)
  .toPromise();
}

showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      this.errorMessage = 'User denied the request for Geolocation.';
      break;
    case error.POSITION_UNAVAILABLE:
      this.errorMessage = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      this.errorMessage = 'The request to get user location timed out.';
      break;
  }
}


public getCityNews(cityName: string) {
  return this.http.get < CityNews > (`https://gnews.io/api/v3/search?q=${cityName}&token=176d97cd3c9724ad10dfe95e2710fc79`)
  .toPromise();
 }

}
