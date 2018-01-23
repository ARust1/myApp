import { Component } from '@angular/core';
import {User} from "../../models/user-model";
import {
  App, NavParams, ToastController, NavController, Refresher, PopoverController, Events,
  ModalController
} from "ionic-angular";
import {Team} from "../../models/team-model";
import {Credentials} from "../../providers/credentials";
import {TeamServiceProvider} from "../../providers/team-service";
import {UserServiceProvider} from "../../providers/user-service";
import {PictureProvider} from "../../providers/picture";
import {PaymentProvider} from "../../providers/payment";
import {PaySelectPage} from "./pay-select/pay-select";
import {BankaccountAddPage} from "../profile/balance/bankaccount-add/bankaccount-add";
import {DepositCreatePage} from "../profile/balance/deposit-create/deposit-create";
import {PayoutCreatePage} from "../payout-create/payout-create";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  private userData: User;
  private teamData: Team = new Team();
  private teamUser: User[];
  private availableStripeTeamBalance: number = 0;
  private pendingStripeTeamBalance: number = 0;
  private dataLoaded: boolean = false;
  private segment: string = 'balance';
  private bankAccountDetailsLoaded: boolean = false;
  private bankAccountData: any;

  constructor(public app: App,
              public navCtrl: NavController,
              public navParams: NavParams,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              private credentials: Credentials,
              public toastCtrl: ToastController,
              private pictureService: PictureProvider,
              private paymentService: PaymentProvider,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              public events: Events) {
    this.userData = this.navParams.get('userData');

    this.events.subscribe('teamBankAccount:add', bankAccountData => {
      this.bankAccountData = bankAccountData;
    });

    this.events.subscribe('payout:cash', amount => {
      this.teamData.balance -= amount / 100;
    });

    this.events.subscribe('deposit:cash', amount => {
      console.log("teambalance", this.teamData.balance);
      console.log("amount", amount);
      this.teamData.balance += amount;
    });
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
            this.getBankAccounts();
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
      this.getBankAccounts();
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

  getBankAccounts(): any {
    let accountDetails;
    this.paymentService.getStripeAccount(this.teamData.stripeToken).subscribe((result: any) => {
      if(result) {
        accountDetails = result;
      }
    }, (err: any) => {
      console.log(err);
    }, () => {
      if(accountDetails.external_accounts) {
        this.bankAccountData = accountDetails.external_accounts.data[0];
        this.bankAccountDetailsLoaded = true;
        console.log(this.bankAccountData);
      }
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

  openPaySelectPopover(user: User) {
    let modal = this.modalCtrl.create(PaySelectPage, {
      transactionUser: user,
      teamData: this.teamData
    });

    modal.present();
  }

  goToAddBankAccount() {
    this.navCtrl.push(BankaccountAddPage, {
      teamData: this.teamData
    })
  }

  openWalletDeposit(type: string) {
    let modal = this.modalCtrl.create(DepositCreatePage, {
      type: type,
      teamData: this.teamData
    });

    modal.present();
  }

  openWalletPayout(type: string) {
    let modal = this.modalCtrl.create(PayoutCreatePage, {
      type: type,
      teamData: this.teamData
    });

    modal.present();
  }

}
