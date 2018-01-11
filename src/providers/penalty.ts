import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {Credentials} from "./credentials";
import {Storage} from "@ionic/storage";
import {Penalty} from "../models/penalty-model";
import {Observable} from "rxjs";

/*
  Generated class for the PenaltyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PenaltyProvider extends GenericProvider<Penalty>{

  private preDefinedPenalties: Penalty[] = [
    {
      name: "unnötige rote Karte",
      user_id: null,
      team_id: null,
      amount: 0
    },
    {
      name: "unnötige gelbe/gelb-rote Karte",
      user_id: null,
      team_id: null,
      amount: 0
    },
    {
      name: "unvollständige Ausrüstung",
      user_id: null,
      team_id: null,
      amount: 0
    },
    {
      name: "Handy klingelt während der Mannschaftssitzung",
      user_id: null,
      team_id: null,
      amount: 0
    },
    {
      name: "unentschuldigtes Fehlen beim Training",
      user_id: null,
      team_id: null,
      amount: 0
    },
    {
      name: "unentschuldigtes Fehlen beim Spiel",
      user_id: null,
      team_id: null,
      amount: 0
    },
    {
      name: "zu spät zum Training",
      user_id: null,
      team_id: null,
      amount: 0
    },
    {
      name: "zu spät zum Spiel",
      user_id: null,
      team_id: null,
      amount: 0
    }
  ];

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {

    super(http, storage, credentials);
  }

  getPreDefinedPenalties(): Observable<Penalty[]> {
    return this.getPreDefinedPenalties();
  }

  getPenaltiesByTeam(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/penalties/'+team_id));
  }

  addPenalty(penaltyData: Penalty): Observable<Penalty> {
    return this.postRequest(this.buildUrl('/penalties'), {
      name: penaltyData.name,
      user_id: penaltyData.user_id,
      team_id: penaltyData.team_id,
      amount: penaltyData.amount
    })
  }

  deletePenalty(uuid: string) {
    return this.deleteRequest(this.buildUrl('/penalties/'+uuid));
  }
}
