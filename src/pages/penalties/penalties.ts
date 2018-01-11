import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PenaltyAddPage } from './penalty-add/penalty-add';
import { User } from '../../models/user-model';
import { PenaltyProvider } from '../../providers/penalty';
import { Penalty } from '../../models/penalty-model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Events } from 'ionic-angular/util/events';

@IonicPage()
@Component({
  selector: 'page-penalties',
  templateUrl: 'penalties.html',
})
export class PenaltiesPage {

  private userData: User;
  private penaltyList: Penalty[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private penaltyService: PenaltyProvider,
              public events: Events) {
    this.userData = this.navParams.data;
  }

  ngOnInit() {
    this.getPenaltiesByTeam();
  }

  ionViewWillEnter() {
    this.events.subscribe('penalty:created', (penaltyData: Penalty) => {
      this.penaltyList.push(penaltyData);
    })
  }

  goToAddPenalty() {
    this.navCtrl.push(PenaltyAddPage, {
      userData: this.userData
    })
  }

  getPenaltiesByTeam() {
    this.penaltyService.getPenaltiesByTeam(this.userData.team_id).subscribe(result => {
      this.penaltyList = result;
    }, err => {
      console.log(err);
    })
  }
}
