import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave } from '../../Models/Leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  header: HttpHeaders;

  apiEndpoint = 'https://localhost:44350/gateway/LeaveRequest';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('JWT_token');
    this.header = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json')
     .set('Authorization', 'Bearer ' + localStorage.getItem('JWT_token'));
  }

  getAllLeave(): Observable<Leave[]>{
    return this.http.get<Leave[]>(this.apiEndpoint, {headers: this.header});
  }

  createLeave(leave: Leave): Observable<any>{
    return this.http.post<any>(this.apiEndpoint, leave, {headers: this.header, observe: 'response'});
  }

  deleteBooking(id: number): Observable<any>{
    return this.http.delete(this.apiEndpoint + `/${id}`, {headers: this.header, observe: 'response'} );
  }
}
