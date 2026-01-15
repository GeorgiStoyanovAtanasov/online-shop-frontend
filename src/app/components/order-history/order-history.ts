import { Component, OnInit } from '@angular/core';
import { OrderHistoryDTO } from '../../common/order-history-dto';
import { OrderHistoryService } from '../../services/order-history-service';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistory implements OnInit {

  orders: OrderHistoryDTO[] = [];

  constructor(private orderService: OrderHistoryService) { }

  ngOnInit(): void {
    this.orderService.getOrdersForUser().subscribe({
      next: (data) => {
        // Sort by dateCreated descending (newest first)
        this.orders = data.sort((a, b) => {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        });
      },
      error: (err) => console.error(err)
    });
  }
}