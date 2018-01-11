import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Credentials} from "./credentials";
import {User} from "../models/user-model";
import {GenericProvider} from "./generic";
import {Storage} from "@ionic/storage";


@Injectable()
export class UserServiceProvider extends GenericProvider<User>{

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {
    super(http, storage, credentials);
  }

  getUserById(uuid: string): Observable<User> {
    return this.getRequest(this.buildUrl('/user/'+uuid));
  }

  getUserData(token: string): Observable<User> {
    return this.getRequest(this.buildUrl('/user?token='+token));
  }

  getUserByTeamId(team_id: string): Observable<User> {
    return this.getRequest(this.buildUrl('/user?team_id='+team_id));
  }

  updateUser(userData: User): Observable<User> {
    return this.putRequest(this.buildUrl('/user/'+userData.uuid), userData);
  }

  saveFileId(uuid: string, file_id: string): Observable<User> {
    return this.putRequest(this.buildUrl('/user/'+uuid+'/identityCard'), {
      file_id: file_id
    });
  }

  saveProfileImg(uuid: string, profile_img: any): Observable<User> {
    return this.putRequest(this.buildUrl('/user/'+uuid+'/profileImg'), {
      profile_img: profile_img
    });
  }

  setTeam(uuid: string, team_id: string): Observable<User> {
    return this.putRequest(this.buildUrl('/user/'+uuid+'/team'), {
      team_id: team_id
    });
  }
}
