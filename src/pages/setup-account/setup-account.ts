import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams, ToastController,
  ActionSheetController
} from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import {Team} from "../../models/team-model";
import {User} from "../../models/user-model";
import {TabsPage} from "../tabs/tabs";
import {TeamServiceProvider} from "../../providers/team-service";
import {UserServiceProvider} from "../../providers/user-service";
import {InviteServiceProvider} from "../../providers/invite-service";
import * as moment from "moment";
import {DatePicker} from "@ionic-native/date-picker";
import {PaymentProvider} from "../../providers/payment";
import {IdUploadPage} from "./id-upload/id-upload";
import { Address } from 'angular-google-place';
import {PictureProvider} from "../../providers/picture";
import {FeedbackProvider} from "../../providers/feedback";
import {Keyboard} from "@ionic-native/keyboard";

@IonicPage()
@Component({
  selector: 'page-setup-account',
  templateUrl: 'setup-account.html'
})
export class SetupAccountPage {

  private userData: User = new User();
  private stripeUpdateData: any;
  private teamData: Team;
  private team_id: string;
  private invite_token: string;
  private profileImg: any;
  birthday: any;
  private updateLoading: boolean = false;
  // public options = {type : 'address'};
  private googleAdress: Address;
  private base64Image: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              public paymentService: PaymentProvider,
              public inviteService: InviteServiceProvider,
              private actionSheetCtrl: ActionSheetController,
              private datePicker: DatePicker,
              private pictureService: PictureProvider,
              private feedbackService: FeedbackProvider,
              private keyboard: Keyboard) {
    this.userData = this.navParams.get('userData');
    this.teamData = new Team();
    this.userData.birthday = '26.12.1989';
  }

  ionViewWillLoad() {

  }

  getFormattedAddress(event: any) {
    this.googleAdress = event;
    console.log(event);
    this.userData.address_line = event.street + " " + event.street_number;
    this.userData.postal_code = event.postal_code;
    this.userData.city = event.city;
    this.userData.state = event.state;
    console.log(this.userData);
  }

  goToIdUpload() {
    this.updateLoading = true;
    let dateArr = this.userData.birthday.split('.');
    this.stripeUpdateData = {
      "first_name": this.userData.prename,
      "last_name": this.userData.surname,
      "day": dateArr[0],
      "month": dateArr[1],
      "year": dateArr[2],
      "city": this.userData.city,
      "country_code": this.userData.country,
      "line": this.userData.address_line,
      "postal_code": this.userData.postal_code,
      "state": this.userData.state
    };

    this.paymentService.updateStripeAccount(this.stripeUpdateData, this.userData.accountToken).subscribe((result: any) => {
    }, (err: any) => {
      console.log(err);
    }, () => {
      this.userService.updateUser(this.userData).subscribe((result: any) => {

      }, (err: any) => {

      }, () => {
        // save stripeData for later usage
        localStorage.setItem('stripeUpdateData', JSON.stringify(this.stripeUpdateData));
        // save img to firebase
        if(this.base64Image) {
          this.pictureService.saveImgToFirebaseStorage(this.userData, this.base64Image).then(result => {
            this.userService.saveProfileImg(this.userData.uuid, result.downloadURL).subscribe(result => {
            }, (err: any) => {
              console.log(err);
            })
          }, (err: any) => {
            this.feedbackService.presentToast(err, 1500, 'middle');
          });
        }
        this.navCtrl.setRoot(IdUploadPage, {
          userData: this.userData
        })
      })
    })

  }

  openKeyboard() {
    this.keyboard.show();
  }

  openDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
    }).then(
      date => this.userData.birthday = moment(date).format('L'),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  goToPictureSelect() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Profilbild',
        buttons: [
          {
            text: 'Bild aufnehmen',
            handler: () => {
              this.takePicture();
            }
          },
          {
            text: 'Aus Gallerie auswählen',
            handler: () => {
              this.getPictures();
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

  getPictures() {
    this.pictureService.getPictures().then(result => {
      this.base64Image = result.base64Image;
      this.profileImg = result.profileImg;
    }, (err: any) => {
      console.log(err);
    });
  }

  takePicture() {
    this.pictureService.takePicture().then(result => {
      this.base64Image = result.base64Image;
      this.profileImg = result.profileImg;
    }, (err: any) => {
      console.log(err);
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
