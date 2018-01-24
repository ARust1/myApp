import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user-model";
import {DepositProvider} from "../../providers/deposit";
import {PayoutProvider} from "../../providers/payout";
import {Payout} from "../../models/stripe-payment-model";

/**
 * Generated class for the PayoutListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payout-list',
  templateUrl: 'payout-list.html',
})
export class PayoutListPage {

  private userData: User;
  private payoutList: Payout[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public payoutService: PayoutProvider) {
    this.userData = this.navParams.get('userData');
    console.log(this.userData);
  }

  ngOnInit() {
    this.getAllDeposits();
  }

  getAllDeposits() {
    this.payoutService.getPayoutsByTeam(this.userData.team_id).subscribe(result => {
      this.payoutList = result;
    }, err => {
      console.log(err);
    }, () => {
      console.log(this.payoutList);
    })
  }
}
