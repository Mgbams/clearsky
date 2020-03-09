import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

// key that is used to access the data in local storage

const STORAGE_KEY = 'cityKeys';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public cityLists = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  public storeOnLocalStorage(cityName: string): void {
    // get array of cities from local storage using this code below
    const currentCityList = this.storage.get(STORAGE_KEY) || [];

    // push new task to array
    currentCityList.push({
      name: cityName
    });

    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentCityList);
    // console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');

    // To remove data from localStorage, simply call: this.storage.remove(STORAGE_KEY).
  }

  getCities() {
    return this.storage.get(STORAGE_KEY);
  }

  removeCity(cityName) {
    console.log('deleting city from view', cityName);
    console.log('this is my stored city', this.storage.get(STORAGE_KEY));
    localStorage.removeItem(STORAGE_KEY);
  }
}
