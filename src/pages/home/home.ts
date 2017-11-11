import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private loggedIn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(window.localStorage.getItem("loggedIn")) {
      this.loggedIn = true;
    }
  }

  ionViewDidLoad() {
    if(this.loggedIn) {
      this.navCtrl.setRoot(TabsPage);
    }
  }
  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
