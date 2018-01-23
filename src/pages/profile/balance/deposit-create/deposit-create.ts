import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController, Events} from 'ionic-angular';
import {PaymentProvider} from "../../../../providers/payment";
import {User} from "../../../../models/user-model";
import {Team} from "../../../../models/team-model";
import {TeamServiceProvider} from "../../../../providers/team-service";

@IonicPage()
@Component({
  selector: 'page-deposit-create',
  templateUrl: 'deposit-create.html',
})
export class DepositCreatePage {

  private userData: User;
  private teamData: Team;
  depositData = {
    amount: 0,
    fee: 0,
    total: 0
  };
  loadingActivated: boolean = false;
  depositSuccess: boolean = false;
  stripeToken: string;
  type: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private paymentService: PaymentProvider,
              private teamService: TeamServiceProvider,
              private toastCtrl: ToastController,
              private events: Events) {
    this.type = this.navParams.get('type');
    console.log(this.type);
    this.userData = this.navParams.get('userData');
    this.teamData = this.navParams.get('teamData');
    if(this.userData) {
      this.stripeToken = this.userData.accountToken;
    } else {
      this.stripeToken = this.teamData.stripeToken;
    }
  }

  deposit() {
    this.loadingActivated = true;
    if(this.type === 'deposit:online') {
      this.paymentService.chargeStripeBankAccount(this.stripeToken, this.depositData.amount * 100).subscribe((result: any) => {

      }, (err: any) => {
        console.log(err);
      }, () => {
        this.loadingActivated = false;
        this.depositSuccess = true;
        setTimeout(() => {
          this.navCtrl.pop();
        }, 1500);
      });
    }

    if(this.type === 'deposit:cash') {
      console.log("type cash");
      this.teamService.updateTeamBalance(this.teamData.uuid, this.depositData.amount).subscribe(result => {
        console.log("success");
      }, err => {
        console.log(err);
      }, () => {
        this.loadingActivated = false;
        this.depositSuccess = true;
        this.events.publish('deposit:cash', this.depositData.amount);
        console.log("amount", this.depositData.amount);
        setTimeout(() => {
          this.navCtrl.pop();
        }, 1500);
      })
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  updateFee() {
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
}
