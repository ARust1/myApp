import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {PaymentProvider} from "../../../../providers/payment";
import {User} from "../../../../models/user-model";

/**
 * Generated class for the TransferCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-create',
  templateUrl: 'transfer-create.html',
})
export class TransferCreatePage {

  private userData: User;
  depositData = {
    amount: 0,
    fee: 0,
    total: 0
  };
  loadingActivated: boolean = false;
  depositSuccess: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private paymentService: PaymentProvider,
              private toastCtrl: ToastController) {
    this.userData = this.navParams.get('userData');
  }

  deposit() {
    this.loadingActivated = true;
    this.paymentService.chargeStripeBankAccount(this.userData.accountToken, this.depositData.amount * 100).subscribe((result: any) => {

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

  updateFee() {
    this.depositData.fee = Math.round((this.depositData.amount * 1.13 - this.depositData.amount) * 100) / 100;
    this.depositData.total = Math.round((this.depositData.amount * 1.13) * 100) / 100;
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
