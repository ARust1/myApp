import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../models/user-model";

let apiUrl = 'http://localhost:3000/api/v1/';
let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

let options = new RequestOptions({
  headers: headers
});

@Injectable()
export class UserServiceProvider {

  constructor(public http: Http) {}


  updateUser(userData: User) {
    return new Promise((resolve, reject) => {
      this.http.put(apiUrl + 'user/' + userData.uuid, userData, options)
        .subscribe( res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        })
    })
  }
}
