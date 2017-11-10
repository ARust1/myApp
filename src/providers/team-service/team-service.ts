import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import {Credentials} from "../credentials";

@Injectable()
export class TeamServiceProvider {

  headers: Headers;
  options : RequestOptions;
  constructor(public http: Http, private credentials: Credentials) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  getTeamById(uuid: string): Observable<any> {
    return this.http.get(this.credentials.getApiUrl() + `team/${uuid}`, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  getTeamByInviteToken(invite_token: string): Observable<any> {
    return this.http.get(this.credentials.getApiUrl() + `team?invite_token=${invite_token}`, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  createTeam(uuid:string, name:string): Observable<any> {
    let data = {
      owner_id : uuid,
      name : name
    };
    return this.http.post(this.credentials.getApiUrl() + 'team', data, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  getInviteToken(team_id: string) {
    let data = {
      team_id: team_id
    };
    return this.http.put(this.credentials.getApiUrl() + `team/invite_token`, data, this.options)
      .map((res: any) =>
        res.json()
      );
  }
}
