import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../../models/user-model";
import {PaymentProvider} from "../../../providers/payment";
import {TransferCreatePage} from "./transfer-create/transfer-create";

/**
 * Generated class for the TransfersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-list',
  templateUrl: 'transfer-list.html',
})
export class TransfersPage {

  private userData: User;
  private depositList = [];
  private depositListLoaded = false;
  private transferList = [];
  private transferListLoaded = false;
  private payoutsList = [];
  private payoutsListLoaded = false;
  private availableBalance: number;
  private pendingBalance: number;
  private balanceLoaded: boolean = false;
  page = 'Deposit';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private paymentService: PaymentProvider) {
    this.userData = this.navParams.get('userData');
  }

  ngOnInit() {
    console.log(this.userData);
    this.getStripeAccountBalance();
    this.getTransfers();
    this.getPayouts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransfersPage');
  }

  getStripeAccountBalance() {
    let balanceDetails;
    this.paymentService.getStripeAccountBalance(this.userData.accountToken).subscribe((result: any) => {
      balanceDetails = result;
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.availableBalance = balanceDetails.available[0].amount;
      this.pendingBalance = balanceDetails.pending[0].amount;
      console.log(this.availableBalance);
      console.log(this.pendingBalance);
      this.balanceLoaded = true;
    });
  }

  getTransfers() {
    let transferDetails;
    this.paymentService.listTransfers(this.userData.accountToken).subscribe((result: any) => {
      transferDetails = result;
      console.log(transferDetails.data);
    }, (err: any) => {
      console.log(err);
    }, () => {
      transferDetails.data.forEach(transfer => {
        if(transfer.destination == this.userData.accountToken) {
          this.depositList.push(transfer)
        } else {
          this.transferList.push(transfer)
        }
      });
      console.log(this.depositList);
      console.log(this.transferList);
      this.transferListLoaded = true;
    })
  }

  goToCreateTransfer() {
    this.navCtrl.push(TransferCreatePage, {
      userData: this.userData
    });
  }

  getPayouts() {
    let payoutDetails;
    this.paymentService.listPayouts(this.userData.accountToken).subscribe((result: any) => {
      payoutDetails = result;
      console.log(payoutDetails.data);
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.payoutsList = payoutDetails.data;
      this.payoutsListLoaded = true;
    })
  }
}
