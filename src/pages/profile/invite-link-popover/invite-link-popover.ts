import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Team } from "../../../models/team-model";
import {Clipboard} from "@ionic-native/clipboard";

/**
 * Generated class for the InviteLinkPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite-link-popover',
  templateUrl: 'invite-link-popover.html',
})
export class InviteLinkPopoverPage {

  private teamData: Team;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private clipboard: Clipboard) {
    this.teamData = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteLinkPopoverPage');
  }

  copyTokenToClipboard() {
    this.clipboard.copy(this.teamData.invite_token);
  }
}
