import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserDTO {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:8443';
  username$ = new BehaviorSubject<string | null>(null);
  
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/by-email/${email}`);
  }

  setUsername(username: string | null) {
    this.username$.next(username);
  }

  getRoles(token: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/users/roles?token=${token}`);
  }
}