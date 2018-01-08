import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CameraOptions, Camera} from "@ionic-native/camera";
import * as moment from 'moment';
import {DomSanitizer} from "@angular/platform-browser";
import { storage } from 'firebase';
import {User} from "../models/user-model";

/*
  Generated class for the PictureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PictureProvider {

  private base64Image: any;
  private profileImg: any;

  constructor(public http: Http,
              private camera: Camera,
              private sanitizer: DomSanitizer,) {
    moment.locale("de");
  }

  async getPictures() {
    let result: any;
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      const result = await this.camera.getPicture(options);
      this.base64Image = `data:image/jpeg;base64,${result}`;
      this.profileImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);


    } catch (e) {
      console.log(e);
    } finally {
      result = {
        base64Image: this.base64Image,
        profileImg: this.profileImg
      };

    }
    return result;

  }

  async takePicture() {
    let result: any;
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      const result = await this.camera.getPicture(options);
      this.base64Image = `data:image/jpeg;base64,${result}`;
      this.profileImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);


    } catch (e) {
      console.log(e);
    } finally {
      result = {
        base64Image: this.base64Image,
        profileImg: this.profileImg
      };

    }
    return result;
  }

  saveImgToFirebaseStorage(userData: User, base64img: any) {
    let date = moment(new Date());
    const pictures = storage().ref(userData.email + '_' + date);
    console.log(pictures.toString());
    return pictures.putString(base64img, 'data_url');
  }
}
