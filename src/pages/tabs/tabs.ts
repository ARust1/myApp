import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { EventsPage } from '../events/events';
import { WalletPage } from '../wallet/wallet';
import { HomePage } from "../home/home";
import {PenaltiesPage} from "../penalties/penalties";
import {DebtPage} from "../debt/debt";
import {User} from "../../models/user-model";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  userData: User;
  tab1Root = WalletPage;
  tab2Root = EventsPage;
  tab3Root = PenaltiesPage;
  tab4Root = DebtPage;
  tab5Root = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(!window.localStorage.getItem("token")) {
      navCtrl.setRoot(HomePage);
    }

    this.userData = this.navParams.get('user');
  }
  ionViewDidLoad() {
    // Put here the code you want to execute
  }
}
