import { Component, OnInit } from '@angular/core';
import { RoomService } from '../Services/Room/room.service';
import { Router } from '@angular/router';
import { MessageService } from '../Services/Message/message.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {
  roomName: string;
  constructor(private roomService: RoomService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  CreateRoom(): void{
    if (this.Validate()) {
      this.roomService.createRoom(this.roomName)
        .subscribe(result => {
          console.log(result);
          this.router.navigate(['/room']);
        });
    }
  }

  Validate(): boolean{
    if (this.roomName == null || this.roomName === '') {
      this.messageService.add({type: 'danger', content: 'Please input Room Name'});
      return false;
    }

    return true;
  }
}
