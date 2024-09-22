import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  // ? --------------- baseUrl ---------------
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/auth/`

  // ?------------Register------------------
  register(objectForm: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `signup`, objectForm)
  }

  // ?------------Login------------------
  login(objectForm: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `signin`, objectForm)
  }

}
