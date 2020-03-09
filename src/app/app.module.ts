import { LocalStorageService } from './shared/services/local-storage.service';
import { SearchCityComponent } from './search-city/search-city.component';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { ContactModule } from './contact/contact.module';
 // import { NewsModule } from './news/news.module';

@NgModule({
  declarations: [AppComponent, CityWeatherComponent, SearchCityComponent, ForecastsComponent],
  entryComponents: [],
  imports: [BrowserModule, SharedModule, ContactModule, AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    LocalStorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
