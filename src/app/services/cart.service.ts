import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(productId: number) {
    return this.http.post(`${environment.apiUrl}/cart/add-to-cart`, { productId : productId });
  }

  addToWishlist(productId: number) {
    return this.http.post(`${environment.apiUrl}/cart/add-to-wishlist`, { productId : productId });
  }
}
