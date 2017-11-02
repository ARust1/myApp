import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Event} from "../../../models/event-model";
import {User} from "../../../models/user-model";
import {Team} from "../../../models/team-model";

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  private eventData: Event = new Event();
  private userData: User;
  private teamData: Team;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
