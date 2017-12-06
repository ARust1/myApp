import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {Credentials} from "./credentials";
import {GenericProvider} from "./generic";
import {Storage} from "@ionic/storage";
import {EventInvite} from "../models/event-invite-model";

@Injectable()
export class EventServiceProvider extends GenericProvider<Event>{

  headers: Headers;
  options : RequestOptions;

  constructor(public http: Http, public storage: Storage, public credentials: Credentials) {
    super(http, storage, credentials);

  }

  getEventsByTeamId(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/event/'+team_id));
  }

  createEvent(event): Observable<Event> {
    return this.postRequest(this.buildUrl('/event'), event);
  }

  updateEvent(event): Observable<Event> {
    return this.putRequest(this.buildUrl('/event/'+ event.uuid), event);
  }

  getEventsByInvite(user_id, team_id): Observable<any> {
    return this.getRequest(this.buildUrl('/event?user_id='+user_id+'&team_id='+team_id));
  }
}
