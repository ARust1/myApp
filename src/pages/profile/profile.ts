import {Component, Input} from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";
import { User } from "../../models/user-model";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  loading: any;
  isLoggedIn: boolean = false;
  userData: User = this.navParams.data;

  constructor(public navCtrl: NavController,
              public app: App,
              public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public navParams: NavParams) {

    if(window.localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.authService.logout().then((result) => {
    }, (err) => {
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  logoutConfirm() {
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Wollen Sie sich wirklich abmelden?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Abmelden',
          handler: () => {
              this.logout();
              this.showLoader();
              this.app.getRootNav().setRoot(HomePage);
              this.loading.dismiss();
          }
        }
      ]
    });
    alert.present();
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
