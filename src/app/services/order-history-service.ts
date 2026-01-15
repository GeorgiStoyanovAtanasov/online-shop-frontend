import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistoryDTO } from '../common/order-history-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  
private apiUrl = 'https://localhost:8443/orders'; // your backend endpoint

  constructor(private http: HttpClient) { }

  getOrdersForUser(): Observable<OrderHistoryDTO[]> {
    return this.http.get<OrderHistoryDTO[]>(this.apiUrl + "/user");
  }
}
