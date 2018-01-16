import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {Credentials} from "./credentials";
import {BoardMessage} from "../models/boardmessage-model";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs";

@Injectable()
export class BoardMessagesProvider extends GenericProvider<BoardMessage>{

  constructor(public http: Http,
              public storage: Storage,
              public credentials: Credentials) {

    super(http, storage, credentials);
  }

  getBoardMessagesByTeam(team_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/boardMessages/'+team_id));
  }

  addBoardMessage(boardMessageData: BoardMessage): Observable<BoardMessage> {
    return this.postRequest(this.buildUrl('/boardMessages'), {
      message: boardMessageData.message,
      team_id: boardMessageData.team_id,
      timestamp: boardMessageData.timestamp
    })
  }
}
