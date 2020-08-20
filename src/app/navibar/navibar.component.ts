import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit {

  username: string;
  avatar: string;

  Claimtypes = {
    Name: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    Avatar : 'Avatar'
  };

  constructor(private jwtHelper: JwtHelperService, private authService: SocialAuthService, private router: Router) { }

  ngOnInit(): void {
    const decode = this.jwtHelper.decodeToken();
    this.username = decode[this.Claimtypes.Name];
    this.avatar = decode[this.Claimtypes.Avatar];
  }

  logout(): void{
    localStorage.removeItem('JWT_token');
    this.authService.signOut()
      .catch(error => {
        console.log(error);
      });
    this.router.navigate(['/login']);
  }
}
