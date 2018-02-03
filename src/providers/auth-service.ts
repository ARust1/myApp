import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GenericProvider} from "./generic";
import {Credentials} from "./credentials";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";


@Injectable()
export class AuthServiceProvider extends GenericProvider<any>{

  constructor(public http: Http,
              public storage: Storage,
              protected credentials: Credentials) {
    super(http, storage, credentials);
  }

  login(credentials): Observable<any> {
    return this.postRequest(this.buildUrl('/auth'),
      credentials);
  }

  register(data): Observable<any> {
    return this.postRequest(this.buildUrl('/register'), data);
  }

  logout(): Observable<any> {
    return this.postRequest(this.buildUrl('/logout'), {}).map( res => {
      this.credentials.removeKey('token');
    });
  }

  validate(user_id: string): Observable<any> {
    return this.patchRequest(this.buildUrl('/auth/'+user_id+'/validation'), {});
  }

  checkValidationStatus(user_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/auth/'+user_id+'/validation'));
  }

  sendValidation(user_id: string, email: string): Observable<any> {
    return this.patchRequest(this.buildUrl('/auth/'+user_id+'/validationCode'), {
      email: email
    });
  }

  getValidationCode(user_id: string): Observable<any> {
    return this.getRequest(this.buildUrl('/auth/'+user_id+'/validationCode'));
  }

}
