// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { UserService } from './user-service';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceForJwt {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'auth_token';

  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  username$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private userService: UserService) {}

  //login(email: string, password: string) {
   // return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
   //   .pipe(
    //    tap(response => {
    //      localStorage.setItem(this.tokenKey, response.token);
    //      this.isLoggedIn$.next(true);
    //    })
    //  );
  //}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.isLoggedIn$.next(true);

          // Decode token to get email
          const decoded: any = jwtDecode(response.token);
          const userEmail = decoded.sub;

          // Fetch user info
          this.userService.getUserByEmail(userEmail).subscribe({
            next: user => this.userService.setUsername(user.fullName),
            error: () => this.userService.setUsername(userEmail) // fallback
          });
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn$.next(false);
    this.userService.setUsername(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  setToken(token: string, name?: string) {
  localStorage.setItem(this.tokenKey, token);
  this.isLoggedIn$.next(true);

  const decoded: any = jwtDecode(token);
  const userEmail = decoded.sub;

  if (name) {
    // If backend sent the name (Google login)
    this.userService.setUsername(name);
  } else {
    // Fallback: fetch from DB like before
    this.userService.getUserByEmail(userEmail).subscribe({
      next: user => this.userService.setUsername(user.fullName),
      error: () => this.userService.setUsername(userEmail)
    });
  }
}
}
