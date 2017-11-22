import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {Credentials} from "./credentials";

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
    return this.http.post(this.credentials.getApiUrl() + 'event', JSON.stringify(event), this.options)
      .map((res: any) =>
        res.json()
      );
  }

  getEventInvites(event_id: string): Observable<any> {
    return this.http.get(this.credentials.getApiUrl() + `event/invites/${event_id}`, this.options)
      .map((res: any) =>
        res.json()
      )
  }

  addEventInvite(user_id, event_id): Observable<any> {
    let data = {
      user_id: user_id,
      event_id: event_id
    };
    return this.http.post(this.credentials.getApiUrl() + 'event/invite', JSON.stringify(data), this.options)
      .map((res: any) => {
        res.json()
      })
  }

  setEventParticipation(uuid, participation): Observable<any> {
    let data = {
      participation: participation
    };
    return this.http.put(this.credentials.getApiUrl() + `event/invite/${uuid}`, JSON.stringify(data), this.options)
      .map((res: any) => {
        res.json()
      })
  }
}
