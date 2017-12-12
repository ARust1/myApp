import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FeedbackProvider} from "../../providers/feedback";
import {EventServiceProvider} from "../../providers/event-service";
import {EventInviteProvider} from "../../providers/event-invite";

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
              public eventInviteService: EventInviteProvider) {
    this.inviteData = this.navParams.get('inviteData');
  }

  ngOnInit() {
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
      this.feedbackService.presentToast("Sie bezahlen bar!");
      this.inviteData.paymentMethod = 1;
    }, (err: any) => {
      console.log(err)
    })

  }
}
