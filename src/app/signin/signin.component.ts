import { Component, OnInit} from '@angular/core';
import { SigninService } from '../signin.service';
import {SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private signService: SigninService, private authService: SocialAuthService, private router: Router) { }
  auth2: any;
  ngOnInit(): void {}

  signinWithGoogle(): void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userdata => {
        this.signService.login(userdata.idToken)
          .subscribe(data => {
            localStorage.setItem('JWT_token', data.token);
            this.router.navigate(['booking']);
          });
      });
  }
}
