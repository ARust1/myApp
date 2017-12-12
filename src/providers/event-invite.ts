import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {EventInvite} from "../models/event-invite-model";
import {Storage} from "@ionic/storage";
import {Credentials} from "./credentials";
import {Observable} from "rxjs";


@Injectable()
export class EventInviteProvider extends GenericProvider<EventInvite>{

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {

    super(http, storage, credentials);
  }

  getEventInvites(event_id: string): Observable<EventInvite> {
    return this.getRequest(this.buildUrl('/event/invites/'+event_id));
  }

  addEventInvite(user_id: string, event_id: string): Observable<EventInvite> {
    let data = {
      user_id: user_id,
      event_id: event_id
    };
    return this.postRequest(this.buildUrl('/event/invite'), data);
  }

  deleteEventInvite(user_id: string, event_id: string): Observable<EventInvite> {
    return this.deleteRequest(this.buildUrl('/event/invite?user_id='+user_id+'&event_id='+event_id));
  }

  setEventParticipation(uuid, participation): Observable<EventInvite> {
    let data = {
      participation: participation
    };
    return this.putRequest(this.buildUrl('/event/invite/'+uuid), data);
  }

  setEventPayment(e_uuid, paymentMethod): Observable<EventInvite> {
    return this.putRequest(this.buildUrl('/event/payment/'+e_uuid), paymentMethod);
  }

  acceptEventPayment(e_uuid): Observable<EventInvite> {
    return this.putRequest(this.buildUrl('/event/acceptPayment/'+e_uuid), {});
  }
}
