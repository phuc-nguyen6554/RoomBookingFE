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

import { NavibarComponent } from './navibar/navibar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomComponent } from './room/room.component';
import { RoomCreateComponent } from './room-create/room-create.component';

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './message/message.component';
import { CustomFormatDate } from './customPipe/FormatDate';

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
    RoomCreateComponent,
    MessageComponent,
    CustomFormatDate
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
    MatFormFieldModule,
    NgbModule,
    MatInputModule,
    BrowserAnimationsModule
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
