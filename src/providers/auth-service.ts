import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {Credentials} from "./credentials";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";


@Injectable()
export class AuthServiceProvider extends GenericProvider<any>{

  constructor(public http: Http,
              public storage: Storage,
              protected credentials: Credentials) {
    super(http, storage, credentials);
  }

  login(credentials): any {
    console.log(this.buildUrl('/auth'));
    return this.postRequest(this.buildUrl('/auth'),
      credentials);
  }

  /*login(credentials): Observable<any> {
    return this.http.post(this.credentials.getApiUrl() + 'auth', credentials, this.credentials.getHeaderWithOptions())
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }*/

  register(data): Observable<any> {
    return this.http.put(this.credentials.getApiUrl() + 'register',
      JSON.stringify(data),
     null);
  }

  logout(){
    return new Promise((resolve, reject) => {

      this.http.post(this.credentials.getApiUrl() + 'logout',
        {},
        null)
        .subscribe(res => {
        }, (err) => {
          reject(err);
        });
    });
  }
}
