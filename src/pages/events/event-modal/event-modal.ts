import { Component } from '@angular/core';
import {
  IonicPage, ModalController, NavController, NavParams, PopoverController
} from 'ionic-angular';
import {Event} from "../../../models/event-model";
import {User} from "../../../models/user-model";
import {DatePickerPage} from "./date-picker/date-picker";
import {EventInviteListPage} from "../event-invite-list/event-invite-list";
import {EventServiceProvider} from "../../../providers/event-service";
import {EventInviteProvider} from "../../../providers/event-invite";
import {DatePicker} from "@ionic-native/date-picker";
import * as moment from "moment";

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
  private deleteList: User[];
  private updateList: User[];
  private update: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventService: EventServiceProvider,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              private datePicker: DatePicker,
              public eventInviteService: EventInviteProvider) {
    this.deleteList = [];
  }

  ngOnInit() {
    if(this.navParams.get('eventData')) {
      this.eventData = this.navParams.get('eventData');

      if(this.navParams.get('flag') === 'update') {
        this.update = 'update';
      }
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
  }

  createEvent(): any {
    let event_id: string = '';
    this.eventData.team_id = this.userData.team_id;
    this.eventService.createEvent(this.eventData).subscribe((result: any) => {
      event_id = result;
    }, (err:any) => {
      console.log(err);
    }, () => {
      this.eventData.uuid = event_id;
      this.eventArr.push(this.eventData);
      this.persistInviteList(event_id);
      this.dismiss();
    })
  }

  persistInviteList(event_id) {
    this.inviteList.map(invite => {
      this.eventInviteService.addEventInvite(invite.uuid, event_id).subscribe((result: any) => {
      }, (err: any) => {
        console.log(err);
      });
    });
  }

  dismiss() {
    this.navCtrl.pop(this.eventArr);
  }

  startDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
    }).then(
      date => this.eventData.startDate = moment(date).format('L'),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  endDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
    }).then(
      date => this.eventData.endDate = moment(date).format('L'),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  goToInviteList() {

    let modal = this.modalCtrl.create(EventInviteListPage, {
      team_id: this.userData.team_id,
      inviteList: this.inviteList
    });
    modal.present();
    modal.onDidDismiss((data: any) => {
      if(data) {
        this.inviteList = data.inviteList;
        this.updateList = data.updateList;
        console.log(this.updateList);
      }
    })

  }

  updateEvent() {
    this.eventService.updateEvent(this.eventData).subscribe((result: any) => {
      this.navCtrl.pop();
    }, (err: any) => {
      console.log(err);
    }, () => {
      if(this.deleteList) {
        this.deleteList.forEach(user => {
          this.eventInviteService.deleteEventInvite(user.uuid, this.eventData.uuid).subscribe((result: any) => {
          }, (err: any) => {
            console.log(err);
          });
        });
      }
      if(this.updateList) {
        this.updateList.forEach(user => {
          console.log(user);
          this.eventInviteService.addEventInvite(user.uuid, this.eventData.uuid).subscribe((result: any) => {

          }, (err: any) => {
            console.log(err);
          })
        })
      }

    })
  }

  addToDelete(user) {
    this.deleteList.push(user);
    console.log(this.deleteList);
    this.delete(user);
  }

  delete(user) {
    let index = this.inviteList.indexOf(user);
    this.inviteList.splice(index, 1);
  }


}
