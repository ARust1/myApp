import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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

  paymentMethod: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ngOnInit() {
    this.paymentMethod = 'ec';
  }

  ionViewDidLoad() {
  }

}
