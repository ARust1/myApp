import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Event} from "../../models/event-model";

@Injectable()
export class EventServiceProvider {

  apiUrl = 'http://localhost:3000/api/v1/';
  headers: Headers;
  options : RequestOptions;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  getEventsByTeamId(team_id: string): Observable<Event[]> {
    return this.http.get(this.apiUrl + `event/${team_id}`, this.options)
      .map((res: any) =>
        res.json()
      );
  }

  createEvent(event: Event): Observable<any> {
    return this.http.post(this.apiUrl + 'event', event, this.options)
      .map((res: any) =>
        res.json()
      );
  }

}
