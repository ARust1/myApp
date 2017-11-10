import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {User} from "../../../models/user-model";
import {UserServiceProvider} from "../../../providers/user-service/user-service";

/**
 * Generated class for the ProfileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {

  private userData : User;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public userService: UserServiceProvider) {
    this.userData = this.navParams.get('data');
  }

  dismiss() {
    this.viewCtrl.dismiss(this.userData);
  }

  updateUser() {
    this.userService.updateUser(this.userData).subscribe( (result) => {
      this.dismiss();
    }, (err) => {
      this.presentToast(err);
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
