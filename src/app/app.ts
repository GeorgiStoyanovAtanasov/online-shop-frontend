import { Component, OnInit } from '@angular/core';
import { AuthServiceForJwt } from './services/auth-service-for-jwt';
import { jwtDecode } from 'jwt-decode';
import { UserDTO, UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  username: string | null = null;
  userEmail: string | null = null;

  constructor(
    public authService: AuthServiceForJwt,
    public userService: UserService
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000; // current time in seconds
      
    if (decoded.exp < now) {
      this.authService.logout();
      console.log('Token expired. Logging out...');
    }
      this.userEmail = decoded.sub;

      this.userService.getUserByEmail(this.userEmail as string).subscribe({
        next: (user: UserDTO) => {
          this.username = user.fullName;
          this.userService.setUsername(user.fullName);
        },
        error: () => {
          this.username = this.userEmail; // fallback to email if not found
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.username = null;
    this.userEmail = null;
  }
}
