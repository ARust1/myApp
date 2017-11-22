import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../../models/user-model";
import {Team} from "../../../models/team-model";
import {InviteServiceProvider} from "../../../providers/invite-service";

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
              public navParams: NavParams,
              public inviteService: InviteServiceProvider) {
    this.userData = this.navParams.data.userData;
    this.teamData = this.navParams.data.teamData;
    this.inviteRequests = this.navParams.data.inviteRequests;
  }

  ionViewDidLoad() {
    console.log(this.userData);
    console.log(this.teamData);
    console.log(this.inviteRequests);
  }

  acceptRequest(request: any) {
    this.inviteService.acceptRequest(request.uuid, this.teamData.uuid).subscribe((result: any) => {
      console.log(result);
      this.inviteService.deleteRequest(request.uuid).subscribe((result: any) => {
        let index = this.inviteRequests.indexOf(request);
        this.inviteRequests.splice(index, 1);
      }, (err: any) => {
        console.log(err);
      })
    }, (err: any) => {
      console.log(err);
    })
  }

}
