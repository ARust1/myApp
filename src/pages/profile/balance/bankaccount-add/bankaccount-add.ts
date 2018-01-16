import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {User} from "../../../../models/user-model";
import {PaymentProvider} from "../../../../providers/payment";

/**
 * Generated class for the BankaccountAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bankaccount-add',
  templateUrl: 'bankaccount-add.html',
})
export class BankaccountAddPage {

  private userData: User;
  private stripeBankData = {
    account_token: '',
    country: 'DE',
    currency: 'EUR',
    account_holder_name: '',
    account_holder_type: 'individual',
    account_number: ''
  };
  private bankData: any;
  private loadingActivated: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private paymentService: PaymentProvider,
              public events: Events) {
    this.userData = this.navParams.get('userData');
    this.stripeBankData.account_token = this.userData.accountToken;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankaccountAddPage');
  }

  createBankAccount()
  {
    this.loadingActivated = true;
    this.paymentService.addBankAccount(this.stripeBankData).subscribe((result: any) => {
      this.bankData = result.card;
      console.log(result);
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.events.publish('bankAccount:add', this.bankData);
      this.loadingActivated = false;
      this.navCtrl.pop();
    });
  }
}
