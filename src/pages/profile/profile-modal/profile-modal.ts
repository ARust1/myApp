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

  public userData : User = this.navParams.get('data');
  public newUserData = {
    email : this.userData.email,
    surname : this.userData.surname,
    prename : this.userData.prename
  };

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public userService: UserServiceProvider) {
  }

  dismiss() {
    this.viewCtrl.dismiss(this.userData);
  }

  updateUser() {
    this.userData.setEmail(this.newUserData.email);
    this.userData.setPrename(this.newUserData.prename);
    this.userData.setSurname(this.newUserData.surname);
    this.userService.updateUser(this.userData).then( (result) => {
      this.dismiss()
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
