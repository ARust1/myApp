import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import {Credentials} from "./credentials";

@Injectable()
export class InviteServiceProvider {

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


  sendRequest(team_id: string, user_id: string): Observable<any> {
    let data = {
      team_id: team_id,
      user_id: user_id
    };
    return this.http.post(this.credentials.getApiUrl() + "invite/request", data, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  getTeamRequests(team_id: string): Observable<any> {
    return this.http.get(this.credentials.getApiUrl() + `invite/${team_id}`, this.options)
      .map((res:any) =>
        res.json()
      )
  }

  acceptRequest(user_id: string, team_id: string): Observable<any> {
    let data = {
      user_id : user_id,
      team_id : team_id
    };
    return this.http.put(this.credentials.getApiUrl() + 'invite/accept', data, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  deleteRequest(user_id: string): Observable<any> {
    return this.http.delete(this.credentials.getApiUrl() + `invite/${user_id}`, this.options)
      .map((res: any) =>
        res.json()
      );
  }
}
