import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user-model";
import {EventModalPage} from "./event-modal/event-modal";
import {Event} from "../../models/event-model";
import {EventDetailPage} from "./event-detail/event-detail";
import {EventServiceProvider} from "../../providers/event-service";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  private userData: User;
  private eventArr: Event[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private eventService: EventServiceProvider) {


    this.userData = this.navParams.data;
    console.log(this.navParams);
  }

  ngOnInit() {
    console.log(this.userData);
    this.getEvents(this.userData.team_id);
  }

  goToDetail(event) {
    this.navCtrl.push(EventDetailPage, {
      eventData: event,
      userData : this.userData,
      events : this.eventArr
    });
  }

  getEvents(team_id: string): any {
    this.eventService.getEventsByTeamId(team_id).subscribe((result: any) => {
      this.eventArr = result;
    }, (err: any) => {
      console.log(err);
    });
  }

  goToAddEvent() {
    this.navCtrl.push(EventModalPage, {
      userData : this.userData,
      events : this.eventArr
    })
  }

  presentEventModal() {
    let profileModal = this.modalCtrl.create(EventModalPage, {
      userData : this.userData,
      events : this.eventArr
    });
    profileModal.present();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getEvents(this.userData.team_id);

      console.log('Async operation has ended');
      console.log(this.eventArr);
      refresher.complete();
    }, 2000);
  }
}
