import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {PaymentListPage} from "./payment-list/payment-list";
import {User} from "../../../models/user-model";
import {PaymentProvider} from "../../../providers/payment";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  @ViewChild(Slides) slides: Slides;

  private userData: User;
  private bankAccountData = [];
  private bankAccountDetailsLoaded = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public paymentService: PaymentProvider) {
    this.userData = this.navParams.get('userData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ngOnInit() {
    this.getBankAccounts(this.userData.accountToken);
  }

  goToPaymentList() {
    this.navCtrl.push(PaymentListPage, {
      userData: this.userData
    });
  }

  getBankAccounts(accountToken: string): any {
    let accountDetails;
    this.paymentService.getStripeAccount(accountToken).subscribe((result: any) => {
      console.log(result);
      accountDetails = result;
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.bankAccountData = accountDetails.external_accounts.data;
      this.bankAccountDetailsLoaded = true;
    });
  }
}
