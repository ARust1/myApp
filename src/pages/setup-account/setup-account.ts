import {Component, ViewChild} from '@angular/core';
import {
  IonicPage, NavController, NavParams, Slides, ToastController, PopoverController,
  ActionSheetController
} from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import {Team} from "../../models/team-model";
import {User} from "../../models/user-model";
import {TabsPage} from "../tabs/tabs";
import {TeamServiceProvider} from "../../providers/team-service";
import {UserServiceProvider} from "../../providers/user-service";
import {InviteServiceProvider} from "../../providers/invite-service";
import {Camera, CameraOptions} from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';
import {FIREBASE_CONF} from "../../app/app.firebase.config";
import * as moment from "moment";
import {DomSanitizer} from "@angular/platform-browser";
import {DatePicker} from "@ionic-native/date-picker";
import {PaymentProvider} from "../../providers/payment";
import {IdUploadPage} from "./id-upload/id-upload";
import { Address } from 'angular-google-place';

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
  address: any;

  constructor(private camera: Camera,
              public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public teamService: TeamServiceProvider,
              public userService: UserServiceProvider,
              public paymentService: PaymentProvider,
              public inviteService: InviteServiceProvider,
              private actionSheetCtrl: ActionSheetController,
              private sanitizer: DomSanitizer,
              private datePicker: DatePicker) {

    initializeApp(FIREBASE_CONF);
    this.userData = this.navParams.get('userData');
    this.teamData = new Team();
    moment.locale("de");

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
        this.navCtrl.push(IdUploadPage, {
          userData: this.userData
        })
      })
    })

  }

  openDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
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


  async getPictures() {
    let date = moment(new Date());
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 400,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE
      };

      const result = await this.camera.getPicture(options);
      const image: any = `data:image/png;base64,${result}`;
      this.profileImg = this.sanitizer.bypassSecurityTrustResourceUrl(image);
      /*const pictures = storage().ref(this.userData.email + '_' + date);
      pictures.putString(image, 'data_url');*/


    } catch (e) {
      console.log(e);
    }

  }

  async takePicture() {
    let date = moment(new Date());
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 400,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      const result = await this.camera.getPicture(options);
      const image: any = `data:image/png;base64,${result}`;
      this.profileImg = this.sanitizer.bypassSecurityTrustResourceUrl(image);
      const pictures = storage().ref(this.userData.email + '_' + date);
       pictures.putString(image, 'data_url');


    } catch (e) {
      console.log(e);
    }

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
