import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LeaveService } from '../Services/LeaveRequest/leave.service';
import { TypeService } from '../Services/LeaveRequest/type.service';
import { LeaveType } from '../Models/LeaveType';
import { Router } from '@angular/router';
import { MessageService } from '../Services/Message/message.service';


@Component({
  selector: 'app-create-leave-request',
  templateUrl: './createleave.component.html',
  styleUrls: ['./createleave.component.css']
})
export class CreateLeaveRequestComponent implements OnInit {
  leaveName: string;
  leaveDate: string;
  leaveReason: string;
  leaveTime: number;
  leaveType: number;
  LeaveType: LeaveType[];
  constructor(private leaveService: LeaveService, private typeService: TypeService, private ref: ElementRef, private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getType();
    this.setInputWidth();
  }

  getType(): void{
    this.typeService.getType()
      .subscribe(result => this.LeaveType = result);
  }

  setInputWidth(): void{
    const dpDatePicker = this.ref.nativeElement.querySelectorAll('mat-form-field');
    for (const item of dpDatePicker){
      item.style.width = '45%';
    }
  }

  CreatLeave(): void{
    this.messageService.clearAll();
    if (this.Validate()) {
      // tslint:disable-next-line:max-line-length
      const objPut = {name: this.leaveName, LeaveDates: this.leaveDate, LeaveTime: this.leaveTime, LeaveTypeId: this.leaveType, Reason: this.leaveReason};
      // @ts-ignore
      this.leaveService.createLeave(objPut)
      .subscribe(result => {
        localStorage.setItem('flash_message', 'Leave Request Created');
        this.router.navigate(['/leave-request']);
      },
      error => {this.messageService.add({type: 'danger', content: error.error}); });
    }
  }

  private Validate(): boolean{
    let isValid = true;

    if (this.leaveName == null){
      this.messageService.add({type: 'danger', content: 'Please Enter Leave Name'});
      isValid = false;
    }

    if (this.leaveReason == null){
      this.messageService.add({type: 'danger', content: 'Please Enter Reason'});
      isValid = false;
    }

    if (this.leaveDate == null) {
      this.messageService.add({type: 'danger', content: 'Please Select Leave Date'});
      isValid = false;
    }

    if (this.leaveTime == null) {
      this.messageService.add({type: 'danger', content: 'Please Select Leave Time'});
      isValid = false;
    }

    if (this.leaveType == null) {
      this.messageService.add({type: 'danger', content: 'Please Select Leave Type'});
      isValid = false;
    }

    return isValid;
  }

}
