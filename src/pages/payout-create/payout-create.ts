import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, Events} from 'ionic-angular';
import {User} from "../../models/user-model";
import {Team} from "../../models/team-model";
import {PaymentProvider} from "../../providers/payment";
import {TeamServiceProvider} from "../../providers/team-service";
import {Deposit, Payout} from "../../models/stripe-payment-model";
import {Credentials} from "../../providers/credentials";
import {DepositProvider} from "../../providers/deposit";
import {PayoutProvider} from "../../providers/payout";

/**
 * Generated class for the PayoutCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payout-create',
  templateUrl: 'payout-create.html',
})
export class PayoutCreatePage {

  private userData: User;
  private teamData: Team;
  private currentUser: User;
  type: string;
  stripeToken: string;
  transferLoading: boolean = false;
  amount: number = 0;
  private recipient: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public paymentService: PaymentProvider,
              public teamService: TeamServiceProvider,
              public payoutService: PayoutProvider,
              public events: Events,
              public credentials: Credentials) {

    this.currentUser = this.credentials.getUser();
    this.recipient = this.currentUser.prename + " " + this.currentUser.surname;

    this.type = this.navParams.get('type');

    this.userData = this.navParams.get('userData');
    this.teamData = this.navParams.get('teamData');
    if(this.userData) {
      this.stripeToken = this.userData.accountToken;
    } else {
      this.stripeToken = this.teamData.stripeToken;
    }

  }

  close() {
    this.viewCtrl.dismiss();
  }

  payout() {
    this.transferLoading = true;

    let payoutData: Payout = new Payout();
    payoutData.timestamp = new Date();
    payoutData.amount = this.amount * 100;
    payoutData.recipient = this.recipient;
    payoutData.team_id = this.currentUser.team_id;
    payoutData.user_id = this.currentUser.uuid;

    if(this.type === 'payout:online') {
      this.paymentService.payout(this.stripeToken, this.amount * 100).subscribe(result => {
        console.log(result);
      }, err => {
        console.log(err);
      }, () => {
        payoutData.type = 'online';
        payoutData.payout_token = this.stripeToken;

        this.payoutService.addPayout(payoutData).subscribe(result => {
          console.log(result);
        }, err => {
          console.log(err);
        }, () => {
        })
      })
    }

    if(this.type === 'payout:cash') {
      this.teamService.updateTeamBalance(this.teamData.uuid, -this.amount).subscribe(result => {
        this.events.publish('payout:cash', this.amount);
      }, err => {
        console.log(err);
      }, () => {
        payoutData.type = 'cash';

        this.payoutService.addPayout(payoutData).subscribe(result => {
          console.log(result);
        }, err => {
          console.log(err);
        }, () => {
        })
      });
    }

    this.viewCtrl.dismiss();
  }

}
