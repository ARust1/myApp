 import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
 import {AuthServiceProvider} from "../../providers/auth-service";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loading: any;
  lastPageLogin: boolean;
  regData = { email:'', password:'' };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {

    this.lastPageLogin = this.navCtrl.last().component == LoginPage;
  }

  doSignup() {
    this.showLoader();
    this.authService.register(this.regData).subscribe((result) => {
      this.loading.dismiss();
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    }, () => {
      localStorage.clear();
    });
  }

  goBack() {
    if(this.lastPageLogin) {
      this.navCtrl.popToRoot();
    } else {
      this.navCtrl.pop();
    }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Registriere...'
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
