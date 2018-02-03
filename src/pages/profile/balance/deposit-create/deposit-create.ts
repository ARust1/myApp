import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController, Events} from 'ionic-angular';
import {PaymentProvider} from "../../../../providers/payment";
import {User} from "../../../../models/user-model";
import {Team} from "../../../../models/team-model";
import {TeamServiceProvider} from "../../../../providers/team-service";
import {DepositProvider} from "../../../../providers/deposit";
import {Credentials} from "../../../../providers/credentials";
import {Deposit} from "../../../../models/stripe-payment-model";
import { PushProvider } from '../../../../providers/push';
import { CurrencyPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-deposit-create',
  templateUrl: 'deposit-create.html',
})
export class DepositCreatePage {

  private userData: User;
  private teamData: Team;
  private currentUser: User;
  private depositData = {
    amount: null,
    fee: null,
    total: null,
    description: ''
  };
  private loadingActivated: boolean = false;
  private depositSuccess: boolean = false;
  private stripeToken: string;
  private type: string;
  private paymentType: string = 'balance';
  private recipient: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private paymentService: PaymentProvider,
              private teamService: TeamServiceProvider,
              private depositService: DepositProvider,
              private pushService: PushProvider,
              private toastCtrl: ToastController,
              private events: Events,
              private credentials: Credentials,
              private currencyPipe: CurrencyPipe) {

    this.currentUser = this.credentials.getUser();

    this.type = this.navParams.get('type');

    this.userData = this.navParams.get('userData');
    this.teamData = this.navParams.get('teamData');

    if(this.userData) {
      this.stripeToken = this.userData.accountToken;
      this.recipient = this.userData.prename + " " + this.userData.surname;
    } else {
      this.stripeToken = this.teamData.stripeToken;
      this.recipient = this.teamData.name;
    }
  }

  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'EUR', true, '1.2-2');
  }

  deposit() {
    this.loadingActivated = true;

    let depositData: Deposit = new Deposit();
    depositData.timestamp = new Date();
    depositData.amount = this.depositData.amount * 100;
    depositData.description = this.depositData.description;
    depositData.recipient = this.recipient;
    depositData.team_id = this.currentUser.team_id;
    depositData.user_id = this.currentUser.uuid;
    depositData.sender = this.currentUser.prename + " " + this.currentUser.surname;

    if(this.type === 'deposit:online') {

      if(this.paymentType === 'card') {
        let depositToken: string;
        this.paymentService.chargeStripeBankAccount(this.stripeToken, this.depositData.amount * 100).subscribe((result: any) => {
          depositToken = result.id;
          console.log(result);
        }, (err: any) => {
          console.log(err);
        }, () => {
          depositData.type = 'card';
          depositData.deposit_token = depositToken;

          this.depositService.addDeposit(depositData).subscribe(result => {
          }, err => {
            console.log(err);
          }, () => {

            if(!this.currentUser.admin) {
              this.sendPush();
            }

            this.loadingActivated = false;
            this.depositSuccess = true;
            setTimeout(() => {
              this.navCtrl.pop();
            }, 1500);
          });
        });
      }

      if(this.paymentType === 'balance') {

        let depositToken: string;
        this.paymentService.transferFromStripeToStripeAccount(this.currentUser.accountToken,
          this.depositData.amount * 100,
          this.stripeToken, null).subscribe(result => {
          depositToken = result.id;
        }, err => {
            console.log(err);
        }, () => {

          depositData.type = 'balance';
          depositData.deposit_token = depositToken;

          this.depositService.addDeposit(depositData).subscribe(result => {
            console.log(result);
          }, err => {
            console.log(err);
          }, () => {

            if(!this.currentUser.admin) {
              this.sendPush();
            }

            this.loadingActivated = false;
            this.depositSuccess = true;
            setTimeout(() => {
              this.navCtrl.pop();
            }, 1500);
          });
        })
      }
    }

    if(this.type === 'deposit:cash') {
      console.log("type cash");
      this.teamService.updateTeamBalance(this.teamData.uuid, this.depositData.amount).subscribe(result => {
        console.log("success");
      }, err => {
        console.log(err);
      }, () => {

        depositData.type = 'cash';

        this.depositService.addDeposit(depositData).subscribe(result => {
        }, err => {
          console.log(err);
        }, () => {

          if(!this.currentUser.admin) {
            this.sendPush();
          }

          this.loadingActivated = false;
          this.depositSuccess = true;
          //this.events.publish('deposit:cash', this.depositData.amount);
          console.log("amount", this.depositData.amount);
          setTimeout(() => {
            this.navCtrl.pop();
          }, 1500);
        });
      })
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  updateFee() {
    let amount = parseFloat(this.depositData.amount).toFixed(2);
    console.log(amount);
    this.depositData.fee = Math.round((this.depositData.amount * 1.013 - this.depositData.amount) * 100) / 100;
    this.depositData.total = Math.round((this.depositData.amount * 1.013) * 100) / 100;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Einzahlung erfolgreich',
      duration: 1500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }

  sendPush() {
    this.pushService.getPushOfTeamWalletManager(this.currentUser.team_id).subscribe((tokens: Array<any>) => {
      let message: string = this.currentUser.prename + " " + this.currentUser.surname + " hat " + this.depositData.amount + "€ in die Mannschaftskasse eingezahlt";
      this.pushService.sendPush(tokens, message).subscribe(result => {
        console.log(result);
      }, err => {
        console.error(err);
      })
    }, err => {
      console.error(err);
    });
  }
}
