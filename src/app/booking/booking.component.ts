import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings = [];

  constructor(private bookingService : BookingService) { }

  ngOnInit(): void {
    this.getAllBooking();
  }

  getAllBooking() : void{
    this.bookingService.getAllBooking()
      .subscribe(result => this.bookings = result);
  }

}
