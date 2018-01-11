import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {Credentials} from "../../providers/credentials";
import {Subscription} from "rxjs";
import { User } from '../../models/user-model';
import { WalletPage } from '../wallet/wallet';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private credentials: Credentials) {
  }

  ngOnInit() {
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
