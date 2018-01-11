import { Component } from '@angular/core';
import {Platform, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HomePage} from "../pages/home/home";
import {Credentials} from "../providers/credentials";

import {initializeApp } from 'firebase';
import {FIREBASE_CONF} from "./app.firebase.config";
import { User } from '../models/user-model';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private app: App,
              private credentials: Credentials) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#80CBC4");
      splashScreen.hide();
    });
    initializeApp(FIREBASE_CONF);
    
    this.checkUser();
    
  }

  checkUser() {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    console.log("APP COMPONENT " + userData);
    if(userData && typeof User) {
      this.rootPage = TabsPage;
    }
  }
}
