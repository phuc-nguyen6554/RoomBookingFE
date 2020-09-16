import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuardService } from './Services/AuthGuard/auth-guard.service';
import { CreatebookingComponent } from './createbooking/createbooking.component';
import { LoggedinService } from './Services/LoggedIn/loggedin.service';
import { RoomComponent } from './room/room.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import {LeaveComponent} from './leave-request/leave.component';
import {CreateLeaveRequestComponent} from './create-leave-request/createleave.component';

let routes: Routes;
routes = [
  {path: '', redirectTo: '/booking', pathMatch: 'full'},
  {path: 'login', component: SigninComponent, canActivate: [LoggedinService]},

  // Book
  {path: 'booking', component: BookingComponent, canActivate: [AuthGuardService]},
  {path: 'booking-create', component: CreatebookingComponent, canActivate: [AuthGuardService]},

  // Leave request
  {path: 'leave-request', component: LeaveComponent, canActivate: [AuthGuardService]},
  {path: 'leave-request-create', component: CreateLeaveRequestComponent, canActivate: [AuthGuardService]},

  // Room
  {path: 'room', component: RoomComponent, canActivate: [AuthGuardService]},
  {path: 'room-create', component: RoomCreateComponent, canActivate: [AuthGuardService]},

  // Welcome
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
