import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../Services/LeaveRequest/leave.service';
import { Router } from '@angular/router';
import {Leave} from '../Models/Leave';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  leaves: Leave[];
  message: any;

  constructor(private leaveService: LeaveService, private router: Router) {}

  ngOnInit(): void {
    this.getAllLeave();
    if (localStorage.getItem('flash_message') != null) {
      this.message = {type: 'success', message: localStorage.getItem('flash_message')};
      localStorage.removeItem('flash_message');
    }
  }

  getAllLeave(): void{
    this.leaveService.getAllLeave()
      .subscribe(result => {this.leaves = result; console.log(result); });
  }

  delete(id: number): void {
    this.leaveService.deleteBooking(id)
      .subscribe(result => {
        console.log(result.body);
        this.leaves = this.leaves.filter(value => {
          return value.id !== id;
        });
        this.message = {type: 'success', message: 'Delete Success'};
      },
      error => {
        this.message = {type: 'danger', message: error.error};
      },
      () => {}
      );
  }

  close(): void{
    this.message = null;
  }

}
