import { Component, OnInit } from '@angular/core';
import {Room} from '../Models/Room';
import { RoomService } from '../Services/Room/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  rooms: Room[];
  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void{
    this.roomService.getRoom()
      .subscribe(result => {
        this.rooms = result;
      });
  }

  // I will do it later
  // Delete(id: number): void{
  //   this.roomService.deleteRoom(id)
  //     .subscribe(result => {
  //         this.rooms = this.rooms.filter(value => {
  //           return value.id !== result.id;
  //         });
  //     });
  // }

}
