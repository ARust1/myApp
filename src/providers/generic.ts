import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Credentials} from "./credentials";
import {Storage} from '@ionic/storage';

@Injectable()
export class GenericProvider<T> {

  modelName: string;
  constructor(public http: Http,
              public storage: Storage,
              protected credentials: Credentials) {
  }

  buildUrl(modelName:string): string {
    let url = this.credentials.getApiUrl();
    if(modelName){
      url += `${modelName}`;
    }
    return url;
  }

  getRequest(url): Observable<T> {
    let token = this.credentials.getToken();
    let options = this.credentials.buildOptions(token);
    return this.http.get(url, options)
        .do(this.logResponse)
        .map(this.extractData)
        .catch(this.catchError);
  }

  postRequest(url, data): Observable<T> {
    let token = this.credentials.getToken();
      let options = this.credentials.buildOptions(token);
      return this.http.post(url, JSON.stringify(data) ,options)
        .do(this.logResponse)
        .map(this.extractData)
        .catch(this.catchError);
  }

  putRequest(url, data): Observable<T> {
    let token = this.credentials.getToken();
      let options = this.credentials.buildOptions(token);
      return this.http.put(url, JSON.stringify(data) ,options)
        .do(this.logResponse)
        .map(this.extractData)
        .catch(this.catchError);
  }

  patchRequest(url, data): Observable<T> {
    let token = this.credentials.getToken();
      let options = this.credentials.buildOptions(token);
      return this.http.patch(url, JSON.stringify(data) ,options)
        .do(this.logResponse)
        .map(this.extractData)
        .catch(this.catchError);
  }

  deleteRequest(url): Observable<T> {
    let token = this.credentials.getToken();
      let options = this.credentials.buildOptions(token);
      return this.http.delete(url, options)
        .do(this.logResponse)
        .map(this.extractData)
        .catch(this.catchError);
  }

  catchError(error: Response | any) {
    return Observable.throw(error.json() || "Error");
  }

  logResponse(res: Response) {
    //console.log(res);
  }

  extractData(res: Response): Observable<T> {
    return res.json();
  }
}
