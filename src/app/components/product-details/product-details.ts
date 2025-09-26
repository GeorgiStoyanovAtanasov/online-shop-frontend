import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { Cart } from '../../services/cart';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit{

  product!: Product;

  constructor(private productService: ProductService, 
    private cartService: Cart,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    // get the "id" parameter string
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
    
  }

}
