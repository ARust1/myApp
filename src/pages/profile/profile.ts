import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController, App, LoadingController, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import  { HomePage } from "../home/home";
import { User } from "../../models/user-model";
import {ProfileModalPage} from "./profile-modal/profile-modal";
import {TeamServiceProvider} from "../../providers/team-service/team-service";
import {Team} from "../../models/team-model";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private loading: any;
  private isLoggedIn: boolean = false;
  private userData: User;
  private teamData: Team;
  private clicked: boolean = false;

  constructor(public app: App,
              public authService: AuthServiceProvider,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController) {

    if(window.localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    this.userData = this.navParams.data;

    if(!this.userData.team_id) {
      this.teamData = new Team();
    } else {
      this.getTeamData();
    }
  }

  toggleClick() {
    this.clicked = !this.clicked;
  }

  getTeamData(): any {
    this.teamService.getTeamById(this.userData.team_id).subscribe( (result: any) => {
      this.teamData = result;
    }, (err: any) => {
      this.presentToast("Oops. Da ist was schief gelaufen");
    });
  }

  createTeam() {
    this.teamService.createTeam(this.userData.uuid, this.teamData.name).subscribe( (result: any) => {
      this.userData.team_id = result.uuid;
      this.userData.admin = true;
      this.userService.updateUser(this.userData).subscribe( (result:any) => {
      }, (err: any) => {
        this.presentToast("Oops. Da ist was schief gelaufen");
      })
    }, (error: any) => {
      this.presentToast("Oops. Da ist was schief gelaufen");
    })
  }

  logout() {
    this.authService.logout().then((result) => {
    }, (err) => {
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Ausloggen...'
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

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Profil bearbeiten',
          handler: () => {
            //this.presentProfileModal();
            this.goToEditProfile();
          }
        },
        {
          text: 'Abmelden',
          handler: () => {
            this.logoutConfirm();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  goToEditProfile() {
    this.navCtrl.push(ProfileModalPage, {
      data : this.userData
    });
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(ProfileModalPage, {
      data : this.userData
    });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
