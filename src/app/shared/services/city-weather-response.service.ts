import { CityWeather } from './../models/city-weather';
import { Injectable } from '@angular/core';
import { ForecastsService } from './forecasts.service';
import { CityNews } from '../models/city-news';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityWeatherResponseService {

 public errorMessage: string;

  constructor(private http: HttpClient, private forecasts: ForecastsService) { }

  public getCityWeather(city: string): Promise< CityWeather> {
    return this.http.get < CityWeather >
    (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d16d7dcb95c567985adc924667a7e2cf`)
    .toPromise();
   }


/*public getCurrentCityWeather(lat, lon) {
  return this.http.get <CityWeather>
  (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d16d7dcb95c567985adc924667a7e2cf`)
  .toPromise();
 }


public getPosition(): Promise<any>
{
  if (navigator.geolocation){
    return navigator.geolocation.getCurrentPosition < [] > ((position) => {}).toPromise();
  }
} */

/*
* Get current city weather using GPS
*/

getCurrentCityWeather(latitude, longitude): Promise < CityWeather> {
  return this.http.get <CityWeather>
  (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d16d7dcb95c567985adc924667a7e2cf`)
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

/*getPosition(): Promise<any>
{
  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(position => {

        resolve({longitude: position.coords.longitude, latitude: resp.coords.latitude});
      },
      err => {
        reject(err);
      });
  });
}

this.locationService.getPosition().then(pos=>
  {
     console.log(`Positon: ${pos.lng} ${pos.lat}`);
  });
*/
// https://newsapi.org/v2/top-headlines?country=${cityName}&apiKey=b6b3cf4689ee443d96edabecad4fff99

public getCityNews(cityName: string) {
  return this.http.get < CityNews > (`https://gnews.io/api/v3/search?q=${cityName}&token=176d97cd3c9724ad10dfe95e2710fc79`)
  .toPromise();
 }

}
