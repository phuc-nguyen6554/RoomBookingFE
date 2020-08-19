import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtService : JwtHelperService) { }

  ValidateJWT(): boolean {
    //const jwt = localStorage.getItem('JWT_token');

    return !this.jwtService.isTokenExpired();
  }
}
