import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../../../models/user-model";
import {PaymentProvider} from "../../../../providers/payment";
import {FeedbackProvider} from "../../../../providers/feedback";

/**
 * Generated class for the PaymentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-list',
  templateUrl: 'payment-list.html',
})
export class PaymentListPage {

  private userData: User;
  paymentMethod: string;
  private stripeBankData = {
    account_token: '',
    country: 'DE',
    currency: 'EUR',
    account_holder_name: '',
    account_holder_type: 'individual',
    account_number: ''
  };

  private loadingActivated: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private paymentService: PaymentProvider,
              private feedbackService: FeedbackProvider) {
    this.userData = this.navParams.get('userData');
    this.stripeBankData.account_token = this.userData.accountToken;
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
  }

  createBankAccount() {
    this.loadingActivated = true;
    this.paymentService.addBankAccount(this.stripeBankData).subscribe((result: any) => {
      this.feedbackService.presentToast("Bankkonto wurde erfolgreich hinzugefügt");
      console.log(result);
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.loadingActivated = false;
      this.navCtrl.pop();
    });
  }

}
