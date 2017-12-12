import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FeedbackProvider} from "../../providers/feedback";
import {EventServiceProvider} from "../../providers/event-service";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public feedbackService: FeedbackProvider,
              public eventService: EventServiceProvider) {
    this.inviteData = this.navParams.get('inviteData');
  }

  ngOnInit() {
    console.log(this.inviteData);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  private payAlertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Bar bezahlen',
      handler: () => {
        this.setCashPayment();
        this.viewCtrl.dismiss();
      }
    }
  ];

  payCash() {
    if(this.inviteData.paid == 0 || this.inviteData.paymentMethod == 0) {
      let title: string = "Zahlung";
      let message: string = "Sind Sie sicher, dass Sie den Ausflug bar bezahlen wollen?";
      this.feedbackService.presentConfirmAlert(this.payAlertButtons, title, message);
    } else {
      this.feedbackService.presentToast("Sie haben bereits eine Bezahlung angegeben");
      this.viewCtrl.dismiss();
    }
  }

  setCashPayment() {
    let data = {
      payment_method : 1
    };

    this.eventService.setEventPayment(this.inviteData.e_uuid, data).subscribe((result: any) => {
      this.feedbackService.presentToast("Sie bezahlen bar!");
    }, (err: any) => {
      console.log(err)
    })

  }
}
