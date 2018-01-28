 import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
 import {AuthServiceProvider} from "../../providers/auth-service";
import { Sim } from '@ionic-native/sim';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FeedbackProvider } from '../../providers/feedback';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loading: any;
  lastPageLogin: boolean;
  regData = { email:'', password:'' };
  private registerForm : FormGroup;
  private invalid: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public feedbackService: FeedbackProvider,
              public authService: AuthServiceProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private sim: Sim,
              private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.lastPageLogin = this.navCtrl.last().component == LoginPage;
  }

  doSignup() {
    this.invalid = true;
    if(this.registerForm.valid) {
      this.showLoader();
      this.authService.register(this.registerForm.value).subscribe((result) => {
        this.loading.dismiss();
        this.navCtrl.pop();
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      }, () => {
        localStorage.clear();
        //this.handleSimInfo();
      });
    } else {
      this.feedbackService.presentAlert("Ungültige Eingaben", "Bitte überprüfen Sie ihre Eingaben.")
    }
    
  }

  handleSimInfo() {
    this.sim.getSimInfo().then(
      (info) => console.log('Sim info: ', info),
      (err) => console.log('Unable to get sim info: ', err)
    );
    
    this.sim.hasReadPermission().then(
      (info) => console.log('Has permission: ', info)
    );
    
    this.sim.requestReadPermission().then(
      () => console.log('Permission granted'),
      () => console.log('Permission denied')
    );
  }

  goBack() {
    if(this.lastPageLogin) {
      this.navCtrl.popToRoot();
    } else {
      this.navCtrl.pop();
    }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Registriere...'
    });

    this.loading.present();
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
