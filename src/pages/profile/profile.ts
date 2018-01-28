import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController, App, LoadingController, ModalController, NavController, NavParams,
  PopoverController,
  ToastController, ViewController
} from 'ionic-angular';
import  { HomePage } from "../home/home";
import { User } from "../../models/user-model";
import {ProfileModalPage} from "./profile-modal/profile-modal";
import {Team} from "../../models/team-model";
import {InviteLinkPopoverPage} from "./invite-link-popover/invite-link-popover";
import {AuthServiceProvider} from "../../providers/auth-service";
import {UserServiceProvider} from "../../providers/user-service";
import {TeamServiceProvider} from "../../providers/team-service";
import {BalancePage} from "./balance/balance";
import {PaymentProvider} from "../../providers/payment";
import {Credentials} from "../../providers/credentials";
import {BankaccountAddPage} from "./balance/bankaccount-add/bankaccount-add";
import { PictureProvider } from '../../providers/picture';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private loading: any;
  private userData: User;
  private teamData: Team;
  private inviteRequests: User[];
  private clicked: boolean = false;
  private availableBalance = 0;
  private pendingBalance = 0;
  private balanceLoaded: boolean = false;

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
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              private credentials: Credentials,
              private paymentService: PaymentProvider) {
    this.userData = this.navParams.data;
    console.log(this.userData);
  }

  ngOnInit() {
    this.getTeamData();
    this.getStripeAccountBalance();
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

  getStripeAccountBalance() {
    let balanceDetails;
    this.paymentService.getStripeAccountBalance(this.userData.accountToken).subscribe((result: any) => {
      balanceDetails = result;
    }, (err: any) => {
      console.log(err);
    }, () => {
      if(balanceDetails && balanceDetails.available && balanceDetails.pending) {
        this.availableBalance = balanceDetails.available[0].amount;
        this.pendingBalance = balanceDetails.pending[0].amount;
      }
      this.balanceLoaded = true;
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

  getInviteToken() {
    this.teamService.getInviteToken(this.teamData.uuid).subscribe((result: any) => {
      this.teamData.invite_token = result;
    }, (err: any) => {
      console.log(err);
    })
  }

  logout() {
    this.authService.logout().subscribe((result) => {
      this.credentials.removeKey('userData');
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
              this.credentials.removeKey('token');
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

  presentActionSheet($event) {
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
      userData : this.userData
    });
  }

  goToBalance() {
    this.navCtrl.push(BalancePage, {
      userData: this.userData,
      availableBalance: this.availableBalance,
      pendingBalance: this.pendingBalance
    });
  }

  presentInvitePopover($event) {
    this.getInviteToken();
    let popover = this.popoverCtrl.create(InviteLinkPopoverPage, this.teamData);
    popover.present({
      ev: $event
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
