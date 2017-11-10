import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user-model";
import {Credentials} from "../credentials";


@Injectable()
export class UserServiceProvider {

  private headers: Headers;
  private options : RequestOptions;

  constructor(public http: Http, public credentials: Credentials) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  getUserData(token: string): Observable<any> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + token);

    this.options = new RequestOptions({
      headers: this.headers
    });
    return this.http.get(this.credentials.getApiUrl() + `user?token=${token}`, this.options)
      .map((res: any) =>
        res.json(),
        (err: any) => Observable.throw(err.json())
      );
  }

  getUserByTeamId(team_id: string): Observable<any> {
    return this.http.get(this.credentials.getApiUrl() + `user?team_id=${team_id}`, this.options)
      .map((res: any) =>
        res.json(),
        (err: any) => Observable.throw(err.json())
      );
  }

  updateUser(userData: User): Observable<any> {
    return this.http.put(this.credentials.getApiUrl() + `user/${userData.uuid}` , userData, this.options);
  }


}
