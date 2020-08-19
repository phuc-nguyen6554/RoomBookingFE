import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { CreatebookingComponent } from './createbooking/createbooking.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'booking', component: BookingComponent , canActivate: [AuthGuardService]},
  { path: 'booking-create', component: CreatebookingComponent , canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }