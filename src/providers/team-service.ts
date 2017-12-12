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

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {
    super(http, storage, credentials);
  }

  getTeamById(uuid: string): Observable<Team> {
    return this.getRequest(this.buildUrl('/team/'+uuid));
  }

  getTeamByInviteToken(invite_token: string): Observable<any> {
    return this.getRequest(this.buildUrl('/team?invite_token='+invite_token));
  }

  createTeam(uuid:string, name:string): Observable<Team> {
    let data = {
      owner_id : uuid,
      name : name
    };
    return this.postRequest(this.buildUrl('/team'), data);
  }

  getInviteToken(team_id: string) {
    let data = {
      team_id: team_id
    };
    return this.putRequest(this.buildUrl('/team/invite_token'), data);
  }

  updateTeamBalance(uuid, amount) {
    let data = {
      amount: amount
    };
    return this.putRequest(this.buildUrl('/team/'+uuid+'/balance'), data);
  }
}
