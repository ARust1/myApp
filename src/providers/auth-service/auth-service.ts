import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Credentials} from "../credentials";

@Injectable()
export class AuthServiceProvider {

  headers: Headers;
  options : RequestOptions;

  constructor(public http: Http, public credentials: Credentials) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  login(credentials): Observable<any> {
    return this.http.post(this.credentials.getApiUrl() + 'auth', credentials, this.options)
      .map((res: any) =>
        res.json(),
        (err: any) => Observable.throw(err.json())
      );
  }

  register(data): Observable<any> {
    return this.http.put(this.credentials.getApiUrl() + 'register', JSON.stringify(data), this.options);
  }

  logout(){
    return new Promise((resolve, reject) => {
      //this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

      this.http.post(this.credentials.getApiUrl() + 'logout', {}, this.options)
        .subscribe(res => {
          window.localStorage.clear();
        }, (err) => {
          reject(err);
        });
    });
  }
}
