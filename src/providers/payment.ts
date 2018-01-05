import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {Credentials} from "./credentials";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs";


@Injectable()
export class PaymentProvider extends GenericProvider<any>{

  constructor(public http: Http, public storage: Storage, public credentials: Credentials) {
    super(http, storage, credentials);
  }

  createStripeAccount(): Observable<any> {
    return this.postRequest(this.buildUrl('/payment/createAccount'), {});
  }

  updateStripeAccount(stripeData: any, accountToken: string): Observable<any> {
    return this.putRequest(this.buildUrl('/payment/account/'+accountToken), stripeData);
  }

  uploadIdDocument(filePath: string, accountToken: string): Observable<any> {
    return this.postRequest(this.buildUrl('/payment/account/'+accountToken+'/documents'), {
      file_path: filePath
    });
  }

  deleteStripeAccount(accountToken: string): Observable<any> {
    return this.deleteRequest(this.buildUrl('/payment/account/'+accountToken));
  }

  getStripeAccount(accountToken: string): Observable<any> {
    return this.getRequest(this.buildUrl('/payment/account/'+accountToken));
  }

  addBankAccount(stripeBankData: any): Observable<any> {
    return this.postRequest(this.buildUrl('/payment/account/bankAccount'), stripeBankData);
  }

  createTransfer(stripeTransferData: any): Observable<any> {
    return this.postRequest(this.buildUrl('/payment/transfer'), stripeTransferData);
  }

  listTransfers(accountToken: string): Observable<any> {
    return this.getRequest(this.buildUrl('/payment/'+accountToken+'/transfers'));

  }

  getStripeAccountBalance(accountToken: string): Observable<any> {
    return this.getRequest(this.buildUrl('/payment/account/'+accountToken+'/balance'));
  }

  chargeStripeBankAccount(accountToken: string, amount: number): Observable<any> {
    return this.postRequest(this.buildUrl('/payment/account/'+accountToken+'/deposit'), {
      amount: amount
    });
  }

  payout(accountToken: string, amount: number): Observable<any> {
    return this.postRequest(this.buildUrl('/payment/account/'+accountToken+'/payout'), {
      amount: amount
    });
  }

  listPayouts(accountToken: string): Observable<any> {
    return this.getRequest(this.buildUrl('/payment/account/'+accountToken+'/payouts'));

  }

}
