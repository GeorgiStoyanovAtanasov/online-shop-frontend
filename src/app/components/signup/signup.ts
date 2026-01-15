import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit, AfterViewInit {
  signupForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  private apiUrl = 'https://localhost:8443/auth/register/user';
  private googleSignupUrl = 'https://localhost:8443/auth/google/signup';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngAfterViewInit(): void {
    // Initialize Google signup button
    (window as any).google.accounts.id.initialize({
      client_id: '481741861938-agfg3vmr83pib9ne6gcsitt8oaquur36.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleSignup(response.credential)
    });

    (window as any).google.accounts.id.renderButton(
      document.getElementById('google-signup-btn'),
      { theme: 'outline', size: 'large', text: 'signup_with' }
    );
  }

  signup() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fix the errors before submitting.';
      return;
    }

    const body = this.signupForm.value;

    this.http.post<boolean>(this.apiUrl, body).subscribe({
      next: (result) => {
        if (result) {
          this.successMessage = 'Registration successful! You can now log in.';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        } else {
          this.errorMessage = 'Email already exists!';
        }
      },
      error: () => this.errorMessage = 'Something went wrong. Please try again.'
    });
  }

  private handleGoogleSignup(idToken: string) {
    this.http.post<{ accessToken: string; name: string }>(this.googleSignupUrl, { token: idToken })
      .subscribe({
        next: (res) => {
          this.successMessage = `Welcome, ${res.name}! Your account has been created.`;
          // Save JWT in localStorage or AuthService
          localStorage.setItem('token', res.accessToken);
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          console.error('Google signup failed', err);
          this.errorMessage = err.error || 'Google signup failed. Try again.';
        }
      });
  }

  // convenience getter for easy access to form fields in template
  get f() {
    return this.signupForm.controls;
  }
}