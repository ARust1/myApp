import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {Event} from "../../../models/event-model";
import {User} from "../../../models/user-model";
import {EventServiceProvider} from "../../../providers/event-service/event-service";
import {DatePickerPage} from "./date-picker/date-picker";

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html'
})
export class EventModalPage {

  private eventData: Event;
  private eventArr: Event[];
  private userData: User;
  private date: string;
  private type: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventService: EventServiceProvider,
              public popoverCtrl: PopoverController,
              public viewCtrl: ViewController) {

  }

  ngOnInit() {
    this.eventData = new Event();
    this.userData = this.navParams.get('userData');
    this.eventArr = this.navParams.get('events');
  }

  createEvent(): any {
    this.eventData.team_id = this.userData.team_id;
    this.eventService.createEvent(this.eventData).subscribe((result: any) => {
      this.eventArr.push(this.eventData);
      this.dismiss();
    }, (err:any) => {
      console.log(err);
    })
  }

  dismiss() {
    this.navCtrl.pop(this.eventArr);
  }

  openCalendar(event) {
    let popover = this.popoverCtrl.create(DatePickerPage);
    popover.present({
      ev: event
    });
  }

}
