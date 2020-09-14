// import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { BookingService } from '../Services/Booking/booking.service';
// import {Room} from '../Models/Room';
// import { RoomService } from '../Services/Room/room.service';
// import { Router } from '@angular/router';
// import { Booking } from '../Models/Booking';
// import { MessageService } from '../Services/Message/message.service';

import {Component, ViewChild, TemplateRef, OnInit} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, format} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {BookingService} from '../Services/Booking/booking.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;  

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private bookingService: BookingService) {}

  ngOnInit(): void{
    this.getEvent();
  }

  getEvent(): void{
    this.bookingService.getAllBooking()
      .subscribe(response => {
        for ( const item of response)
        {
          const event: CalendarEvent = {
            start: new Date(item.from),
            end: new Date(item.to),
            title: format(new Date(item.from), 'H:mm') + ' ' + item.memberName,
            color: colors.red,
            actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          };

          this.events.push(event);
        }
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  // roomID: number;
  // From: string;
  // To: string;

  // Booking: Booking;
  // Rooms: Room[];

  // constructor(private bookingService: BookingService, private roomService: RoomService, private ref: ElementRef, private router: Router,
  //             private messageService: MessageService) { }

  // ngOnInit(): void {
  //   this.setInputWidth();
  //   this.getRoom();
  // }

  // setInputWidth(): void{
  //   const dpDatePicker = this.ref.nativeElement.querySelectorAll('mat-form-field');
  //   for (const item of dpDatePicker){
  //     item.style.width = '45%';
  //   }
  // }

  // getRoom(): void{
  //   this.roomService.getRoom()
  //     .subscribe(result => this.Rooms = result);
  // }

  // CreateBooking(): void{
  //   this.messageService.clearAll();
  //   if (this.Validate()) {
  //     this.Booking = {roomID: this.roomID, from: this.From, to: this.To};
  //     this.bookingService.createBooking(this.Booking)
  //     .subscribe(result => {
  //       localStorage.setItem('flash_message', 'Booking Created');
  //       this.router.navigate(['/booking']);
  //     },
  //     error => {this.messageService.add({type: 'danger', content: error.error}); });
  //   }
  // }

  // private Validate(): boolean{
  //   let isValid = true;

  //   if (this.roomID == null){
  //     this.messageService.add({type: 'danger', content: 'Please Select a Room'});
  //     isValid = false;
  //   }

  //   if (this.From == null || this.To == null) {
  //     this.messageService.add({type: 'danger', content: 'Please Select Time'});
  //     isValid = false;
  //   }

  //   if (this.From >= this.To) {
  //     this.messageService.add({type: 'danger', content: 'Time is not Valid'});
  //     isValid = false;
  //   }

  //   return isValid;
  // }

}
