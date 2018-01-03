import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Popover, PopoverController} from 'ionic-angular';
import {User} from "../../../../models/user-model";
import {UserServiceProvider} from "../../../../providers/user-service";
import * as _ from 'lodash';
import {SearchProvider} from "../../../../providers/search";
import {TransferPopoverPage} from "./transfer-popover/transfer-popover";

/**
 * Generated class for the TransferCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-create',
  templateUrl: 'transfer-create.html',
})
export class TransferCreatePage {

  searchEnabled: boolean = false;
  private userData: User;
  private teamUser: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserServiceProvider,
              private searchProvider: SearchProvider,
              private popoverCtrl: PopoverController) {
    this.userData = this.navParams.get('userData');
    this.searchProvider.setUserList(this.teamUser);
  }

  ngOnInit() {
    this.getTeamMember(this.userData.team_id);
  }

  ionViewDidLoad() {
  }

  getTeamMember(teamId: string) {
    this.userService.getUserByTeamId(teamId).subscribe((result: any) => {
     result = result.filter(item => {
        return item.uuid !== this.userData.uuid;
      });
      this.teamUser = result;
    }, (err: any) => {
      console.log(err);
    }, () => {
      console.log(this.teamUser);

    })
  }

  filterItems($event): any {
    let val = $event.target.value;
    if(val && val !== undefined && val !== '') {
      this.teamUser = this.teamUser.filter(user => {
        return user.prename.toLowerCase().indexOf(val.toLowerCase()) != -1
          ||  user.surname.toLowerCase().indexOf(val.toLowerCase()) != -1;
      });
    } else {
      this.getTeamMember(this.userData.team_id);
    }

  }

  openTransferPopover(user) {
    this.navCtrl.push(TransferPopoverPage, {
      destinationData: user
    });
  }
}
