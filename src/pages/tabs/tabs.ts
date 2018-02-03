import { Component } from '@angular/core';
import {NavController, NavParams, App, Events, Platform} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { EventsPage } from '../events/events';
import { WalletPage } from '../wallet/wallet';
import { HomePage } from "../home/home";
import {PenaltiesPage} from "../penalties/penalties";
import {TeamPage} from "../team/team";
import {User} from "../../models/user-model";
import {Credentials} from "../../providers/credentials";
import {UserServiceProvider} from "../../providers/user-service";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { PushProvider } from '../../providers/push';
import { PushToken } from '../../models/push-token-model';
import { SetupAccountPage } from '../setup-account/setup-account';
import { IdUploadPage } from '../setup-account/id-upload/id-upload';
import { TeamSetupPage } from '../setup-account/team-setup/team-setup';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  private userData: User;
  tab1Root = WalletPage;
  tab2Root = EventsPage;
  tab3Root = PenaltiesPage;
  tab4Root = TeamPage;
  tab5Root = ProfilePage;

  eventsBadge: number = 0;
  valueforngif:boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public credentials: Credentials,
              public events: Events,
              private push: Push,
              public platform: Platform,
              public pushService: PushProvider) {

    this.userData = this.navParams.get('userData');
    if(!(localStorage.getItem('token'))) {
      this.navCtrl.setRoot(HomePage);
    }

    events.subscribe('event:cash', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.eventsBadge += 1;
    });

    this.handlePushNotifications();
  }

  ionViewWillEnter() {
    if(!this.userData) {
      this.getUserData();
    }
  }

  getUserData(): any {
    let userData: User = this.credentials.getUser();
      this.userService.getUserData(userData.email).subscribe((result: any) => {
        console.log(result + "getData");
        this.userData = result;
      }, (error: any) => {
        console.log(error);
      }, () => {
      });
  }

  handlePushNotifications() {
    let userData: User = this.credentials.getUser() || this.userData;
    if(!userData) {
      this.navCtrl.setRoot(HomePage);
    }
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        try {
          this.push.hasPermission()
          .then((res: any) => {
        
            if (res.isEnabled) {
              console.log('We have permission to send push notifications');

              // to initialize push notifications

              const options: PushOptions = {
                android: {
                  senderID: '1014521322964',
                  topics: ["team_"+this.userData.team_id]

                },
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false',
                    topics: ["team_"+this.userData.team_id]
                },
                windows: {},
                browser: {
                    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                }
              };

              const pushObject: PushObject = this.push.init(options);

              pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
             
              pushObject.on('registration').subscribe((registration: any) => {
                console.log('Device registered', registration)

                let pushTokenData: PushToken = new PushToken();
                pushTokenData.token = registration.registrationId;
                pushTokenData.user_id = userData.uuid || this.userData.uuid;
                pushTokenData.team_id = userData.team_id || this.userData.team_id;
                this.pushService.savePushToken(pushTokenData).subscribe(result => {
                  console.log("Token saved", result);
                }, err => {
                  console.error(err);
                })
              })

              pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


            } else {
              console.log('We do not have permission to send push notifications');
            }
        
          });
        } catch (e) {
          console.error(e);
        }
      }

    })
  }

}
