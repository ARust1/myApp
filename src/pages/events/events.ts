import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user-model";
import {EventModalPage} from "./event-modal/event-modal";
import {EventServiceProvider} from "../../providers/event-service/event-service";
import {Event} from "../../models/event-model";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  private userData: User;
  private eventArr: Event[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private eventService: EventServiceProvider) {


    this.userData = this.navParams.data;
    this.getEvents(this.userData.team_id);

  }

  ionViewDidLoad() {
    console.log(this.eventArr);
  }

  getEvents(team_id: string): any {
    this.eventService.getEventsByTeamId(team_id).subscribe((result: Event[]) => {
      this.eventArr = result;
    }, (err: any) => {
      console.log(err);
    });
  }

  presentEventModal() {
    let profileModal = this.modalCtrl.create(EventModalPage, {
      userData : this.userData
    });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
}
