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
import {LeaveComponent} from './leave-request/leave.component';
import {CreateLeaveRequestComponent} from './create-leave-request/createleave.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { uk_UA } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarComponent } from './calendar/component';

import * as moment from 'moment';

/*
export function momentAdapterFactory() {
  return adapterFactory(moment);
}
*/

registerLocaleData(uk);
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

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
    CustomFormatDate,
    LeaveComponent,
    CreateLeaveRequestComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    FlatpickrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['example.com'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
    FormsModule,
    MatFormFieldModule,
    NgbModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatRadioModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    /*
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    */
    CommonModule,
    FormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
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
    },
    { provide: NZ_I18N, useValue: uk_UA }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
