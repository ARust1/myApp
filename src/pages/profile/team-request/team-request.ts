import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../../models/user-model";
import {Team} from "../../../models/team-model";

/**
 * Generated class for the TeamRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-request',
  templateUrl: 'team-request.html',
})
export class TeamRequestPage {

  private userData: User;
  private teamData: Team;
  private inviteRequests: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.userData = this.navParams.data.userData;
    this.teamData = this.navParams.data.teamData;
    this.inviteRequests = this.navParams.data.inviteRequests;
  }

  ionViewDidLoad() {
    console.log(this.userData);
    console.log(this.teamData);
    console.log(this.inviteRequests);
  }

}
