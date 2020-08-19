import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  header : HttpHeaders;
  constructor(private http : HttpClient) {
    const token = localStorage.getItem('JWT_token');
    this.header = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json')
     .set('Authorization', 'Bearer ' + localStorage.getItem('JWT_token'));
  }

  getAllBooking(): Observable<any>{
    return this.http.get<any>('https://localhost:44350/gateway/Bookings');
  }

  createBooking(param): Observable<any>{
    return this.http.post<any>('https://localhost:44350/gateway/Bookings', param, {headers: this.header});
  }
}
