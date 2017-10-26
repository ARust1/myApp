import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {

  constructor(public navCtrl: NavController,
              public app: App,
              public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {


  }
}
