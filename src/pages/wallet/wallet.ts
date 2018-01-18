import { Component } from '@angular/core';
import {User} from "../../models/user-model";
import {App, NavParams, ToastController, NavController, Refresher, PopoverController} from "ionic-angular";
import {Team} from "../../models/team-model";
import {Credentials} from "../../providers/credentials";
import {TeamServiceProvider} from "../../providers/team-service";
import {UserServiceProvider} from "../../providers/user-service";
import {PictureProvider} from "../../providers/picture";
import {PaymentProvider} from "../../providers/payment";
import {Keyboard} from "@ionic-native/keyboard";
import {PaySelectPage} from "./pay-select/pay-select";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  private userData: User;
  private teamData: Team;
  private teamUser: User[];
  private availableStripeTeamBalance: number = 0;
  private pendingStripeTeamBalance: number = 0;
  private dataLoaded: boolean = false;
  private segment: string = 'overview';
  private totalBalance: number = 0;

  constructor(public app: App,
              public navCtrl: NavController,
              public navParams: NavParams,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              private credentials: Credentials,
              public toastCtrl: ToastController,
              private pictureService: PictureProvider,
              private paymentService: PaymentProvider,
              public popoverCtrl: PopoverController) {
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
    let user: User = this.credentials.getUser();
      this.userService.getUserData(user.email).subscribe((result: any) => {
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
            console.log(userData);
            console.log(teamData);
            console.log(teamUser);
            localStorage.setItem('teamStripeToken', this.teamData.stripeToken);
            this.getStripeUserBalance();
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
      this.getStripeUserBalance();
      this.getStripeTeamBalance();
    });
  }

  getUserByTeamId(team_id: string): any {
    this.userService.getUserByTeamId(team_id).subscribe((result: any) => {
      this.teamUser = result;
    }, (err: any) => {
      console.log(err)
    }, () => {
      console.log(this.teamUser);
    })
  }

  getUserData(): any {
    let user: User = this.credentials.getUser();
    if(user) {
      this.userService.getUserData(user.email).subscribe((result: any) => {
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
      this.pendingStripeTeamBalance = result.pending[0].amount;
    }, err => {
      console.log(err);
    }, () => {
      console.log("available", this.availableStripeTeamBalance);
      console.log("pending", this.pendingStripeTeamBalance);
      console.log("team balance", this.teamData.balance);
      this.dataLoaded = true;
    })
  }

  getStripeUserBalance() {
    this.paymentService.getStripeAccountBalance(this.userData.accountToken).subscribe(result => {
      console.log(result);
      if(result) {
        localStorage.setItem('userStripeBalance', result.available[0].amount);
      }
    }, err => {
      console.log(err);
    }, () => {
      console.log(localStorage.getItem('userStripeBalance'));
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

  doPulling(refresher: Refresher) {
    console.log('DOPULLING', refresher.progress);
  }

  openPaySelectPopover(user: User) {
    let popover = this.popoverCtrl.create(PaySelectPage, {
      transactionUser: user,
      teamData: this.teamData
    });

    popover.present();
  }
}
