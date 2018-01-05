import { Component } from '@angular/core';
import {Platform, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HomePage} from "../pages/home/home";
import {Credentials} from "../providers/credentials";
import {TabsPage} from "../pages/tabs/tabs";
import {User} from "../models/user-model";
import {SetupAccountPage} from "../pages/setup-account/setup-account";
import {LoginPage} from "../pages/login/login";
import {IdUploadPage} from "../pages/setup-account/id-upload/id-upload";
import {TeamSetupPage} from "../pages/setup-account/team-setup/team-setup";

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
      statusBar.backgroundColorByHexString("#80CBC4");
      splashScreen.hide();
    });

    this.checkAccountSetup();
  }


  checkToken() {
    let token = this.credentials.getToken();
      if(token) {
        this.rootPage = TabsPage;
      }
  }

  checkAccountSetup() {
    let userData: User = this.credentials.getUser();
    let idUploaded: string = localStorage.getItem('idUpload');
    console.log(idUploaded);
    if(userData) {
      if(!userData.prename && !userData.surname) {
        this.rootPage = HomePage;
      } else if(userData.prename && userData.surname && userData.birthday && idUploaded === '') {
        this.rootPage = IdUploadPage;
      } else if(idUploaded === 'done' || idUploaded === 'skipped') {
        this.rootPage = TeamSetupPage;
      } else if(userData.prename && userData.surname && userData.birthday && idUploaded === '' && userData.team_id == '') {
        this.rootPage = TeamSetupPage;
      } else {
        this.checkToken()
      }
    } else {
      this.rootPage = HomePage;
    }

  }

}
