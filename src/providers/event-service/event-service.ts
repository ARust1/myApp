import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {Event} from "../../models/event-model";
import {Credentials} from "../credentials";

@Injectable()
export class EventServiceProvider {

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

  getEventsByTeamId(team_id: string): Observable<Event[]> {
    return this.http.get(this.credentials.getApiUrl() + `event/${team_id}`, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  createEvent(event): Observable<any> {
    return this.http.post(this.credentials.getApiUrl() + 'event', JSON.stringify(event), this.options);
  }

}
