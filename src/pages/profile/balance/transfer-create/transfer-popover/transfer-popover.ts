import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../../../../models/user-model";
import {PaymentProvider} from "../../../../../providers/payment";

@IonicPage()
@Component({
  selector: 'page-transfer-popover',
  templateUrl: 'transfer-popover.html',
})
export class TransferPopoverPage {

  private destinationData: User;
  private stripeTransferData = {
    amount : 0,
    currency: 'EUR',
    destination: ''
  };
  private transferLoading: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private paymentService: PaymentProvider) {
    this.destinationData = this.navParams.get('destinationData');

  }

  ionViewDidLoad() {
    this.stripeTransferData.destination = this.destinationData.accountToken;
  }

  createTransfer() {
    this.transferLoading = true;
    this.paymentService.createTransfer(this.stripeTransferData).subscribe((result: any) => {

    }, (err: any) => {
      console.log(err);
    }, () => {
      this.transferLoading = false;
      setTimeout(() => {
        this.navCtrl.pop();
      }, 1500);
    })
  }
}
