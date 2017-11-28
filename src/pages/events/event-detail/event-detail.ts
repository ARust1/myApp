import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Event} from "../../../models/event-model";
import {EventModalPage} from "../event-modal/event-modal";
import {User} from "../../../models/user-model";
import { Slides } from 'ionic-angular';
import {EventServiceProvider} from "../../../providers/event-service";
import {EventInviteProvider} from "../../../providers/event-invite";
import {EventInvite} from "../../../models/event-invite-model";


@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  private eventData: Event;
  private userData: User;
  private inviteList: EventInvite[];
  private page: any = 'detail';
  private participationCount: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventInviteService: EventInviteProvider) {

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
    })
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
}
