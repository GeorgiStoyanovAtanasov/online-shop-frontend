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
  private apiUrl = 'http://localhost:8080';
  username$ = new BehaviorSubject<string | null>(null);
  
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/by-email/${email}`);
  }

  setUsername(username: string | null) {
    this.username$.next(username);
  }
}