import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {User} from "../../../models/user-model";
import {UserServiceProvider} from "../../../providers/user-service/user-service";
import {EventModalPage} from "../event-modal/event-modal";

/**
 * Generated class for the EventInviteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-invite-list',
  templateUrl: 'event-invite-list.html',
})
export class EventInviteListPage {

  private inviteList: User[];
  private team_id: string;
  private userList: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserServiceProvider,
              private viewCtrl: ViewController) {
    this.inviteList = this.navParams.data.inviteList;
    this.team_id = this.navParams.data.team_id;
  }

  ngOnInit() {
    this.getUserList();
  }


  getUserList() {
    this.userService.getUserByTeamId(this.team_id).subscribe((result: any) => {
      this.userList = result;
    }, (err: any) => {
      console.log(err);
    })
  }

  onInput($event): any {
    let val = $event.target.value;
    if(val && val !== undefined && val !== '') {
      this.userList = this.userList.filter(user => {
        return user.prename.toLowerCase().indexOf(val.toLowerCase()) !== -1
        || user.surname.toLowerCase().indexOf(val.toLowerCase()) !== -1;
      });
    } else {
      this.getUserList()
    }

  }

  onCancel($event) {
    this.getUserList();
  }

  addToInviteList(user) {
    let index = this.userList.indexOf(user);
    this.userList.splice(index, 1);
    this.inviteList.push(user);
  }

  saveInviteList() {
    console.log(this.inviteList);
    this.navCtrl.pop();
  }
}
