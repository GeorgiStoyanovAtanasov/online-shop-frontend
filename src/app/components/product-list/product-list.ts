import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  // pagination properties
currentPage: number = 1;
pageSize: number = 20;
totalElements: number = 0;

  constructor(private productService: ProductService,
    private cartService: Cart,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
  const theKeyword: string = this.route.snapshot.paramMap.get("keyword")!;

  this.productService.searchProductsPaginated(theKeyword, this.currentPage - 1, this.pageSize)
    .subscribe(this.processPaginatedResponse());
}


  handleListProducts() {
  const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

  if (hasCategoryId) {
    this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    this.productService.getProductsListPaginated(this.currentCategoryId, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginatedResponse());
  } else {
    this.productService.getProductsListDefaultPaginated(this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginatedResponse());
  }
}

processPaginatedResponse() {
  return (data: any) => {
    this.products = data.content;
    this.currentPage = data.number + 1;
    this.pageSize = data.size;
    this.totalElements = data.totalElements;
  };
}

onPageChange(newPage: number) {
  if (newPage < 1 || newPage > this.getTotalPages()) return;
  this.currentPage = newPage;
  this.listProducts(); // Re-fetch with updated page
}

getTotalPages(): number {
  return Math.ceil(this.totalElements / this.pageSize);
}

changeNumberOfProducts() {
  this.currentPage = 1;
  this.listProducts();
}

getDisplayedPages(): number[] {
  const totalPages = this.getTotalPages();
  const pages: number[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (this.currentPage <= 3) {
      pages.push(1, 2, 3, 0, totalPages); // 0 = ellipsis
    } else if (this.currentPage >= totalPages - 2) {
      pages.push(1, 0, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, 0, this.currentPage - 1, this.currentPage, this.currentPage + 1, 0, totalPages);
    }
  }

  return pages;
}

addToCart(theProduct: Product){

  console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
  
  //TODO do the real work ...
  const theCartItem = new CartItem(theProduct);

  this.cartService.addToCart(theCartItem);
}

}
