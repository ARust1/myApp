import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { User } from "../../models/user-model";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {SetupAccountPage} from "../setup-account/setup-account";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /*
   * Class Variables
   */
  private userData: User;
  private loading: any;
  private loginData = { email:'', password:'' };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public userService: UserServiceProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData).subscribe((result: any) => {
      let token = result.token;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('loggedIn', "true");

      this.userService.getUserData(token).subscribe( (res: any) => {
        this.userData = res;



      }, (err) => {
        //this.loading.dismiss();
        this.presentToast(err);
      });
    }, (err) => {
      //this.loading.dismiss();
      this.presentToast(err);
    });
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authentifizieren...'
    });

    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
      if(!this.userData.team_id) {
        this.navCtrl.setRoot(SetupAccountPage, {
          user: this.userData
        });
      } else {
        this.navCtrl.setRoot(TabsPage, {
          user: this.userData
        });
      }

    }, 2000);
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
