import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/filter';
import {Credentials} from "./credentials";
import {GenericProvider} from "./generic";
import {Storage} from "@ionic/storage";
import {TeamInvite} from "../models/team-invite-model";

@Injectable()
export class InviteServiceProvider extends GenericProvider<TeamInvite>{

  headers: Headers;
  options : RequestOptions;

  constructor(public http: Http, public storage: Storage, public credentials: Credentials) {
    super(http, storage, credentials);
  }


  sendRequest(team_id: string, user_id: string): Observable<TeamInvite> {
    let data = {
      team_id: team_id,
      user_id: user_id
    };
    return this.postRequest(this.buildUrl('/invite/request'), data);
  }

  getTeamRequests(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/invite/'+team_id));
  }

  acceptRequest(user_id: string, team_id: string): Observable<any> {
    let data = {
      user_id : user_id,
      team_id : team_id
    };
    return this.putRequest(this.buildUrl('/invite/accept'),  data);
  }

  deleteRequest(user_id: string): Observable<any> {
    return this.deleteRequest(this.buildUrl('/invite/'+user_id));
  }
}
