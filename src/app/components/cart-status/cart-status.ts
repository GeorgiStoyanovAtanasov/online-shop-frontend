import { Component, OnInit } from '@angular/core';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-cart-status',
  standalone: false,
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css'
})
export class CartStatus implements OnInit{

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: Cart){

  }
  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    
    // automatically update totalPrice when new cartItem is added
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // automatically update totalQuantity when new cartItem is added
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
