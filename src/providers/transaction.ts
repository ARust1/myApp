import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {Credentials} from "./credentials";
import {Transaction} from "../models/transaction-model";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";

@Injectable()
export class TransactionProvider extends GenericProvider<Transaction>{

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {

    super(http, storage, credentials);
  }

  getTransactionsByTeam(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/transactions/'+team_id));
  }


  addTransaction(transactionData: Transaction): Observable<Transaction> {
    return this.postRequest(this.buildUrl('/transactions'), {
      recipient: transactionData.recipient,
      description: transactionData.description,
      timestamp: transactionData.timestamp,
      type: transactionData.type,
      team_id: transactionData.team_id,
      amount: transactionData.amount,
      user_id: transactionData.user_id
    })
  }

}
