import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { PushToken } from '../models/push-token-model';
import { Storage } from '@ionic/storage';
import { Credentials } from './credentials';
import { GenericProvider } from './generic';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http/src/base_request_options';

@Injectable()
export class PushProvider extends GenericProvider<PushToken> {

  private fcmKey: string = 'key=AAAA7DYu3dQ:APA91bEzHsnAwmBP8cOFzhgCmzTqqZWEwiyy9BUDW-jaqSmbrpEn1qW2p2z648zUYKhLSriY2L43YbJYc6y4bNow9gT6_bHFb_bPozlbYSYOarZuJY0H0DOL1PaX6HFQasSYXgoffc93';

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {
    super(http, storage, credentials);
  }

  /**
   * Get Push Tokens by Team
   * @param team_id: string
   * @returns JSON with PushToken Objects
   */

  getPushTokenByTeam(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/pushTokens?team_id='+team_id));
  }

  /**
   * Get Push Tokens by Team
   * @param user_id: string
   * @returns JSON with PushToken Objects
   */

  getPushTokenByUser(user_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/pushTokens/'+user_id));
  }

  /**
   * Persists a PushToken into Database
   * @param pushTokenData: PushToken
   * @returns mysql message
   */

  savePushToken(pushTokenData: PushToken): Observable<any> {
    return this.postRequest(this.buildUrl('/pushTokens'), {
      token: pushTokenData.token,
      user_id: pushTokenData.user_id,
      team_id: pushTokenData.team_id
    })
  }

  /**
   * Get Push Tokens of the wallet manager by Team
   * @param team_id: string
   * @returns Array of tokens
   */
  getPushOfTeamWalletManager(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/pushTokens?team_admin='+team_id));
  }

  /**
   * Get Push Tokens of User by Stripe Token
   * @param stripeToken: string
   * @returns Array of tokens
   */
  getPushOfUserByStripeToken(stripeToken: string): Observable<any> {
    return this.getRequest(this.buildUrl('/pushTokens?stripeToken='+stripeToken));
  }

  /**
   * Send PushNotifications to given Tokens
   * @param registrationIds: Array
   * @param message: string
   * @returns Response Message from FCM
   */
  sendPush(registrationIds: Array<any>, message: string): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.fcmKey);

    let data = {
      registration_ids: registrationIds,
      priority: "high",
      notification: {
         body: message
       }
     }
    
    return this.http.post('https://fcm.googleapis.com/fcm/send', data, {headers: header})
     .map( res => {
       res.json();
     })
  }

  /**
   * Send PushNotifications to given Topic
   * @param teamTopic: string
   * @param message: string
   * @returns Response Message from FCM
   */
  sendPushToTopic(teamTopic: string, message: string): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.fcmKey);

    let data = {
      to: "/topics/team_"+teamTopic,
      priority: "high",
      notification: {
         body: message
       }
     }
    
    return this.http.post('https://fcm.googleapis.com/fcm/send', data, {headers: header})
     .map( res => {
       res.json();
     })
  }
}
