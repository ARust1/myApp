import { Component } from '@angular/core';
import {User} from "../../models/user-model";
import {App, DateTime, LoadingController, NavParams, ToastController} from "ionic-angular";
import {TeamServiceProvider} from "../../providers/team-service/team-service";
import {Team} from "../../models/team-model";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  private userData: User;
  private teamData: Team;
  private isLoggedIn: boolean = false;

  constructor(public app: App,
              public navParams: NavParams,
              public teamService: TeamServiceProvider,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
    // if(!this.isLoggedIn) {
    //   this.presentLoadingDefault();
    // }

    if(window.localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    this.userData = this.navParams.data;
    this.userData.balance = 12.39;
  }

  ionViewWillEnter() {
  }
  ionViewDidLoad() {
    this.getTeamData();
  }

  getTeamData(): any {
    this.teamService.getTeamById(this.userData.team_id).subscribe( (result) => {
      this.teamData = result;
    }, (err: any) => {
      this.presentToast(err);
    });
  }

  presentLoadingDefault() {
    const loading = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: false
    });

    loading.present();
    this.userData = this.navParams.data;
    this.getTeamData();

    setTimeout(() => {
      if(window.localStorage.getItem("token")) {
        this.isLoggedIn = true;
      }
      console.log(this.teamData);
      loading.dismiss();
    }, 2000);
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

  doRefresh(refresher) {
    setTimeout(() => {
      this.getTeamData();
      console.log('Async operation has ended');
      console.log(this.teamData);
      refresher.complete();
    }, 2000);
  }
}
