import { Component, OnInit, ElementRef } from '@angular/core';
import { BookingService } from '../Services/Booking/booking.service';
import {Moment} from 'moment';
import {Room} from '../Models/Room';
import { RoomService } from '../Services/Room/room.service';
import { Router } from '@angular/router';
import { Booking } from '../Models/Booking';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  roomID: number;
  From: Moment;
  To: Moment;

  Booking: Booking;
  Rooms: Room[];

  Errors = [];
  constructor(private bookingService: BookingService, private roomService: RoomService, private ref: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.setInputWidth();
    this.getRoom();
  }

  setInputWidth(): void{
    const dpDatePicker = this.ref.nativeElement.querySelectorAll('dp-date-picker');
    for (const item of dpDatePicker){
      item.style.width = '100%';
    }
    const input = this.ref.nativeElement.querySelectorAll('.dp-picker-input');
    for (const item of input){
      item.style.width = '100%';
    }
  }

  getRoom(): void{
    this.roomService.getRoom()
      .subscribe(result => this.Rooms = result);
  }

  CreateBooking(): void{
    if (this.Validate()) {
      this.Booking = {roomID: this.roomID, from: this.From.format(), to: this.To.format()};
      this.bookingService.createBooking(this.Booking)
      .subscribe(result => {
        localStorage.setItem('flash_message', 'Booking Created');
        this.router.navigate(['/booking']);
      },
      error => {this.Errors.push({type : 'danger', message: error.error}); });
    }
  }

  close(error): void{
    this.Errors = this.Errors.filter(value => {
      return value !== error;
    });
  }

  private Validate(): boolean{
    this.Errors = [];
    if (this.roomID == null){
      this.Errors.push({type: 'danger', message: 'Select a room'});
    }

    if (this.From == null || this.To == null) {
      this.Errors.push({type: 'danger', message: 'Please select from and to'});
    }

    if (this.From.isAfter(this.To)) {
      this.Errors.push({type: 'danger', message: 'From is after To ???? Really'});
    }

    return this.Errors.length === 0;
  }

}
