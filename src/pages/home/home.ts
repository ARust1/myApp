import { Component } from '@angular/core';
import {App, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  isLoggedIn: boolean = false;

  constructor(public navCtrl: NavController,
              public app: App,
              public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {

    if(window.localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.showLoader();
    this.loading.dismiss();
    this.navCtrl.setRoot(LoginPage);
    this.authService.logout().then((result) => {
      this.navCtrl.setRoot(LoginPage);
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
