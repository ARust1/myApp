import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {FeedbackProvider} from "../../providers/feedback";
import {EventInviteProvider} from "../../providers/event-invite";
import {PaymentProvider} from "../../providers/payment";
import {Event} from "../../models/event-model";
import {User} from "../../models/user-model";

/**
 * Generated class for the PayPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-popover',
  templateUrl: 'pay-popover.html',
})
export class PayPopoverPage {

  private inviteData: any;
  private stripeAccountBalance: number;
  private eventData: Event;
  private userData: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public feedbackService: FeedbackProvider,
              public eventInviteService: EventInviteProvider,
              private alertCtrl: AlertController,
              private paymentService: PaymentProvider) {

    this.inviteData = this.navParams.get('inviteData');
    this.eventData = this.navParams.get('eventData');
    this.stripeAccountBalance = this.navParams.get('stripeAccountBalance');
    this.userData = this.navParams.get('userData');
  }

  ngOnInit() {
    if(this.stripeAccountBalance === undefined) {
      this.getStripeAccountBalance();
    }
  }

  close() {
    this.viewCtrl.dismiss({
      inviteData: this.inviteData,
      stripeAccountBalance: this.stripeAccountBalance,
      eventData: this.eventData,
      userData: this.userData
    });
  }

  getStripeAccountBalance() {
    let balanceDetails;
    this.paymentService.getStripeAccountBalance(this.userData.accountToken).subscribe((result: any) => {
      balanceDetails = result;
    }, (err: any) => {
      console.log(err);
    }, () => {
      if(balanceDetails && balanceDetails.available && balanceDetails.pending) {
        this.stripeAccountBalance = balanceDetails.available[0].amount;
      }
    });
  }

  private payAlertButtons = [
    {
      text: 'Abbrechen',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Bar bezahlen',
      handler: () => {
        this.setCashPayment();
        this.viewCtrl.dismiss(this.inviteData);
      }
    }
  ];

  private stripeTransferAlertButtons = [
    {
      text: 'Abbrechen',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Mit Guthaben bezahlen',
      handler: () => {
        this.chargeStripeAccountBalance();
        this.viewCtrl.dismiss(this.inviteData);
      }
    }
  ];

  payCash() {
      let title: string = "Zahlung";
      let message: string = "Sind Sie sicher, dass Sie den Ausflug bar bezahlen wollen?";
      this.feedbackService.presentConfirmAlert(this.payAlertButtons, title, message);
  }

  setCashPayment() {
    let data = {
      payment_method : 1
    };

    this.eventInviteService.setEventPayment(this.inviteData.e_uuid, data).subscribe((result: any) => {
      this.feedbackService.presentToast("Sie bezahlen bar!", 1500, 'middle');
      this.inviteData.paymentMethod = 1;
    }, (err: any) => {
      console.log(err)
    })

  }

  payWithBalance() {
    console.log(this.eventData.sum + " " + this.stripeAccountBalance / 100);
    if(this.stripeAccountBalance / 100 < this.eventData.sum) {
        let alert = this.alertCtrl.create({
          title: 'Zu wenig Guthaben!',
          subTitle: 'Ihr Guthaben ist zu niedrig um diesen Ausflug bezahlen zu können.',
          buttons: ['Ok']
        });

        alert.present();
      } else {
      let title: string = "Zahlung";
      let message: string = "Sind Sie sicher, dass Sie den Ausflug mit ihrem Guthaben bezahlen wollen?";
      this.feedbackService.presentConfirmAlert(this.stripeTransferAlertButtons, title, message);
    }
  }

  chargeStripeAccountBalance() {
    this.feedbackService.showLoader("Transferiere...");
    let teamStripeToken: string = localStorage.getItem('teamStripeToken');
    console.log(teamStripeToken);
    let description: string = "Mannschaftskasse | Ausflug: " + this.eventData.name;
    this.paymentService.transferFromStripeToStripeAccount(this.userData.accountToken, this.eventData.sum * 100, teamStripeToken, description).subscribe(result => {
    }, err => {
      console.log(err);
    }, () => {
      this.stripeAccountBalance -= this.eventData.sum * 100;
      this.eventInviteService.acceptEventPayment(this.inviteData.e_uuid).subscribe(result => {
        this.inviteData.paid = 1;
      }, err => {
        console.log(err);
      }, () => {
        this.feedbackService.dismissLoader();
        this.feedbackService.presentToast("Das Geld wurde überwiesen", 1500, 'bottom');
      });
    })
  }

}
