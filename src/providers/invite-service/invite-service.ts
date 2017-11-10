import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';

@Injectable()
export class InviteServiceProvider {

  apiUrl = 'http://localhost:3000/api/v1/';
  headers: Headers;
  options : RequestOptions;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  sendRequest(team_id: string, user_id: string): Observable<any> {
    var data = {
      team_id: team_id,
      user_id: user_id
    };
    return this.http.post(this.apiUrl + "invite", data, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  getTeamRequests(team_id: string): Observable<any> {
    return this.http.get(this.apiUrl + `invite/${team_id}`, this.options)
      .map((res:any) =>
        res.json()
      )
  }
}
