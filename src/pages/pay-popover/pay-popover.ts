import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, Events} from 'ionic-angular';
import {FeedbackProvider} from "../../providers/feedback";
import {EventInviteProvider} from "../../providers/event-invite";
import {PaymentProvider} from "../../providers/payment";
import {Event} from "../../models/event-model";
import {User} from "../../models/user-model";
import {Penalty} from "../../models/penalty-model";
import {PenaltyProvider} from "../../providers/penalty";


@IonicPage()
@Component({
  selector: 'page-pay-popover',
  templateUrl: 'pay-popover.html',
})
export class PayPopoverPage
{

  private inviteData: any;
  private stripeAccountBalance: number;
  private eventData: Event;
  private userData: User;
  private penaltyData: Penalty;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public feedbackService: FeedbackProvider,
              public eventInviteService: EventInviteProvider,
              public penaltyService: PenaltyProvider,
              private alertCtrl: AlertController,
              private paymentService: PaymentProvider,
              public events: Events)
  {
    this.inviteData = this.navParams.get('inviteData');
    this.eventData = this.navParams.get('eventData');
    this.stripeAccountBalance = this.navParams.get('stripeAccountBalance');
    this.userData = this.navParams.get('userData');
    this.penaltyData = this.navParams.get('penaltyData');
  }

  ngOnInit()
  {
    if(this.stripeAccountBalance === undefined) {
      this.getStripeAccountBalance();
    }
  }

  close()
  {
    this.viewCtrl.dismiss({
      inviteData: this.inviteData,
      stripeAccountBalance: this.stripeAccountBalance,
      eventData: this.eventData,
      userData: this.userData
    });
  }

  getStripeAccountBalance()
  {
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

  payCash()
  {
      let title: string = "Zahlung";
      let message: string = "Sind Sie sicher, dass Sie den Ausflug bar bezahlen wollen?";
      this.feedbackService.presentConfirmAlert(this.payAlertButtons, title, message);
  }

  setCashPayment()
  {
    let data = {
      payment_method : 1
    };

    if(this.eventData && this.inviteData)
    {
      this.eventInviteService.setEventPayment(this.inviteData.e_uuid, data).subscribe((result: any) => {
        this.feedbackService.presentToast("Sie bezahlen bar!", 1500, 'middle');
        this.inviteData.paymentMethod = 1;
      }, (err: any) => {
        console.log(err)
      }, () => {
        this.events.publish('event:cash');
      })
    }
    if(this.penaltyData) {
      this.penaltyService.setPenaltyPayment(this.penaltyData.uuid, data).subscribe((result: any) => {
        this.feedbackService.presentToast("Sie bezahlen bar!", 1500, 'middle');
        this.penaltyData.payment_method = 1;
      }, (err: any) => {
        console.log(err)
      }, () => {
        this.events.publish('penalty:cash');
      })
    }

  }

  payWithBalance() {
    if(this.eventData) {
      if(this.stripeAccountBalance / 100 < this.eventData.amount) {
        let alert = this.alertCtrl.create({
          title: 'Zu wenig Guthaben!',
          subTitle: 'Ihr Guthaben ist zu niedrig um diesen Ausflug bezahlen zu können.',
          buttons: ['Ok']
        });

        alert.present();
        this.viewCtrl.dismiss();
      } else {
        let title: string = "Zahlung";
        let message: string = "Sind Sie sicher, dass Sie den Ausflug mit ihrem Guthaben bezahlen wollen?";
        this.feedbackService.presentConfirmAlert(this.stripeTransferAlertButtons, title, message);
      }
    }
    if(this.penaltyData) {
      if(this.stripeAccountBalance / 100 < this.penaltyData.amount) {
        let alert = this.alertCtrl.create({
          title: 'Zu wenig Guthaben!',
          subTitle: 'Ihr Guthaben ist zu niedrig um diesen Ausflug bezahlen zu können.',
          buttons: ['Ok']
        });

        alert.present();
        this.viewCtrl.dismiss();
      } else {
        /*let title: string = "Zahlung";
        let message: string = "Sind Sie sicher, dass Sie den Ausflug mit ihrem Guthaben bezahlen wollen?";
        this.feedbackService.presentConfirmAlert(this.stripeTransferAlertButtons, title, message);*/
      }
    }
  }

  chargeStripeAccountBalance() {
    this.feedbackService.showLoader("Transferiere...");
    let teamStripeToken: string = localStorage.getItem('teamStripeToken');
    if(this.eventData) {
      let description: string = "Mannschaftskasse | Ausflug: " + this.eventData.name;
      this.paymentService.transferFromStripeToStripeAccount(this.userData.accountToken, this.eventData.amount * 100, teamStripeToken, description).subscribe(result => {
      }, err => {
        console.log(err);
      }, () => {
        this.stripeAccountBalance -= this.eventData.amount * 100;
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
    if(this.penaltyData) {
      let description: string = "Mannschaftskasse | Strafe: " + this.penaltyData.name;
      this.paymentService.transferFromStripeToStripeAccount(this.userData.accountToken, this.penaltyData.amount * 100, teamStripeToken, description).subscribe(result => {
      }, err => {
        console.log(err);
      }, () => {
        this.stripeAccountBalance -= this.penaltyData.amount * 100;
        this.penaltyService.acceptPenaltyPayment(this.penaltyData.uuid).subscribe(result => {
          this.penaltyData.paid = true;
        }, err => {
          console.log(err);
        }, () => {
          this.feedbackService.dismissLoader();
          this.feedbackService.presentToast("Das Geld wurde überwiesen", 1500, 'bottom');
        });
      })
    }
  }

}
