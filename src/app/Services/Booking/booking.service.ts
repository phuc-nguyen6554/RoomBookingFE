import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Booking } from '../../Models/Booking';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  header: HttpHeaders;

  apiEndpoint = 'https://localhost:44350/gateway/Bookings';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('JWT_token');
    this.header = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Accept', 'application/json')
     .set('Authorization', 'Bearer ' + localStorage.getItem('JWT_token'));
  }

  getAllBooking(): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiEndpoint, {headers: this.header});
  }

  createBooking(booking: Booking): Observable<any>{
    return this.http.post<any>(this.apiEndpoint, booking, {headers: this.header, observe: 'response'});
  }

  deleteBooking(id: number): Observable<any>{
    return this.http.delete(this.apiEndpoint + `/${id}`, {headers: this.header, observe: 'response'} );
  }
}
