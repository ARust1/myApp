import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { User } from "../../models/user-model";
import {SetupAccountPage} from "../setup-account/setup-account";
import {Credentials} from "../../providers/credentials";
import {AuthServiceProvider} from "../../providers/auth-service";
import {UserServiceProvider} from "../../providers/user-service";
import {HomePage} from "../home/home";
import {IdUploadPage} from "../setup-account/id-upload/id-upload";
import {TeamSetupPage} from "../setup-account/team-setup/team-setup";

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

      this.userService.getUserData(this.loginData.email).subscribe( (res: any) => {
        this.userData = res;
        console.log(res);
      }, (err) => {
        console.log(err);
      }, () => {
        //this.loading.dismiss();
        this.credentials.saveUserToStorage(this.userData);
        if(this.credentials.getUser()) {
          this.checkAccountSetup();
        }
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

  checkToken() {
    let token = this.credentials.getToken();
    if (token) {
      this.navCtrl.setRoot(TabsPage, {
        userData: this.userData
      });
    }
  }

  checkAccountSetup() {
    let userData: User = this.credentials.getUser();
    let idUploaded: string = localStorage.getItem('idUpload');
    console.log(idUploaded);
    if(userData) {
      if(userData.team_id) {
        this.navCtrl.setRoot(TabsPage, {
          userData: this.userData
        });
      } else {
        if (!userData.prename && !userData.surname) {
          console.log("1");
          this.navCtrl.setRoot(SetupAccountPage, {
            userData: this.userData
          });
        } else if (userData.prename && userData.surname && userData.birthday && !idUploaded) {
          console.log("2");
          this.navCtrl.setRoot(IdUploadPage, {
            userData: this.userData
          });
        } else if (idUploaded === 'done' || idUploaded === 'skipped' || this.userData.profile.file) {
          console.log("3");
          this.navCtrl.setRoot(TeamSetupPage, {
            userData: this.userData
          });
        } else if (userData.prename && userData.surname && userData.birthday && userData.profile.file === null && userData.team_id === null) {
          console.log("4");
          this.navCtrl.setRoot(TeamSetupPage, {
            userData: this.userData
          });
        } else {
          console.log("else");
          this.checkToken()
        }
      }

    } else {
      this.navCtrl.setRoot(HomePage);
    }

  }

}
