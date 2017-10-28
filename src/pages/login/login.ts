import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { User } from "../../models/user-model";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /*
   * Class Variables
   */
  private userData: User = new User();
  private loading: any;
  private loginData = { email:'', password:'' };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService: AuthServiceProvider, public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData).then((result:any) => {
      this.loading.dismiss();

      this.setLocalStorageItems(result.token,
        this.loginData.email,
        this.loginData.password);

      this.setUserData(result);

      this.navCtrl.setRoot(TabsPage, {
        user: this.userData
      });
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  setLocalStorageItems(token, email, password) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('email', email);
    window.localStorage.setItem('password', password);
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  setUserData(result) {
    this.userData.setUuid(result.data.uuid);
    this.userData.setPrename(result.data.prename);
    this.userData.setSurname(result.data.surname);
    this.userData.setEmail(result.data.email);
    this.userData.setPassword(result.data.password);
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
