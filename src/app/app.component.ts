import { Component } from '@angular/core';
import {Platform, NavController, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HomePage} from "../pages/home/home";
import {Credentials} from "../providers/credentials";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage:any = HomePage;
  private loggedIn: boolean;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private app: App,
              private credentials: Credentials) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
    this.checkToken();
  }


  checkToken() {
    this.credentials.getToken().subscribe((result: any) => {
      if(!result) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    }, (err: any) => {

    }, () => {
      if(this.loggedIn) {
        this.rootPage = TabsPage;
      }
    })
  }


}
