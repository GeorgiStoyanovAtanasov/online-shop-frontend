import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthServiceForJwt } from '../services/auth-service-for-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthServiceForJwt,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const now = Date.now() / 1000; // current time in seconds

        if (decoded.exp && decoded.exp < now) {
          // Token expired — log out and stop request
          console.warn('Token expired — logging out');
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(() => new Error('Token expired'));
        }

        // Token valid — attach it to the request
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(cloned);

      } catch (e) {
        console.error('Invalid token detected — logging out', e);
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError(() => new Error('Invalid token'));
      }
    }

    return next.handle(req);
  }
}
