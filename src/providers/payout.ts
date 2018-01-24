import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {Credentials} from "./credentials";
import {Payout} from "../models/stripe-payment-model";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";

@Injectable()
export class PayoutProvider extends GenericProvider<Payout>{

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {

    super(http, storage, credentials);
  }

  getPayoutsByTeam(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/payouts/'+team_id));
  }


  addPayout(payoutData: Payout): Observable<Payout> {
    return this.postRequest(this.buildUrl('/payouts'), {
      recipient: payoutData.recipient,
      description: payoutData.description,
      timestamp: payoutData.timestamp,
      type: payoutData.type,
      team_id: payoutData.team_id,
      amount: payoutData.amount,
      user_id: payoutData.user_id,
      payout_token: payoutData.payout_token,
      sender: payoutData.sender
    })
  }

}
