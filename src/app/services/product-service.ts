import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/products';
  
  private categoryUrl = 'http://localhost:8080/categories';

  constructor(private httpClient: HttpClient) { }

  // ✅ Used in ProductDetails
  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl); // Single product, not paginated
  }

 // With category
getProductsListPaginated(categoryId: number, page: number, size: number): Observable<any> {
  const searchUrl = `${this.baseUrl}/category/${categoryId}?page=${page}&size=${size}`;
  return this.httpClient.get<any>(searchUrl);
}

  // Without category (default)
getProductsListDefaultPaginated(page: number, size: number): Observable<any> {
  const url = `${this.baseUrl}?page=${page}&size=${size}`;
  return this.httpClient.get<any>(url);
}

  searchProductsPaginated(keyword: string, page: number, size: number): Observable<any> {
  const searchUrl = `${this.baseUrl}/search?name=${keyword}&page=${page}&size=${size}`;
  return this.httpClient.get<any>(searchUrl);
}

   
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);  // <-- IMPLEMENTED
  }
}