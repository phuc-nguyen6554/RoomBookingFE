import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  roomID: number;
  From: string;
  To: string;
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
  }

  CreateBooking(): void{
    this.bookingService.createBooking({RoomId: this.roomID, From: this.From, To: this.To})
      .subscribe(result => {console.log(result)});
  }

}
