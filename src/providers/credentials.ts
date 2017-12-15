import { Injectable, isDevMode } from '@angular/core';
import {Http, Headers, RequestOptions, } from '@angular/http';
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
    return localStorage.getItem(this.storageKeyToken)
  }

  public getUser(): any {
    localStorage.getItem(this.storageKeyUser)
  }

  public saveUserIdToStorage(userData: any) {
    localStorage.setItem(this.storageKeyUser, userData.uuid);
  }

  public saveTokenToStorage(uuid: string) {
    localStorage.setItem(this.storageKeyToken, uuid);
  }

  public removeKey(key: string) {
      localStorage.removeItem(key)
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
