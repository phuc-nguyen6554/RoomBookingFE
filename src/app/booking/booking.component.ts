import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Services/Booking/booking.service';
import { Router } from '@angular/router';
import {Booking} from '../Models/Booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[];
  message: any;

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.getAllBooking();
    if (localStorage.getItem('flash_message') != null) {
      this.message = {type: 'success', message: localStorage.getItem('flash_message')};
      localStorage.removeItem('flash_message');
    }
  }

  getAllBooking(): void{
    this.bookingService.getAllBooking()
      .subscribe(result => {this.bookings = result; console.log(result) });
  }

  delete(id: number): void {
    this.bookingService.deleteBooking(id)
      .subscribe(result => {
        console.log(result.body);
        this.bookings = this.bookings.filter(value => {
          return value.id !== result.body.id;
        });
      },
      error => {
        this.message = {type: 'danger', message: error.error};
      });
  }

  close(): void{
    this.message = null;
  }

}
