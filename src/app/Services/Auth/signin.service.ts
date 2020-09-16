import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json');

  login(token: string): Observable<any>{
    return this.http.post<any>('https://localhost:2000/login', `'${token}'`, {headers: this.headers});
  }
}
