import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isCollapsed = false;
  isLogout = false;
  constructor(private jwtHelper: JwtHelperService, private authService: SocialAuthService, private router: Router) { }

  logout(): void{
    localStorage.removeItem('JWT_token');
    this.authService.signOut(true)
      .catch(error => {
        console.log(error);
      });
    this.router.navigate(['/login']);
  }

}
