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
import {BehaviorSubject} from "rxjs";

class stripeUpdateData {
  public first_name: string;
  public last_name: string;
  public day: string;
  public month: string;
  public year: string;
  public city: string;
  public line: string;
  public postal_code: string;
  public state: string;
  public file_id: string;
}

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
  private invite_token: string;
  private userSupscription: BehaviorSubject<User>;
  private stripeUpdateData: stripeUpdateData;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private teamService: TeamServiceProvider,
              private userService: UserServiceProvider,
              private pictureService: PictureProvider,
              private paymentService: PaymentProvider,
              private credentials: Credentials) {
    this.userData = this.navParams.get("userData");
    this.userSupscription = new BehaviorSubject(this.userData);
    if(!this.userData) {
      this.credentials.getUser().then(result => {
        this.userData = result;
        this.userSupscription = new BehaviorSubject(this.userData);
      }, err => {
        this.navCtrl.setRoot(HomePage);
      })
    }
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
      console.log(stripeToken);
    }, (err: any) => {
      console.log(err.toString());
    }, () => {
      let stripeData = localStorage.getItem('stripeUpdateData');
      this.stripeUpdateData = JSON.parse(stripeData);
      let file_id = localStorage.getItem('file_id');
      if(file_id) {
        this.stripeUpdateData.file_id = file_id;
      }
      if(stripeData) {
        console.log(JSON.stringify(this.stripeUpdateData));
        this.paymentService.updateStripeAccount(this.stripeUpdateData, stripeToken).subscribe((result: any) => {
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

  setTeam() {
    this.loading = true;
    let team_id;
    this.teamService.getTeamByInviteToken(this.invite_token).subscribe(result => {
      console.log(result);
      team_id = result.uuid;
      this.userService.setTeam(this.userData.uuid, result.uuid).subscribe(result => {
        this.userData.team_id = team_id;
        this.navCtrl.push(TabsPage, {
          userData: this.userData
        })
      }, (err: any) => {
        console.log(err);
      })
    }, (err: any) => {
      console.log("Kein Team gefunden")
    })
  }

}
