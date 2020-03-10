import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { CityWeatherResponseService } from '../shared/services/city-weather-response.service';
import { CityWeather } from './../shared/models/city-weather';
import { HttpErrorResponse } from '@angular/common/http';
import { Weather } from './../shared/models/weather';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit, OnChanges {
  private cityEntered;
  public cityFromGeoLOc;
  public errorMessage: string;
  public iconSrc;
  public weareone;
  public navigationMessage: string;
  public progressbar: boolean;
  public weatherdisplayIcon;
  public responsiveBackgroundImage;
  public cityWeather: CityWeather = {
    name: '',
    weather: [
      {
        main: '',
        description: '',
        icon: ''
      }
    ],
    main: [
      {
        tempActual: null,
        tempMin: null,
        tempMax: null,
        pressure: null,
        humidity: null
      }
    ],
    wind: {
      speed: null
    },
    sys: {
      country: ''
    }
  };

  constructor(private weatherforecast: CityWeatherResponseService) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.progressbar = true;
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.weatherforecast
            .getCurrentCityWeather(latitude, longitude)
            .then((data: CityWeather) => {
              this.progressbar = false;
              this.cityWeather = data;
              console.log(this.cityWeather);
              this.icons(this.cityWeather['weather'][0].description); // setting weather icons
              this.iconSrc = `http://openweathermap.org/img/wn/${this.cityWeather.weather[0].icon}.png`;
              this.cityFromGeoLOc = this.cityWeather['name'];
            })
            .catch((error: HttpErrorResponse) => {
              console.log(error);
            });
        },
        error => {
          this.weatherforecast.showError(error);
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  /*
   * Getting entered city and monitoring its changes using SimpleChanges and ngOnChanges
   */

  @Input()
  set city(val: string) {
    console.log('previous city = ', this.cityEntered);
    console.log('currently selected city=', val);
    this.cityEntered = val;
  }

  get city(): string {
    return this.cityEntered;
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentCity: SimpleChange = changes.city;
    console.log('prev city: ', currentCity.previousValue);
    console.log('got newest city: ', currentCity.currentValue);
    if (currentCity.currentValue) {
      console.log('hurray am the latest city', currentCity.currentValue);
      this.searchedWeather(currentCity.currentValue);
    }
  }

  searchedWeather(cityName: string): void {
    this.progressbar = true;
    this.weatherforecast
      .getCityWeather(cityName)
      .then((data: CityWeather) => {
        this.progressbar = false;
        this.cityWeather = data;
        this.icons(this.cityWeather['weather'][0].description); // setting weather icons
        // this.iconSrc = `http://openweathermap.org/img/wn/${this.cityWeather.weather[0].icon}@2x.png`;
        this.weatherforecast
          .getCityNews(this.cityWeather['name'])
          .then(cityNews => {
            console.log(cityNews);
          })
          .catch((error: HttpErrorResponse) => {
            console.log(error);
          });
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  icons(weatherDescription) {
    switch (weatherDescription) {
      case 'scattered clouds':
        this.weatherdisplayIcon =
          '../../assets/images/scatteredClouds.png';
          this.responsiveBackgroundImage = "../../assets/images/afternoon.jpg";
        break;
      case 'light rain':
        this.weatherdisplayIcon =
          '../../assets/images/lightRain.png';
          this.responsiveBackgroundImage = "../../assets/images/afternoon.jpg";
        break;
      case 'few clouds':
        this.weatherdisplayIcon =
          '../../assets/images/fewClouds.png';
          this.responsiveBackgroundImage = "../../assets/images/afternoon.jpg";
        break;
      case 'broken clouds':
        this.weatherdisplayIcon =
          '../../assets/images/brokenClouds.png';
          this.responsiveBackgroundImage = "../../assets/images/afternoon.jpg";
        break;
      case 'overcast clouds':
        this.weatherdisplayIcon =
          '../../assets/images/overcastClouds.png';
          this.responsiveBackgroundImage = "../../assets/images/dayWeather.jpg";
        break;
      case 'moderate rain':
        this.weatherdisplayIcon =
          '../../assets/images/moderateRain.png';
          this.responsiveBackgroundImage = "../../assets/images/afternoon.jpg";
        break;
      case 'clear sky':
        this.weatherdisplayIcon =
          '../../assets/images/clearSky.png';
          this.responsiveBackgroundImage = "../../assets/images/afternoon.jpg";
        break;
      case 'light snow':
          this.weatherdisplayIcon =
            '../../assets/images/lightSnow.png';
        break;
      case 'shower rain':
          this.weatherdisplayIcon =
            '../../assets/images/showerRain.png';
            this.responsiveBackgroundImage = "../../assets/images/evening.jpg";
        break;
      case 'drizzle rain':
          this.weatherdisplayIcon =
            '../../assets/images/showerRain.png';
            this.responsiveBackgroundImage = "../../assets/images/evening.jpg";
        break;
      default:
        this.weatherdisplayIcon =
          '../../assets/images/sunny.png';
          this.responsiveBackgroundImage = "../../assets/images/dayWeather.jpg";
    }
  }
}
