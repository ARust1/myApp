import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { EventsPage } from '../events/events';
import { WalletPage } from '../wallet/wallet';
import { HomePage } from "../home/home";
import {PenaltiesPage} from "../penalties/penalties";
import {TeamPage} from "../team/team";
import {User} from "../../models/user-model";
import {TeamServiceProvider} from "../../providers/team-service/team-service";
import {InviteServiceProvider} from "../../providers/invite-service/invite-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

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
              public toastCtrl: ToastController) {

    if(!window.localStorage.getItem("token")) {
      navCtrl.setRoot(HomePage);
    }
    this.userData = this.navParams.get('user');
  }

  ionViewWillEnter() {
    if(!this.userData) {
      this.getUserData();
    }
  }

  ionViewDidLoad() {

  }

  getUserData() {
    this.userService.getUserData(window.localStorage.getItem("token")).subscribe((result: any) => {
      this.userData = result;
    }, (error: any) => {
      console.log(error);
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
