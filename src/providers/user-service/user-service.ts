import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user-model";


@Injectable()
export class UserServiceProvider {

  private apiUrl = 'http://localhost:3000/api/v1/';
  private headers: Headers;
  private options : RequestOptions;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  getUserData(token: string): Observable<any> {
    return this.http.get(this.apiUrl + `user?token=${token}`, this.options)
      .map((res: any) =>
        res.json(),
        (err: any) => Observable.throw(err.json())
      );
  }

  getUserByTeamId(team_id: string): Observable<any> {
    return this.http.get(this.apiUrl + `user?team_id=${team_id}`, this.options)
      .map((res: any) =>
        res.json(),
        (err: any) => Observable.throw(err.json())
      );
  }

  updateUser(userData: User): Observable<any> {
    return this.http.put(this.apiUrl + `user/${userData.uuid}` , userData, this.options);
  }


}
