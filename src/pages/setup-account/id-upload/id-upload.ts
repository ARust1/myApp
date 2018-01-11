import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../../models/user-model";
import {Credentials} from "../../../providers/credentials";
import {HomePage} from "../../home/home";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {PaymentProvider} from "../../../providers/payment";
import {TeamSetupPage} from "../team-setup/team-setup";
import {UserServiceProvider} from "../../../providers/user-service";

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
              private paymentService: PaymentProvider,
              private userService: UserServiceProvider) {
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
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let file_id;

        this.paymentService.uploadIdDocument(imageData, this.userData.accountToken).subscribe((result: any) => {
          file_id = result;
          console.log("FILE ID " + JSON.stringify(file_id));
        }, (err: any) => {
          console.log(err);
        }, () => {
          this.userService.saveFileId(this.userData.uuid, file_id).subscribe((result: any) => {
            localStorage.setItem('idUpload', 'done');
            localStorage.setItem('file_id', file_id);
            this.navCtrl.setRoot(TeamSetupPage, {
              userData: this.userData
            })
          }, (err: any) => {
            console.log(err);
          });

        })
      }, (err) => {
        console.log(err);
      });


    } catch (e) {
      console.log(e);
    }

  }
}
