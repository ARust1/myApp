import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { User } from "../../models/user-model";
import {SetupAccountPage} from "../setup-account/setup-account";
import {Credentials} from "../../providers/credentials";
import {AuthServiceProvider} from "../../providers/auth-service";
import {UserServiceProvider} from "../../providers/user-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private userData: User;
  private loading: any;
  private loginData = { email:'', password:'' };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public userService: UserServiceProvider,
              public loadingCtrl: LoadingController,
              private credentials: Credentials) {
  }

  doLogin() {
    //this.showLoader();
    this.authService.login(this.loginData).subscribe((data: any) => {
      let token = data.token;
      this.credentials.saveTokenToStorage(token);

      this.userService.getUserData(token).subscribe( (res: any) => {
        this.userData = res;


      }, (err) => {
        console.log(err);
      }, () => {
        //this.loading.dismiss();
        this.goToApp();
      });
    }, (err) => {
      console.log(err);
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
  }

  goToApp() {
    if(!this.userData.team_id) {
      this.navCtrl.setRoot(SetupAccountPage);
    } else {
      this.navCtrl.setRoot(TabsPage, this.userData);
    }
  }

}
