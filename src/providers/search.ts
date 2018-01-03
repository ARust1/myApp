import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../models/user-model";

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  private userList: User[];

  constructor(public http: Http) {
    console.log('Hello SearchProvider Provider');
  }

  onInput($event, userList: any, callback: any): any {
    let val = $event.target.value;
    if(val && val !== undefined && val !== '') {
      return this.userList = userList.filter(user => {
        return user.prename.toLowerCase().indexOf(val.toLowerCase()) !== -1
          ||  user.surname.toLowerCase().indexOf(val.toLowerCase()) !== -1;
      });

    } else {
      return callback();
    }
  }

  setUserList(userList: User[]) {
    this.userList = userList;
  }

  getUserList() {
    return this.userList;
  }
}
