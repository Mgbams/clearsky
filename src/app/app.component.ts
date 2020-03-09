import { LocalStorageService } from './shared/services/local-storage.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public navigate: any;
  public cityName = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu() {
    this.navigate =
    [
      {
        title : 'Home',
        url   : '',
        icon  : 'home-outline'
      },
      {
        title : 'Contacts',
        url   : '/contact',
        icon  : 'call-outline'
      }
    ];
  }

  getSearchedCity(city) {
    // city.city gives you value in the entered field while city gives you value for the selected field
    this.cityName = city.city || city; 
    console.log('hello my little', city);
  }
}
