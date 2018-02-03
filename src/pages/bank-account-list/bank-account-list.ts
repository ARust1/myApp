import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BankAccountListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-account-list',
  templateUrl: 'bank-account-list.html',
})
export class BankAccountListPage {

  private bankAccountData: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.bankAccountData = navParams.get('bankAccountData');
  }

  ionViewDidLoad() {
   console.log(this.bankAccountData);
  }

}
