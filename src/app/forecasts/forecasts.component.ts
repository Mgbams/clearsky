import { StandardForecasts } from './../shared/models/standard-forecasts';
import { ForecastsService } from './../shared/services/forecasts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss'],
})
export class ForecastsComponent implements OnInit, OnChanges {
 
 @ViewChild('slides', {static: false}) slides: IonSlides;
 slideOpts: any;
  private cityEntered;
  public geoCity;
  public displayForecastsData: StandardForecasts[] = [];

  constructor(private forecasts: ForecastsService,
    ) {
      this.slideOpts = {
        initialSlide: 0,
      };
    }
  /*
  * Getting entered city and monitoring its changes using SimpleChanges and ngOnChanges
  * Getting the city typed in using the search box in the sideNav. The passed city is
  *  used to get city forecast
  */

  get city(): string {
    return this.cityEntered;
  }

  @Input()
    set city(val: string) {
      // console.log('previous city = ', this.cityEntered);
      //  console.log('currently selected city=', val);
      this.cityEntered = val;
    }

    // Second binded parameter on the app-forecasts tag
    // Getting passedin Geolocalalization city. The passed city is used to get city forecast

  get cityGeo(): string {
    return this. geoCity;
  }

  @Input()
    set cityGeo(val: string) {
      // console.log('previous city = ', this.cityEntered);
      //  console.log('currently selected city=', val);
      this.geoCity = val;
    }

  ngOnChanges(changes: SimpleChanges) {
    if (this.cityEntered) {
      const currentCity: SimpleChange = changes.city;
      // console.log('prev city: ', currentCity.previousValue);
      // console.log('got newest city: ', currentCity.currentValue);
      if (currentCity.currentValue) {
        //  console.log('hurray am the latest city', currentCity.currentValue);
        this.getWeatherForecasts(currentCity.currentValue);
      }
    } else if (this.geoCity) {
      const currentCity: SimpleChange = changes.cityGeo;
      // console.log('prev city: ', currentCity.previousValue);
      // console.log('got newest city: ', currentCity.currentValue);
      if (currentCity.currentValue) {
        //  console.log('hurray am the latest city', currentCity.currentValue);
        this.getWeatherForecasts(currentCity.currentValue);
      }
    }
  }

  ngOnInit() {}

  getWeatherForecasts(passedCity) {
        this.forecasts
        .getWeatherForecasts(passedCity)
        .then((data) => {
          console.log(data);
          this.displayForecastsData.splice(0, this.displayForecastsData.length);
          for(let i = 0; i < data.list.length; i++) {
            
            const iconSrc = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
            const forecastWeather = new StandardForecasts(
                                    data.city.name,
                                    data.list[i].weather[0].description,
                                    data.list[i].main.temp,
                                    data.list[i].dt_txt,
                                    data.city.country,
                                    data.list[i].main.humidity,
                                    data.list[i].main.pressure,
                                    data.list[i].main.temp_max,
                                    data.list[i].main.temp_min,
                                    data.list[i].weather[0].main,
                                    data.list[i].wind.speed,
                                    data.list[i].wind.deg,
                                    iconSrc
                                    );
            this.displayForecastsData.push(forecastWeather);
          }
          return this.displayForecastsData;
        })
          .catch((error) => {
            console.log(error);
        });
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }
}
