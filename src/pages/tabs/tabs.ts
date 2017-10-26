import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';
import { WalletPage } from '../wallet/wallet';
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WalletPage;
  tab2Root = ContactPage;
  tab3Root = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(!window.localStorage.getItem("token")) {
      navCtrl.setRoot(HomePage);
    }
  }
  ionViewDidLoad() {
    // Put here the code you want to execute
  }
}
