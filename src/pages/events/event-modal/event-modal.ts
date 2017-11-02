import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Event} from "../../../models/event-model";
import {User} from "../../../models/user-model";
import {EventServiceProvider} from "../../../providers/event-service/event-service";

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  private eventData: Event = new Event();
  private eventArr: Event[];
  private userData: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventService: EventServiceProvider) {

  }

  ionViewDidLoad() {
    this.userData = this.navParams.get('userData');
    this.eventArr = this.navParams.get('events');
  }

  createEvent() {
    this.eventData.team_id = this.userData.team_id;
    this.eventService.createEvent(this.eventData).subscribe((result: any) => {
      this.eventArr.push(result);
      this.dismiss();
    }, (err:any) => {
      console.log(err);
    })
  }

  dismiss() {
    this.navCtrl.pop(this.eventArr);
  }
}
