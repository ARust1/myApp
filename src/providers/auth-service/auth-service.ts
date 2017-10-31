import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

let apiUrl = 'http://localhost:3000/api/v1/';
let headers = new Headers();
headers.append('Content-Type', 'application/json');

let options = new RequestOptions({
  headers: headers
});

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {}

  login(credentials): Observable<any> {
    return this.http.post(apiUrl+'auth', credentials, options)
      .map((res: any) =>
        res.json(),
        (err: any) => Observable.throw(err.json())
      );
  }

  register(data): Observable<any> {
    return this.http.put(apiUrl+'register', JSON.stringify(data), options);
  }

  logout(){
    return new Promise((resolve, reject) => {
      headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

      this.http.post(apiUrl+'logout', {}, options)
        .subscribe(res => {
          window.localStorage.clear();
        }, (err) => {
          reject(err);
        });
    });
  }
}
