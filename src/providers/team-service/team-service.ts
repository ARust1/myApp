import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';

@Injectable()
export class TeamServiceProvider {

  apiUrl = 'http://localhost:3000/api/v1/';
  headers: Headers;
  options : RequestOptions;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

    console.log(window.localStorage.getItem('token'));
    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  getTeamById(uuid: string): Observable<any> {
    return this.http.get(this.apiUrl + `team/${uuid}`, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  createTeam(uuid:string, name:string): Observable<any> {
    let data = {
      owner_id : uuid,
      name : name
    };
    return this.http.post(this.apiUrl + 'team', data, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  getInviteToken(team_id: string) {
    return this.http.put(this.apiUrl + `team/${team_id}/invite_token`, null, this.options)
      .map((res: any) =>
        res.json()
      );
  }
}
