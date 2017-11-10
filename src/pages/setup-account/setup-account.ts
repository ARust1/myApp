import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, ToastController} from 'ionic-angular';
import {TeamServiceProvider} from "../../providers/team-service/team-service";
import 'rxjs/add/operator/debounceTime';
import {Team} from "../../models/team-model";
import {User} from "../../models/user-model";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TabsPage} from "../tabs/tabs";
import {InviteServiceProvider} from "../../providers/invite-service/invite-service";

@IonicPage()
@Component({
  selector: 'page-setup-account',
  templateUrl: 'setup-account.html'
})
export class SetupAccountPage {

  @ViewChild(Slides) slides: Slides;
  private userData: User;
  private teamData: Team;
  private team_id: string;
  private invite_token: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              public inviteService: InviteServiceProvider) {

    this.userData = this.navParams.data.user;
    console.log(this.userData);
    this.teamData = new Team();
  }

  ionViewWillLoad() {

  }

  createTeam() {
    this.teamService.createTeam(this.userData.uuid, this.teamData.name).subscribe( (result: any) => {
      this.userData.team_id = result.uuid;
      this.userData.admin = true;
      this.userService.updateUser(this.userData).subscribe( (result:any) => {
        this.navCtrl.push(TabsPage, {
          user: this.userData
        })
      }, (err: any) => {
        this.presentToast("Oops. Da ist was schief gelaufen");
      })
    }, (error: any) => {
      this.presentToast("Oops. Da ist was schief gelaufen");
    })
  }

  sendTeamRequest() {
    this.teamService.getTeamByInviteToken(this.invite_token).subscribe((result: any) => {
      this.team_id = result.uuid;
      this.inviteService.sendRequest(this.team_id, this.userData.uuid).subscribe((result: any) => {
        console.log(result);
        this.presentToast("Anfrage wurde erfolgreich gesendet.");
        this.navCtrl.push(TabsPage, {
          user: this.userData
        })
      }, (error: any) => {
        console.log(error);
      })
    }, (error: any) => {
      console.log(error);
    }, () => {

    });

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
