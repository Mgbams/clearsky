import { LocalStorageService } from './../shared/services/local-storage.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CityWeather } from './../shared/models/city-weather';
// import { WeatherforecastsService } from '../shared/services/city-weather.service';
// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent implements OnInit {
public searchCityForm;
@Output() searched = new EventEmitter();
public cities = [];
public localStorageCities;
public selectedCity: string = '';
  constructor(private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService
  ) {
    this.searchCityForm = this.formBuilder.group({
      city: ''
    });
  }

  ngOnInit() {
    // using slice to get the last 5 searched city on starting the application i.e slice(-5)
    this.localStorageCities = this.localStorageService.getCities();
    if (this.localStorageCities) {
      this.localStorageCities = this.localStorageCities.slice(-8);
    } 
  }

  searchedCity(name) { // You can give any function name
      this.searched.emit(name);
  }

  onSubmit(cityName) {
    // Note that cityName is an object and we get it's city value with cityName.city
   // this.searchedWeather(cityName.city);
  // this.cities.push(cityName.city); // Populating the city array
   this.localStorageService.storeOnLocalStorage(cityName.city); // saving to local storage
   this.localStorageCities = this.localStorageService.getCities();
   this.localStorageCities = this.localStorageCities.slice(-8);
  // console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', this.localStorageCities);
  // console.log('I am not very tall yet', this.localStorageCities.length);
   this.searchCityForm.reset();
  }

  deleteCity(cityName) {
   // console.log('i am singing hello everyday', boys);
   // this.localStorageCities.splice(cityName, 1);
   this.localStorageService.removeCity(cityName);
  }

  // event handler for the select element's change event
  /*selectChangeHandler (event: any) {
    // update the ui
    this.selectedCity = event.target.value;
    console.log('not working ooo', this.selectedCity);
  } */

}
