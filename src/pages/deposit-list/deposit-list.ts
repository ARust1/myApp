import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DepositProvider} from "../../providers/deposit";
import {User} from "../../models/user-model";
import {Deposit} from "../../models/stripe-payment-model";

@IonicPage()
@Component({
  selector: 'page-deposit-list',
  templateUrl: 'deposit-list.html',
})
export class DepositListPage {

  private userData: User;
  private depositOnlineList: Deposit[] = [];
  private depositCashList: Deposit[] = [];
  segment: string = 'online';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public depositService: DepositProvider) {
    this.userData = this.navParams.get('userData');
    console.log(this.userData);
  }

  ngOnInit() {
    this.getAllDeposits();
  }

  getAllDeposits() {
    this.depositService.getDepositsByTeam(this.userData.team_id).subscribe(result => {
      let tmpResult = result;
      if(!this.userData.admin) {
        tmpResult = result.filter(deposit => {
          deposit.user_id.indexOf(this.userData.uuid) != 0;
        })
      }
      tmpResult.forEach(deposit => {
        if(deposit.type === 'cash') {
          this.depositCashList.push(deposit);
        } else {
          this.depositOnlineList.push(deposit);
        }
      })
    }, err => {
      console.log(err);
    }, () => {
      console.log(this.depositOnlineList);
      console.log(this.depositOnlineList);
    })
  }
}
