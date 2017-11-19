import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventServiceProvider} from "../../../providers/event-service/event-service";
import {Event} from "../../../models/event-model";
import {EventModalPage} from "../event-modal/event-modal";
import {User} from "../../../models/user-model";


@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  private eventData: Event;
  private userData: User;
  private inviteList;
  private page: any = 'detail';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventService: EventServiceProvider) {
    this.eventData = this.navParams.get('eventData');
    console.log(this.eventData);
    this.userData = this.navParams.get('userData');
  }

  ionViewDidLoad() {
    this.getInviteList(this.eventData.uuid);
  }

  getInviteList(event_id) {
    this.eventService.getEventInvites(event_id).subscribe((result: any) => {
      this.inviteList = result;
    }, (err: any) => {
      console.log(err);
    })
  }

  updateEvent(event) {
    console.log(this.eventData);
    this.navCtrl.push(EventModalPage, {
      userData: this.userData,
      eventData: this.eventData,
      inviteList: this.inviteList
    })
  }
}
