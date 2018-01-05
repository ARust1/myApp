import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../../models/user-model";
import {Credentials} from "../../../providers/credentials";
import {HomePage} from "../../home/home";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {PaymentProvider} from "../../../providers/payment";
import {TeamSetupPage} from "../team-setup/team-setup";

@IonicPage()
@Component({
  selector: 'page-id-upload',
  templateUrl: 'id-upload.html',
})
export class IdUploadPage {

  private userData: User;
  private result: any;
  constructor(private camera: Camera,
              public navCtrl: NavController,
              public navParams: NavParams,
              private credentials: Credentials,
              private paymentService: PaymentProvider) {
    this.userData = this.navParams.get('userData');
    if(!this.userData) {
      this.userData = this.credentials.getUser();
      if(!this.userData) {
          this.navCtrl.setRoot(HomePage);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdUploadPage');
    console.log(this.userData);
  }

  skipIdUpload() {
    localStorage.setItem('idUpload', 'skipped');
    this.navCtrl.setRoot(TeamSetupPage, {
      userData: this.userData
    })
  }

  async takePicture() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 400,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.paymentService.uploadIdDocument(imageData, this.userData.accountToken).subscribe((result: any) => {
          this.result = result;
        }, (err: any) => {
          console.log(err);
        }, () => {
          localStorage.setItem('idUpload', 'done');
          this.navCtrl.setRoot(TeamSetupPage, {
            userData: this.userData
          })
        })
      }, (err) => {
        // Handle error
      });


    } catch (e) {
      console.log(e);
    }

  }
}
