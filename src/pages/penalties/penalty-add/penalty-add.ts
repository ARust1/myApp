import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../models/user-model';
import { PenaltyProvider } from '../../../providers/penalty';
import { Subscription } from 'rxjs/Subscription';
import { Penalty } from '../../../models/penalty-model';
import { ModalUserAddPage } from './modal-user-add/modal-user-add';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { FeedbackProvider } from '../../../providers/feedback';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Events } from 'ionic-angular/util/events';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private penaltyService: PenaltyProvider,
              private modalCtrl: ModalController,
              private feedbackService: FeedbackProvider,
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
      this.penaltyData.user_id = data.userData.uuid;
      this.userName = data.userData.prename + " " + data.userData.surname;
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
           this.events.publish('penalty:created', this.penaltyData);
           this.navCtrl.pop();
        })
      } else {
        this.feedbackService.presentAlert("Falsche Eingabe", "Alle Felder müssen ausgefüllt werden");
      }
  }
}
