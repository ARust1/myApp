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

  private options: RequestOptions;

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {
    super(http, storage, credentials);
    this.options = new RequestOptions({
      headers: null
    })
  }

  getUserData(token: string): Observable<any> {
    console.log(this.options);
    return this.http.get(this.credentials.getApiUrl() + `/user?token=${token}`, this.options)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  getUserByTeamId(team_id: string): Observable<any> {
    return this.http.get(this.credentials.getApiUrl() + `/user?team_id=${team_id}`, this.options)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }

  updateUser(userData: User): Observable<any> {
    return this.http.put(this.credentials.getApiUrl() + `/user/${userData.uuid}` , userData, this.options)
      .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError);
  }
}
