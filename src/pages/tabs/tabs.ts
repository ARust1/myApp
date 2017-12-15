import { Component } from '@angular/core';
import {NavController, NavParams, App} from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { EventsPage } from '../events/events';
import { WalletPage } from '../wallet/wallet';
import { HomePage } from "../home/home";
import {PenaltiesPage} from "../penalties/penalties";
import {TeamPage} from "../team/team";
import {User} from "../../models/user-model";
import {Credentials} from "../../providers/credentials";
import {UserServiceProvider} from "../../providers/user-service";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  private userData: User;
  tab1Root = WalletPage;
  tab2Root = EventsPage;
  tab3Root = PenaltiesPage;
  tab4Root = TeamPage;
  tab5Root = ProfilePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public credentials: Credentials) {

    this.userData = this.navParams.get('userData');

  }

  ionViewWillEnter() {
    if(!this.userData) {
      this.getUserData();
    }
  }

  getUserData(): any {
    let token = this.credentials.getToken();
      this.userService.getUserData(token).subscribe((result: any) => {
        console.log(result + "getData");
        this.userData = result;
      }, (error: any) => {
        console.log(error);
      });
  }
}
