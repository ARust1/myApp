import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {Credentials} from "../../providers/credentials";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private loggedIn: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private credentials: Credentials) {
    this.credentials.getToken().subscribe(result => {
      console.log(result);
      if(!result) {
        this.navCtrl.setRoot(TabsPage);
      }
    });

  }

  ngOnInit() {
    if(this.loggedIn) {

    }
    console.log(this.loggedIn);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
