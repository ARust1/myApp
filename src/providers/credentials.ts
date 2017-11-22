import { Injectable, isDevMode } from '@angular/core';
import {Http, Headers, RequestOptions, } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class Credentials {

  private api = {
    dev: 'http://192.168.0.73:3000/api/v1',
    prod: 'http://91.92.128.99:3000/api/v1'
  };

  private token: string;
  private storageKeyUser = 'userData';
  private storageKeyToken = 'token';

  constructor(private http: Http,
              private storage: Storage) {

  }

  public getApiUrl(): string {
    return isDevMode()
      ? this.api.dev
      : this.api.prod;
  }

  public getToken() {
    return Observable.fromPromise(
      this.storage.get(this.storageKeyToken)
    );
  }

  public getUser(): any {
    return Observable.fromPromise(
      this.storage.get(this.storageKeyUser)
    ).share();
  }

  public saveUserToStorage(userData: any) {
    this.storage.set(this.storageKeyUser, userData);
  }

  public saveTokenToStorage(token: string) {
    this.storage.set(this.storageKeyToken, token);
  }

  public removeKey(key: string) {
    return Observable.fromPromise(
      this.storage.remove(key)
    );
  }

  public buildOptions(token) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + token);

    return new RequestOptions({
      headers: header
    })

  }


}
