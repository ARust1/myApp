import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user-model";
import {DepositProvider} from "../../providers/deposit";
import {PayoutProvider} from "../../providers/payout";
import {Payout} from "../../models/stripe-payment-model";

@IonicPage()
@Component({
  selector: 'page-payout-list',
  templateUrl: 'payout-list.html',
})
export class PayoutListPage {

  private userData: User;
  private payoutCashList: Payout[] = [];
  private payoutOnlineList: Payout[] = [];
  private segment: string = 'online';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public payoutService: PayoutProvider) {
    this.userData = this.navParams.get('userData');
    console.log(this.userData);
  }

  ngOnInit() {
    this.getAllPayouts();
  }

  getAllPayouts() {
    this.payoutService.getPayoutsByTeam(this.userData.team_id).subscribe(result => {
      result.forEach(payout => {
        if(payout.type === 'online') {
          this.payoutOnlineList.push(payout);
        } else {
          this.payoutCashList.push(payout);
        }
      })
    }, err => {
      console.log(err);
    }, () => {
    })
  }
}
