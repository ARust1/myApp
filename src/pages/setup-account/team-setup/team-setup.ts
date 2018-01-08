import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TeamServiceProvider} from "../../../providers/team-service";
import {TabsPage} from "../../tabs/tabs";
import {User} from "../../../models/user-model";
import {Team} from "../../../models/team-model";
import {UserServiceProvider} from "../../../providers/user-service";
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {PictureProvider} from "../../../providers/picture";
import {PaymentProvider} from "../../../providers/payment";
import {Credentials} from "../../../providers/credentials";
import {HomePage} from "../../home/home";

/**
 * Generated class for the TeamSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-setup',
  templateUrl: 'team-setup.html',
})
export class TeamSetupPage {
  @ViewChild(Slides) slides: Slides;

  private userData: User;
  private teamData: Team = new Team();
  currentSlide: number = 0;
  private base64Image: any;
  private teamLogo: any;
  private loading: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private teamService: TeamServiceProvider,
              private userService: UserServiceProvider,
              private pictureService: PictureProvider,
              private paymentService: PaymentProvider,
              private credentials: Credentials) {
    this.userData = this.navParams.get("userData");
    if(!this.userData) {
      this.credentials.getUser().then(result => {
        this.userData = result;
      }, err => {
        this.navCtrl.setRoot(HomePage);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamSetupPage');
  }

  slideChanged() {
    this.currentSlide = this.slides.getActiveIndex();
  }

  getPictures() {
    this.pictureService.getPictures().then(result => {
      this.base64Image = result.base64Image;
      this.teamData.team_logo = result.profileImg;
    }, (err: any) => {
      console.log(err);
    })
  }

  createTeam() {
    this.loading = true;
    let stripeToken: string;
    this.teamService.createTeam(this.userData.uuid, this.teamData.name).subscribe( (result: any) => {
      this.userData.team_id = result.team_id;
      this.userData.admin = true;
      stripeToken = result.stripeToken;
    }, (err: any) => {
      console.log(err.toString());
    }, () => {
      let stripeUpdateData = localStorage.getItem('stripeUpdateData');
      if(stripeUpdateData) {
        this.paymentService.updateStripeAccount(JSON.parse(stripeUpdateData), stripeToken).subscribe((result: any) => {
        },(err: any) => {
          console.log("stripeUpdate " + err.toString());
        }, () => {
          if(this.base64Image) {
            this.pictureService.saveImgToFirebaseStorage(this.userData, this.base64Image).then(result => {
              console.log(result.downloadURL);
              this.teamService.saveProfileImg(this.teamData.uuid, result.downloadURL).subscribe(result => {
              }, (err: any) => {
                console.log("ERR");
                console.log(err.toString());
              })
            }, (err: any) => {
              console.log(err);
            });
          }
          this.userService.updateUser(this.userData).subscribe( (result:any) => {
            this.navCtrl.push(TabsPage, {
              userData: this.userData
            })
          }, (err: any) => {
            console.log(err.toString());
          })
        })
      }
    })
  }


}
