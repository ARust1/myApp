import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {TeamServiceProvider} from "../../providers/team-service/team-service";
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-setup-account',
  templateUrl: 'setup-account.html'
})
export class SetupAccountPage {

  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public teamService: TeamServiceProvider) {

  }

  ionViewWillLoad() {


  }

}
