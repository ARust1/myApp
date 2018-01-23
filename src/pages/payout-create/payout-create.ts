import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, Events} from 'ionic-angular';
import {User} from "../../models/user-model";
import {Team} from "../../models/team-model";
import {PaymentProvider} from "../../providers/payment";
import {TeamServiceProvider} from "../../providers/team-service";

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
  type: string;
  stripeToken: string;
  transferLoading: boolean = false;
  amount: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public paymentService: PaymentProvider,
              public teamService: TeamServiceProvider,
              public events: Events) {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayoutCreatePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  payout() {
    this.transferLoading = true;
    if(this.type === 'payout:online') {
      this.paymentService.payout(this.stripeToken, this.amount * 100).subscribe(result => {
        console.log(result);
      }, err => {
        console.log(err);
      }, () => {
      })
    }


    if(this.type === 'payout:cash') {
      setTimeout(() => {
        this.teamService.updateTeamBalance(this.teamData.uuid, -this.amount).subscribe(result => {
          this.events.publish('payout:cash', this.amount);
        }, err => {
          console.log(err);
        });
      }, 1500);
    }

    this.viewCtrl.dismiss();
  }

}
