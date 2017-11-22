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

  getUserData(token: string): Observable<User> {
    return this.getRequest(this.buildUrl('/user?token='+token));
  }

  getUserByTeamId(team_id: string): Observable<User> {
    return this.getRequest(this.buildUrl('/user?team_id='+team_id));
  }

  updateUser(userData: User): Observable<User> {
    return this.putRequest(this.buildUrl('/user'+userData.uuid), userData);
  }
}
