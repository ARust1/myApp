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
              private actionSheetCtrl: ActionSheetController) {

    if(window.localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    this.userData = this.navParams.data;

  }
  ngOnInit() {
    if(Object.keys(this.userData).length == 0) {
      this.getAllData();
    } else {
      this.getTeamData(this.userData.team_id);
      this.getUserByTeamId(this.userData.team_id);
    }
  }

  getAllData() {
    this.userService.getUserData(window.localStorage.getItem("token")).subscribe((result: any) => {
      this.userData = result;
      this.teamService.getTeamById(result.team_id).subscribe( (result) => {
        this.teamData = result;
        this.userService.getUserByTeamId(result.uuid).subscribe((result: any) => {
          this.teamUser = result;
        }, (err: any) => {
          console.log(err)
        })
      }, (err: any) => {
        this.presentToast(err);
      }, () => {
      });
    }, (error: any) => {
      console.log(error);
    }, () => {
    })
  }

  getTeamData(team_id: string): any {
    this.teamService.getTeamById(team_id).subscribe( (result) => {
      this.teamData = result;
    }, (err: any) => {
      this.presentToast(err);
    }, () => {
    });
  }

  getUserByTeamId(team_id: string): any {
    this.userService.getUserByTeamId(team_id).subscribe((result: any) => {
      this.teamUser = result;
    }, (err: any) => {
      console.log(err)
    })
  }

  getUserData(): any {
    this.userService.getUserData(window.localStorage.getItem("token")).subscribe((result: any) => {
      this.userData = result;
    }, (error: any) => {
      console.log(error);
    }, () => {
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
      this.getTeamData(this.userData.team_id);
      this.getUserByTeamId(this.userData.team_id);
      this.getUserData();
      refresher.complete();
    }, 2000);
  }
}
