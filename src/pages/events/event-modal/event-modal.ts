import { Component } from '@angular/core';
import {
  IonicPage, ModalController, NavController, NavParams, PopoverController, ToastController,
  ViewController
} from 'ionic-angular';
import {Event} from "../../../models/event-model";
import {User} from "../../../models/user-model";
import {EventServiceProvider} from "../../../providers/event-service/event-service";
import {DatePickerPage} from "./date-picker/date-picker";
import * as moment from "moment";
import {EventInviteListPage} from "../event-invite-list/event-invite-list";
import {EventDetailPage} from "../event-detail/event-detail";

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html'
})
export class EventModalPage {

  private eventData: Event;
  private eventArr: Event[];
  private userData: User;
  private inviteList: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventService: EventServiceProvider,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController) {

  }

  ngOnInit() {
    if(this.navParams.get('eventData')) {
      this.eventData = this.navParams.get('eventData')
    } else {
      this.eventData = new Event();
    }
    if(this.navParams.get('inviteList')) {
      this.inviteList = this.navParams.get('inviteList');
    } else {
      this.inviteList = [];
    }
    this.userData = this.navParams.get('userData');
    this.eventArr = this.navParams.get('events');
  }

  ionViewWillEnter() {
    if(this.navCtrl.last().component == EventInviteListPage
    || this.navCtrl.last().component == EventDetailPage) {


      console.log(this.inviteList);
    }
  }

  createEvent(): any {
    this.eventData.team_id = this.userData.team_id;
    this.eventService.createEvent(this.eventData).subscribe((result: any) => {
      this.eventArr.push(this.eventData);
      this.persistInviteList(result);
      this.dismiss();
    }, (err:any) => {
      console.log(err);
    }, () => {
    })
  }

  persistInviteList(event_id) {
    for(let invite of this.inviteList) {
      this.eventService.addEventInvite(invite.uuid, event_id).subscribe((result: any) => {
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  dismiss() {
    this.navCtrl.pop(this.eventArr);
  }

  startDate() {
    let popover = this.popoverCtrl.create(DatePickerPage, this.eventData.startDate);
    popover.present();

    popover.onDidDismiss(date => {
      if(date) {
        this.eventData.startDate = date.format('L');
      }
    })
  }

  endDate() {
    let popover = this.popoverCtrl.create(DatePickerPage, this.eventData.endDate);
    popover.present();

    popover.onDidDismiss(date => {
      if(date) {
        this.eventData.endDate = date.format('L');
      }
    })
  }

  goToInviteList() {

    let modal = this.modalCtrl.create(EventInviteListPage, {
      team_id: this.userData.team_id,
      inviteList: this.inviteList
    });
    modal.present();
    modal.onDidDismiss((data: any) => {
      if(data) {
        this.inviteList = data;
      }
    })

  }

}
