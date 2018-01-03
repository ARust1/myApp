import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, AlertController} from "ionic-angular";

/*
  Generated class for the FeedbackProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedbackProvider {

  constructor(public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
  }

  public presentToast(msg, duration, position) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: position,
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  public presentConfirmAlert(buttons: any[], title: string, message: string) {

    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });
    alert.present();
  }
}
