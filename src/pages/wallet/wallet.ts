import { Component } from '@angular/core';
import {User} from "../../models/user-model";
import { App, NavParams, ToastController, NavController} from "ionic-angular";
import {Team} from "../../models/team-model";
import {Credentials} from "../../providers/credentials";
import {TeamServiceProvider} from "../../providers/team-service";
import {UserServiceProvider} from "../../providers/user-service";
import {PictureProvider} from "../../providers/picture";
import {PaymentProvider} from "../../providers/payment";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  private userData: User;
  private teamData: Team;
  private teamUser: User[];
  private availableStripeTeamBalance: number;
  private pendingStripeTeamBalance: number;
  private dataLoaded: boolean = false;

  constructor(public app: App,
              public navCtrl: NavController,
              public navParams: NavParams,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              private credentials: Credentials,
              public toastCtrl: ToastController,
              private pictureService: PictureProvider,
              private paymentService: PaymentProvider) {

    this.userData = this.navParams.get('userData');

  }
  ngOnInit() {
    if(this.userData) {
      this.getTeamData(this.userData.team_id);
      this.getUserByTeamId(this.userData.team_id);
      this.dataLoaded = true;
    } else {
      this.getData();
    }
  }

  setTeamLogo() {
    this.pictureService.getPictures().then(result => {
      this.teamData.team_logo = result.profileImg;
      this.pictureService.saveImgToFirebaseStorage(this.userData, result.base64Image).then(result => {
        this.teamService.saveProfileImg(this.teamData.uuid, result.downloadURL).subscribe(result => {
        }, (err: any) => {
          console.log("ERR");
          console.log(err.toString());
        })
      }, (err: any) => {
        console.log(err);
      });
    }, (err: any) => {
      console.log(err);
    });
  }

  getData() {
    let userData: User;
    let teamData: Team;
    let teamUser: User[];
    let token = this.credentials.getToken();
      this.userService.getUserData(token).subscribe((result: any) => {
        userData = result;
        this.userData = userData;
        console.log(userData.team_id);
      }, (err: any) => {
        console.log(err);
      }, () => {
        this.teamService.getTeamById(userData.team_id).subscribe( (result) => {
          teamData = result;
        }, (err: any) => {
          this.presentToast(err);
        }, () => {
          this.teamData = teamData;
          this.userService.getUserByTeamId(teamData.uuid).subscribe((result: any) => {
            teamUser = result;
          }, (err: any) => {
            console.log(err)
          }, () => {
            this.teamUser = teamUser;
            console.log(token);
            console.log(userData);
            console.log(teamData);
            console.log(teamUser);
            localStorage.setItem('teamStripeToken', this.teamData.stripeToken);
            this.getStripeTeamBalance();
          })
        })
      })
  }

  getTeamData(team_id: string): any {
    this.teamService.getTeamById(team_id).subscribe( (result) => {
      this.teamData = result;
    }, (err: any) => {
      this.presentToast(err);
    }, () => {
      this.getStripeTeamBalance();
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
    let token = this.credentials.getToken();
    if(token) {
      this.userService.getUserData(token).subscribe((result: any) => {
        this.userData = result;
        console.log(result);
      }, (error: any) => {
        console.log(error);
      }, () => {
      })
    }
  }

  getStripeTeamBalance() {
    this.paymentService.getStripeAccountBalance(this.teamData.stripeToken).subscribe(result => {
      this.availableStripeTeamBalance = result.available[0].amount;
      this.teamData.balance += result.available[0].amount / 100;
      this.pendingStripeTeamBalance = result.pending[0].amount;
    }, err => {
      console.log(err);
    }, () => {
      console.log(this.availableStripeTeamBalance);
      console.log(this.pendingStripeTeamBalance);
      this.dataLoaded = true;
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

  doRefresh(refresher) {
    setTimeout(() => {
      this.getTeamData(this.userData.team_id);
      this.getUserByTeamId(this.userData.team_id);
      this.getUserData();
      refresher.complete();
    }, 2000);
  }

}
