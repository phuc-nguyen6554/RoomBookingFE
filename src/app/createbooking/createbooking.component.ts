import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BookingService } from '../Services/Booking/booking.service';
import {Room} from '../Models/Room';
import { RoomService } from '../Services/Room/room.service';
import { Router } from '@angular/router';
import { Booking } from '../Models/Booking';
import { MessageService } from '../Services/Message/message.service';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  roomID: number;
  From: string;
  To: string;

  Booking: Booking;
  Rooms: Room[];

  constructor(private bookingService: BookingService, private roomService: RoomService, private ref: ElementRef, private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.setInputWidth();
    this.getRoom();
  }

  setInputWidth(): void{
    const dpDatePicker = this.ref.nativeElement.querySelectorAll('mat-form-field');
    for (const item of dpDatePicker){
      item.style.width = '45%';
    }
  }

  getRoom(): void{
    this.roomService.getRoom()
      .subscribe(result => this.Rooms = result);
  }

  CreateBooking(): void{
    this.messageService.clearAll();
    if (this.Validate()) {
      this.Booking = {roomID: this.roomID, from: this.From, to: this.To};
      this.bookingService.createBooking(this.Booking)
      .subscribe(result => {
        localStorage.setItem('flash_message', 'Booking Created');
        this.router.navigate(['/booking']);
      },
      error => {this.messageService.add({type: 'danger', content: error.error}); });
    }
  }

  private Validate(): boolean{
    let isValid = true;

    if (this.roomID == null){
      this.messageService.add({type: 'danger', content: 'Please Select a Room'});
      isValid = false;
    }

    if (this.From == null || this.To == null) {
      this.messageService.add({type: 'danger', content: 'Please Select Time'});
      isValid = false;
    }

    if (this.From >= this.To) {
      this.messageService.add({type: 'danger', content: 'Time is not Valid'});
      isValid = false;
    }

    return isValid;
  }

}
