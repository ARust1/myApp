import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../../../providers/user-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { User } from '../../../../models/user-model';

/**
 * Generated class for the ModalUserAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-user-add',
  templateUrl: 'modal-user-add.html',
})
export class ModalUserAddPage {

  private userList: User[];
  private team_id: string;
  private type: string = 'single';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private userService: UserServiceProvider) {
    this.team_id = this.navParams.get('team_id');
  }

  ngOnInit() {
    this.getUserList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalUserAddPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  saveUser(userData: User) {
    this.viewCtrl.dismiss({
      userData: userData
    });
  }

  getUserList() {
    this.userService.getUserByTeamId(this.team_id).subscribe((result: any) => {
      this.userList = result
    }, (err: any) => {
      console.log(err);
    }, () => {
      console.log(this.userList);
    })
  }

}
