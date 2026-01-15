// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthServiceForJwt } from '../services/auth-service-for-jwt';
import { UserService } from '../services/user-service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceForJwt, private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const currentRoute = route.routeConfig?.path;

    if (currentRoute === 'orders' || currentRoute === 'checkout') {
      return this.userService.getRoles(token).pipe(
        map(roles => {
          if (roles.includes('USER') || roles.includes('ADMIN')) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    }

    return true;
  }
}
