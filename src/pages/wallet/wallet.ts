import { Component } from '@angular/core';
import {User} from "../../models/user-model";
import {ActionSheetController, App, LoadingController, NavParams, ToastController, NavController} from "ionic-angular";
import {Team} from "../../models/team-model";
import {Credentials} from "../../providers/credentials";
import {TeamServiceProvider} from "../../providers/team-service";
import {UserServiceProvider} from "../../providers/user-service";
import {Observable} from "rxjs";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  private userData: User;
  private teamData: Team;
  private teamUser: User[];
  private loggedIn: boolean = true;

  constructor(public app: App,
              public navCtrl: NavController,
              public navParams: NavParams,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              private credentials: Credentials,
              public toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController) {

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

  ionViewWillEnter() {
    this.getUserByTeamId(this.userData.team_id);
  }

  getAllData() {
    let token = '';
    this.credentials.getToken().subscribe((result: any) => {
      token = result;
    },(err: any) => {
      console.log(err);
    }, () => {
      this.userService.getUserData(token).subscribe((result: any) => {
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
    });

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
    this.credentials.getToken().subscribe((result: any) => {
      let token = result;
      this.userService.getUserData(token).subscribe((result: any) => {
        this.userData = result;
        console.log(result);
      }, (error: any) => {
        console.log(error);
      }, () => {
      })
    }, (err: any) => {
      console.log(err)
    });

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
