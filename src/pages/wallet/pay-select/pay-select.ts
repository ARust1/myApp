import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {User} from "../../../models/user-model";
import {FeedbackProvider} from "../../../providers/feedback";
import {PaymentProvider} from "../../../providers/payment";
import {Team} from "../../../models/team-model";
import {Transaction} from "../../../models/stripe-payment-model";
import {TransactionProvider} from "../../../providers/transaction";
import {TeamServiceProvider} from "../../../providers/team-service";
import {UserServiceProvider} from "../../../providers/user-service";
import {Subscription} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-pay-select',
  templateUrl: 'pay-select.html',
})
export class PaySelectPage {

  type: string = 'cash';
  formName: string = '';
  private transactionUser: User;
  private teamData: Team;
  private transactionData: Transaction;
  private teamSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public feedbackService: FeedbackProvider,
              private paymentService: PaymentProvider,
              private transactionService: TransactionProvider,
              private teamService: TeamServiceProvider,
              private userService: UserServiceProvider) {
    this.transactionData = new Transaction();
    this.transactionUser = this.navParams.get('transactionUser');
    this.teamData = this.navParams.get('teamData');
    this.transactionData.recipient = this.transactionUser.prename + " " + this.transactionUser.surname;
    this.transactionData.team_id = this.teamData.uuid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaySelectPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  transfer() {
    this.transactionData.timestamp = new Date();
    this.transactionData.type = this.type;
    this.transactionData.user_id = this.transactionUser.uuid;
    this.feedbackService.showLoader("Transferiere...");
    if(this.type === 'balance') {
      this.paymentService.transferFromStripeToStripeAccount(
        this.teamData.stripeToken,
        this.transactionData.amount * 100,
        this.transactionUser.accountToken ,
        this.transactionData.description).subscribe(result => {
          this.transactionData.transaction_token = result.id;
      }, err => {
        console.log(err);
      }, () => {
          console.log(this.transactionData);
        this.transactionService.addTransaction(this.transactionData).subscribe(result => {
        }, err => {
          console.log(err);
        }, () => {
          this.feedbackService.dismissLoader();
          this.viewCtrl.dismiss();
        })
      })
    }
    if(this.type === 'cash') {
      this.teamSubscription = this.teamService.updateTeamBalance(this.teamData.uuid, -this.transactionData.amount).subscribe(result => {
      }, err => {
        console.log(err);
        this.teamSubscription.unsubscribe();
      }, () => {
        this.userService.updateBalance(this.transactionUser.uuid, this.transactionData.amount).subscribe(result => {

        }, err => {
          console.log(err);
          this.teamSubscription.unsubscribe();
        }, () => {
          this.transactionService.addTransaction(this.transactionData).subscribe(result => {
          }, err => {
            console.log(err);
            this.teamSubscription.unsubscribe();
          }, () => {
            this.teamData.balance -= this.transactionData.amount;
            this.feedbackService.dismissLoader();
            this.viewCtrl.dismiss();
          })
        })
      })
    }
  }

}
