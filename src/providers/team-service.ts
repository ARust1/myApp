import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import {Credentials} from "./credentials";
import {GenericProvider} from "./generic";
import {Team} from "../models/team-model";
import {Storage} from "@ionic/storage";

@Injectable()
export class TeamServiceProvider extends GenericProvider<Team>{

  private options: RequestOptions;

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {
    super(http, storage, credentials);
    this.options = new RequestOptions({
      headers: null
    })
  }

  getTeamById(uuid: string): Observable<any> {
    return this.http.get(this.credentials.getApiUrl() + `/team/${uuid}`, this.options)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  getTeamByInviteToken(invite_token: string): Observable<any> {
    return this.http.get(this.credentials.getApiUrl() + `/team?invite_token=${invite_token}`, this.options)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  createTeam(uuid:string, name:string): Observable<any> {
    let data = {
      owner_id : uuid,
      name : name
    };
    return this.http.post(this.credentials.getApiUrl() + '/team', data, this.options)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  getInviteToken(team_id: string) {
    let data = {
      team_id: team_id
    };
    return this.http.put(this.credentials.getApiUrl() + `/team/invite_token`, data, this.options)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }
}
