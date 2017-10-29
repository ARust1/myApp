import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { User } from "../../models/user-model";
import {UserServiceProvider} from "../../providers/user-service/user-service";

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
  private token: string;
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
    this.authService.login(this.loginData).subscribe((result:any) => {
      this.loading.dismiss();

      let res = JSON.parse(result._body);
      this.token = res.token;
      window.localStorage.setItem('token', this.token);
      this.userService.getUserData(this.token).subscribe( (res: any) => {
        let data = JSON.parse(res._body)[0];
        this.userData = data;
        this.navCtrl.setRoot(TabsPage, {
          user: this.userData
        });
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  setUserData(data) {
    this.userData = data;
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  goBack() {
    this.navCtrl.pop();
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
