import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventServiceProvider} from "../../../providers/event-service/event-service";
import {Event} from "../../../models/event-model";


@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  private eventData: Event;
  private inviteList;
  private page: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventService: EventServiceProvider) {
    this.eventData = this.navParams.data;
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
}
