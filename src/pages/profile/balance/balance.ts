import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Events, ModalController} from 'ionic-angular';
import {User} from "../../../models/user-model";
import {PaymentProvider} from "../../../providers/payment";
import {DepositCreatePage} from "./deposit-create/deposit-create";
import {BankaccountAddPage} from "./bankaccount-add/bankaccount-add";

/**
 * Generated class for the TransfersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage {

  private userData: User;
  private depositList = [];
  private transferList = [];
  private transferListLoaded = false;
  private availableBalance: number;
  private pendingBalance: number;
  page = 'Balance';
  private bankAccountData: any;
  private bankAccountDetailsLoaded = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private paymentService: PaymentProvider,
              private alertCtrl: AlertController,
              private events: Events,
              private modalCtrl: ModalController) {
    this.userData = this.navParams.get('userData');
    this.availableBalance = this.navParams.get('availableBalance');
    this.pendingBalance = this.navParams.get('pendingBalance');

    this.events.subscribe(('bankAccount:add'), (bankAccountData) => {
      this.bankAccountData = bankAccountData;
    })
  }

  ngOnInit() {
    console.log(this.userData);
    this.getDeposits();
    this.getBankAccounts(this.userData.accountToken);
    console.log(this.availableBalance / 100);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransfersPage');
  }

  goToAddBankAccount() {
    this.navCtrl.push(BankaccountAddPage, {
      userData: this.userData
    });
  }

  getDeposits() {
    let transferDetails;
    this.paymentService.listTransfers(this.userData.accountToken).subscribe((result: any) => {
      transferDetails = result;
      console.log(transferDetails.data);
    }, (err: any) => {
      console.log(err);
    }, () => {
      if(transferDetails.data && transferDetails.data.length > 0) {
        transferDetails.data.forEach(transfer => {
          if(transfer.destination == this.userData.accountToken) {
            this.depositList.push(transfer)
          } else {
            this.transferList.push(transfer)
          }
        });
      }

      this.transferListLoaded = true;
    })
  }

  goToCreateDeposit() {
    let modal = this.modalCtrl.create(DepositCreatePage, {
      type: 'deposit:online',
      userData: this.userData
    });

    modal.present();
  }

  getBankAccounts(accountToken: string): any {
    let accountDetails;
    this.paymentService.getStripeAccount(accountToken).subscribe((result: any) => {
      if(result) {
        accountDetails = result;
      }

    }, (err: any) => {
      console.log(err);
    }, () => {
      if(accountDetails.external_accounts) {
        this.bankAccountData = accountDetails.external_accounts.data[0];
        this.bankAccountDetailsLoaded = true;
        console.log(this.bankAccountData);
      }
    });
  }

  payout() {
    let alert = this.alertCtrl.create({
      title: 'Auszahlen',
      inputs: [
        {
          name: 'amount',
          placeholder: 'Betrag',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Auszahlen',
          handler: data => {
            console.log(data.amount);
            if(data.amount > this.availableBalance / 100) {
              console.log("ZU VIEL GELD!");
            } else {
              console.log("PASST!");
            }
          }
        }
      ]
    });
    alert.present();
  }
}
