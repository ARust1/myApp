import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user-model";
import {EventModalPage} from "./event-modal/event-modal";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  private userData: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {

    this.userData = this.navParams.data;
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
