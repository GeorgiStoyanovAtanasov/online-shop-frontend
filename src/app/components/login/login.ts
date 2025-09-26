declare const gapi: any;
import { Component, OnInit } from '@angular/core';
import { AuthServiceForJwt } from '../../services/auth-service-for-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthService } from '../../services/google-auth-service';
import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit{
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthServiceForJwt, private router: Router, private http: HttpClient, private googleAuth: GoogleAuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => this.errorMessage = 'Invalid email or password'
    });
  }

  ngAfterViewInit() {
  this.googleAuth.initGoogleSignIn('login', () => {
    this.router.navigate(['/products']);
  });
  this.googleAuth.renderButton('google-login-btn', 'signin_with');

  this.googleAuth.initGoogleSignIn('signup', () => {
    this.router.navigate(['/products']);
  });
  this.googleAuth.renderButton('google-signup-btn', 'signup_with');
}

}