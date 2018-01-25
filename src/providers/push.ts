import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { FCM } from '@ionic-native/fcm';
import {Http} from "@angular/http";
import {Storage} from "@ionic/storage";
import {Credentials} from "./credentials";
import {GenericProvider} from "./generic";

@Injectable()
export class PushProvider extends GenericProvider<any> {

  constructor(private fcm: FCM,
              public http: Http,
              public storage: Storage,
              public credentials: Credentials) {
    super(http, storage, credentials);
  }

  saveToken(user_id: string, team_id: string) {
    console.log("save token");
    this.fcm.getToken().then( token => {
      console.log(token);
      this.postRequest(this.buildUrl('/pushTokens'), {
        token: token,
        user_id: user_id,
        team_id: team_id
      })
    })
  }

  onNotification() {
    this.fcm.onNotification().subscribe( data => {
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      }
    })
  }



}
