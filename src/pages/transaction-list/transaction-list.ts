import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction';
import { User } from '../../models/user-model';
import { Transaction } from '../../models/stripe-payment-model';

@IonicPage()
@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html',
})
export class TransactionListPage {

  private userData: User;
  private transactionCashList: Transaction[] = [];
  private transactionOnlineList: Transaction[] = [];
  segment: string = 'online';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private transactionService: TransactionProvider) {
    this.userData = this.navParams.get('userData');
  }

  ngOnInit() {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getTransactionsByTeam(this.userData.team_id).subscribe(result => {
      result.forEach((transaction: Transaction) => {
        if(transaction.type === 'cash') {
          this.transactionCashList.push(transaction);
        } else {
          this.transactionOnlineList.push(transaction);
        }
      });
    }, err => {
      console.log(err);
    }, () => {
      console.log(this.transactionCashList);
      console.log(this.transactionOnlineList);
    })
  }

}
