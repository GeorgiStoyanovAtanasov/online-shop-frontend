// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceForJwt } from '../services/auth-service-for-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceForJwt, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
