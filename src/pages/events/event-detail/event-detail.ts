import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Event} from "../../../models/event-model";
import {EventModalPage} from "../event-modal/event-modal";
import {User} from "../../../models/user-model";
import { Slides } from 'ionic-angular';
import {EventServiceProvider} from "../../../providers/event-service";
import {EventInviteProvider} from "../../../providers/event-invite";
import {EventInvite} from "../../../models/event-invite-model";
import {FeedbackProvider} from "../../../providers/feedback";
import {PayPopoverPage} from "../../pay-popover/pay-popover";
import {TeamServiceProvider} from "../../../providers/team-service";
import {Team} from "../../../models/team-model";


@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  private eventData: Event;
  private userData: User;
  private teamData: Team;
  private inviteList: EventInvite[];
  private inviteData: any;
  private page: any = 'detail';
  private participationCount: number;
  private declinedCount: number;
  private noReactionCount: number;
  private paidCount: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventInviteService: EventInviteProvider,
              public feedbackService: FeedbackProvider,
              public popoverCtrl: PopoverController,
              public teamService: TeamServiceProvider) {

    this.eventData = this.navParams.get('eventData');
    this.userData = this.navParams.get('userData');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getInviteList(this.eventData.uuid);

  }

  getInviteList(event_id) {
    this.eventInviteService.getEventInvites(event_id).subscribe((result: any) => {
      console.log(result);
      this.inviteList = result;
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.buildStatistic();
      this.inviteList.filter(data => {
        if(data.user.uuid == this.userData.uuid) {
          this.inviteData = data;
        }
      });
      console.log(this.inviteData);
    })
  }

  acceptInvite() {
    this.eventInviteService.setEventParticipation(this.inviteData.e_uuid, 2).subscribe((result: any) => {
      this.inviteData.participation = 2;
      this.feedbackService.presentToast("Sie nehmen am Ausflug " + this.eventData.name + " teil");
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.buildStatistic();
    });
  }

  declineInvite() {
    this.eventInviteService.setEventParticipation(this.inviteData.e_uuid, 1).subscribe((result: any) => {
      this.inviteData.participation = 1;
      this.feedbackService.presentToast("Sie haben dem Auslfug " + this.eventData.name + " abgesagt");
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.buildStatistic();
    });
  }

  payEvent() {
    if (this.inviteData.participation == 1) {
      this.feedbackService.presentToast("Sie müssen dem Ausflug erst zusagen bevor Sie bezahlen können");
    } else {
      if(this.inviteData.paid != 0 || this.inviteData.paymentMethod != 0) {
        this.feedbackService.presentToast("Sie haben bereits eine Bezahlung angegeben");
      } else {
        let popover = this.popoverCtrl.create(PayPopoverPage, {
          inviteData: this.inviteData
        });
        popover.present();

        popover.onDidDismiss(data => {
          if(data) {
            console.log(data);
          }
        })
      }
    }
  }

  confirmPayment() {
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
          this.acceptPayment();
        }
      }
    ];
    let message = "Sind Sie sicher, dass Sie die Bezahlung bestätigen wollen?";
    let title = "Bezahlung bestätigen";
    this.feedbackService.presentConfirmAlert(buttons, title, message);

  }

  acceptPayment() {
    this.eventInviteService.acceptEventPayment(this.inviteData.e_uuid).subscribe((result: any) => {
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.teamService.updateTeamBalance(this.userData.team_id, this.eventData.sum).subscribe((result: any) => {
        this.feedbackService.presentToast("Bezahlung akzeptiert. Es wurden " + this.eventData.sum + "€ in die Mannschaftskasse eingezahlt.");
        this.inviteData.paid = 1;
      }, (err: any) => {
        console.log(err);
      })
    });
  }

  updateEvent() {
    let userList = [];
      this.inviteList.forEach(item => {
        userList.push(item.user);
      });

    this.navCtrl.push(EventModalPage, {
      flag: 'update',
      userData: this.userData,
      eventData: this.eventData,
      inviteList: userList
    })
  }

  buildStatistic() {
    this.noReactionCount = 0;
    this.declinedCount = 0;
    this.participationCount = 0;
    this.paidCount = 0;
    this.inviteList.forEach((user: any) => {
      console.log(user.participation);
      switch (user.participation) {
        case 0:
          this.noReactionCount++;
          break;
        case 1:
          this.declinedCount++;
          break;
        case 2:
          this.participationCount++;
          break;
      }
      switch (user.paid) {
        case 1:
          this.paidCount++;
          break;
      }
    })
  }
}
