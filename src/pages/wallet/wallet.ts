import { Component } from '@angular/core';
import {User} from "../../models/user-model";
import {ActionSheetController, App, LoadingController, NavParams, ToastController} from "ionic-angular";
import {TeamServiceProvider} from "../../providers/team-service/team-service";
import {Team} from "../../models/team-model";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  private userData: User;
  private teamData: Team;
  private teamUser: User[];
  private isLoggedIn: boolean = false;

  constructor(public app: App,
              public navParams: NavParams,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private actionSheetCtrl: ActionSheetController) {
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
    this.getUserByTeamId(this.userData.team_id);
  }

  getTeamData(): any {
    this.teamService.getTeamById(this.userData.team_id).subscribe( (result) => {
      this.teamData = result;
      console.log(this.teamUser);
    }, (err: any) => {
      this.presentToast(err);
    });
  }

  getUserByTeamId(team_id: string): any {
    this.userService.getUserByTeamId(team_id).subscribe((result: any) => {
      this.teamUser = result;
    }, (err: any) => {
      console.log(err)
    })
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Leute einladen',
          handler: () => {
            //this.presentProfileModal();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
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
