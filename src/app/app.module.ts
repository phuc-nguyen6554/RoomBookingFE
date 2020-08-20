import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BookingComponent } from './booking/booking.component';

import {GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import { JwtModule } from '@auth0/angular-jwt';
import { CreatebookingComponent } from './createbooking/createbooking.component';

import {FormsModule} from '@angular/forms';

import {DpDatePickerModule} from 'ng2-date-picker';
import { NavibarComponent } from './navibar/navibar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomComponent } from './room/room.component';
import { RoomCreateComponent } from './room-create/room-create.component';

export function tokenGetter(): string {
  return localStorage.getItem('JWT_token');
}
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    BookingComponent,
    CreatebookingComponent,
    NavibarComponent,
    RoomComponent,
    RoomCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
    FormsModule,
    DpDatePickerModule,
    NgbModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '635989203613-0nc2rmtndatd7o18q4d13f4p6hn45lls.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
