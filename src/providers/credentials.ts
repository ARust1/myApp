import {Injectable} from "@angular/core";

@Injectable()
export class Credentials {
  private apiUrl = 'http://localhost:3000/api/v1/';

  public getApiUrl(): string {
    return this.apiUrl;
  }
}
