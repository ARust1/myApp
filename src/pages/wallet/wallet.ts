import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  loading: any;
  isLoggedIn: boolean = false;

  constructor(public navCtrl: NavController,
              public app: App,
              public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

    if(window.localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  logout() {
  this.logoutConfirm();
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
            this.showLoader();
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
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
