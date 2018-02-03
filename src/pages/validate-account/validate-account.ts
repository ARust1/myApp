import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user-model';
import { Credentials } from '../../providers/credentials';
import { AuthServiceProvider } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { SetupAccountPage } from '../setup-account/setup-account';
import { IdUploadPage } from '../setup-account/id-upload/id-upload';
import { TeamSetupPage } from '../setup-account/team-setup/team-setup';

/**
 * Generated class for the ValidateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-validate-account',
  templateUrl: 'validate-account.html',
})
export class ValidateAccountPage {

  private validationCode: number;
  private userData: User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private credentials: Credentials,
              private authService: AuthServiceProvider) {

    this.userData = this.navParams.get('userData');
    console.log(this.userData);
    
  }

  ngOnInit() {
    this.sendValidation();
  }

  sendValidation() {
    this.authService.sendValidation(this.userData.uuid, this.userData.email).subscribe(result => {
    }, err => {
      console.error(err);
    })
  }

  checkValidation() {
    let validationCode = 0;
    this.authService.getValidationCode(this.userData.uuid).subscribe(result => {
      validationCode = result.validation_code;
    }, err => {
      console.error(err);
    }, () => {
      console.log(validationCode);
      console.log(this.validationCode);
      if(this.validationCode == validationCode) {
        console.log("validate");
        this.authService.validate(this.userData.uuid).subscribe(result => {
        }, err => {
          console.error(err);
        }, () => {
          this.checkAccountSetup();
        })
      }
    })
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

  checkToken() {
    let token = this.credentials.getToken();
    if (token) {
      this.navCtrl.setRoot(TabsPage, {
        userData: this.userData
      });
    }
  }
}
