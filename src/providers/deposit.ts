import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {Credentials} from "./credentials";
import {Deposit} from "../models/stripe-payment-model";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";

@Injectable()
export class DepositProvider extends GenericProvider<Deposit>{

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {

    super(http, storage, credentials);
  }

  getDepositsByTeam(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/deposits/'+team_id));
  }


  addDeposit(depositData: Deposit): Observable<Deposit> {
    return this.postRequest(this.buildUrl('/deposits'), {
      recipient: depositData.recipient,
      description: depositData.description,
      timestamp: depositData.timestamp,
      type: depositData.type,
      team_id: depositData.team_id,
      amount: depositData.amount,
      user_id: depositData.user_id,
      deposit_token: depositData.deposit_token,
      sender: depositData.sender
    })
  }

}
