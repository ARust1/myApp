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

  getEventInvites(event_id: string): Observable<Event> {
    return this.getRequest(this.buildUrl('/event/invites/'+event_id));
  }

  addEventInvite(user_id, event_id): Observable<any> {
    let data = {
      user_id: user_id,
      event_id: event_id
    };
    return this.postRequest(this.buildUrl('/event/invite'), data);
  }

  deleteEventInvite(uuid: string): Observable<any> {
    return this.deleteRequest(this.buildUrl('/event/invite/'+uuid));
  }

  setEventParticipation(uuid, participation): Observable<any> {
    let data = {
      participation: participation
    };
    return this.putRequest(this.buildUrl('/event/invite/'+uuid), data);
  }
}
