import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {User} from "../../../models/user-model";
import {UserServiceProvider} from "../../../providers/user-service";
import { PictureProvider } from '../../../providers/picture';

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
              public userService: UserServiceProvider,
              private pictureService: PictureProvider) {
    this.userData = this.navParams.get('userData');
    console.log("profile edit", this.userData);
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

  setProfileImg() {
    this.pictureService.getPictures().then(result => {
      if(result) {
        this.userData.profile.profileImg = result.profileImg;
      }
      this.pictureService.saveImgToFirebaseStorage(this.userData, result.base64Image).then(result => {
        this.userService.saveProfileImg(this.userData.uuid, result.downloadURL).subscribe(result => {
        }, (err: any) => {
          console.log("ERR");
          console.log(err.toString());
        })
      }, (err: any) => {
        console.log(err);
      });
    }, (err: any) => {
      console.log(err);
    });
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
