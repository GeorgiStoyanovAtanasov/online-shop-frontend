import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceForJwt } from './auth-service-for-jwt';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  constructor(private http: HttpClient, private authService: AuthServiceForJwt) { }

  initGoogleSignIn(mode: 'signup' | 'login', onSuccess?: () => void) {
  (window as any).google.accounts.id.initialize({
    client_id: '481741861938-agfg3vmr83pib9ne6gcsitt8oaquur36.apps.googleusercontent.com',
    callback: (response: any) => {
      const idToken = response.credential;

      this.http.post<{ accessToken: string; name: string }>(
        `http://localhost:8080/auth/google/${mode}`,
        { token: idToken }
      ).subscribe({
        next: res => {
          this.authService.setToken(res.accessToken, res.name);
          if (onSuccess) onSuccess();
        },
        error: err => {
          console.error(`Google ${mode} failed:`, err);
          alert("To Sign In First Create An Account");
        }
      });
    }
  });
}

renderButton(elementId: string, text: string) {
  (window as any).google.accounts.id.renderButton(
    document.getElementById(elementId),
    { theme: 'outline', size: 'large', text }
  );
}
}
