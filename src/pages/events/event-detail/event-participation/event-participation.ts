import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventInviteProvider} from "../../../../providers/event-invite";
import {EventInvite} from "../../../../models/event-invite-model";
import {User} from "../../../../models/user-model";
import {FeedbackProvider} from "../../../../providers/feedback";
import {TeamServiceProvider} from "../../../../providers/team-service";
import {Event} from "../../../../models/event-model";

@IonicPage()
@Component({
  selector: 'page-event-participation',
  templateUrl: 'event-participation.html',
})
export class EventParticipationPage {

  private inviteList: EventInvite[];
  private eventData: Event;
  private userData: User;
  private inviteData: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eventInviteService: EventInviteProvider,
              private feedbackService: FeedbackProvider,
              private teamService: TeamServiceProvider) {
    this.eventData = this.navParams.get('eventData');
    this.inviteList = this.navParams.get('inviteList');
    this.userData = this.navParams.get('userData');
  }

  confirmPayment(invite) {
    let buttons = [
      {
        text: 'Abbrechen',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Bestätigen',
        handler: () => {
          this.acceptPayment(invite);
        }
      }
    ];
    let message = "Sind Sie sicher, dass Sie die Bezahlung bestätigen wollen?";
    let title = "Bezahlung bestätigen";
    this.feedbackService.presentConfirmAlert(buttons, title, message);

  }

  acceptPayment(invite) {
    this.eventInviteService.acceptEventPayment(invite.e_uuid).subscribe((result: any) => {
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.teamService.updateTeamBalance(this.userData.team_id, this.eventData.sum).subscribe((result: any) => {
        this.feedbackService.presentToast("Bezahlung akzeptiert. Es wurden " + this.eventData.sum + "€ in die Mannschaftskasse eingezahlt.", 1500, 'middle');
        invite.paid = 1;
        invite.paymentMethod = 0;
        this.inviteData = invite;
      }, (err: any) => {
        console.log(err);
      }, () => {
        console.log(this.inviteData);
      })
    });
  }
}
