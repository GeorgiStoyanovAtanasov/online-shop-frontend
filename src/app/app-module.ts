import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { ProductList } from './components/product-list/product-list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product-service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { Search } from './components/search/search';
import { ProductDetails } from './components/product-details/product-details';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartStatus } from './components/cart-status/cart-status';
import { CartDetails } from './components/cart-details/cart-details';
import { Checkout } from './components/checkout/checkout';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { App } from './app';
//import { AuthGuard, AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
//import authConfig from './config/auth-config';
//import { AuthInterceptor } from './services/auth-interceptor';
//import { LoginStatus } from './components/login-status/login-status';
//import { Signup } from './components/signup/signup'

const routes: Routes = [
  {path: 'checkout', component: Checkout},
  {path: 'cart-details', component: CartDetails},
  {path: 'products/:id', component: ProductDetails},
  {path: 'search/:keyword', component: ProductList},
  {path: 'category/:id', component: ProductList},
  {path: 'category', component: ProductList},
  {path: 'products', component: ProductList},
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
//  {path: 'signup', component: Signup },

// example implementation for protected routes
// { path: 'shop', component: ShopComponent },
  //{ path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  //{ path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] }
]
@NgModule({
  declarations: [
    App,
    ProductList,
    ProductCategoryMenu,
    Search,
    ProductDetails,
    CartStatus,
    CartDetails,
    Checkout,
    Login,
    Signup
    //LoginStatus,
//    Signup
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    //AuthModule.forRoot(authConfig),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    ProductService,
    //{
    //  provide: HTTP_INTERCEPTORS,
     // useClass: AuthHttpInterceptor,
     // multi: true,
    //},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [App]
})
export class AppModule { }
