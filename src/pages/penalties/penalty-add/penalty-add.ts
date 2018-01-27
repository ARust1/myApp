import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../models/user-model';
import { PenaltyProvider } from '../../../providers/penalty';
import { Penalty } from '../../../models/penalty-model';
import { ModalUserAddPage } from './modal-user-add/modal-user-add';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { FeedbackProvider } from '../../../providers/feedback';
import { Events } from 'ionic-angular/util/events';
import {UserServiceProvider} from "../../../providers/user-service";
import { PushProvider } from '../../../providers/push';

@IonicPage()
@Component({
  selector: 'page-penalty-add',
  templateUrl: 'penalty-add.html',
})
export class PenaltyAddPage {

  private userData: User;
  private type = 'predefined';
  predefinedPenalties: string[];
  penaltyData: Penalty;
  userName: string;
  penaltyUser: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private penaltyService: PenaltyProvider,
              private modalCtrl: ModalController,
              private feedbackService: FeedbackProvider,
              private userService: UserServiceProvider,
              private pushService: PushProvider,
              public events: Events) {
    this.userData = this.navParams.get('userData');
    this.penaltyData = new Penalty();
    this.penaltyData.team_id = this.userData.team_id;
    console.log(this.type);
  }

  ngOnInit() {
    this.getPredefinedPenalties();
  }

  getPredefinedPenalties() {
    this.penaltyService.getPreDefinedPenalties().then(result => {
      this.predefinedPenalties = result;
      console.log(result);
    })
  }

  onSegmentChange() {
    this.penaltyData.name = "";
  }

  openUserAddModal() {
    let userAddModal = this.modalCtrl.create(ModalUserAddPage, {
      team_id: this.userData.team_id
    });
    userAddModal.onDidDismiss(data => {
      console.log(data);
      if(data) {
        this.penaltyData.user_id = data.userData.uuid;
        this.penaltyUser = data.userData;
        this.userName = data.userData.prename + " " + data.userData.surname;
      }
    });
    userAddModal.present();
  }

  addPenalty() {
    console.log(this.penaltyData);
    if(this.penaltyData.amount != null && this.penaltyData.amount > 0
      && this.penaltyData.name != ''
      && this.penaltyData.user_id != '') {
        this.penaltyService.addPenalty(this.penaltyData).subscribe(result => {
          console.log(result);
        }, err => {
          console.log(err);
        }, () => {
          let penaltyData: any;
          this.userService.getUserById(this.penaltyData.user_id).subscribe(result => {
            penaltyData = {
              uuid: this.penaltyData.uuid,
              name: this.penaltyData.name,
              team_id: this.penaltyData.team_id,
              amount: this.penaltyData.amount,
              paid: 0,
              paymentMethod: 0,
              user : result
            };
          }, err => {
            console.log(err);
          }, () => {
            this.sendPush();
            this.events.publish('penalty:created', penaltyData);
            console.log(this.events);
            this.navCtrl.pop();
          });

        })
      } else {
        this.feedbackService.presentAlert("Falsche Eingabe", "Alle Felder müssen ausgefüllt werden");
      }
  }

  sendPush() {
    let message: string = this.penaltyData.name;
    let tokenArr: Array<any>;
    this.pushService.getPushTokenByUser(this.penaltyUser.uuid).subscribe(token => {
      console.log("token", token);
      tokenArr = token;
    }, err => {
      console.error(err);
    }, () => {
      console.log("tokenArr", tokenArr);
      this.pushService.sendPush(tokenArr, message).subscribe(result => {
        console.log(result);
      }, err => {
        console.error(err);
      })
    })
  }
}
