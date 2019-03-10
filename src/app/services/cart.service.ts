import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Cart} from "../models/cart";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(productId: number, qty: number) {
    if (!qty) {
      qty = 1;
    }
    return this.http.post(`${environment.apiUrl}/cart/add-to-cart`, { productId : productId, quantity: qty });
  }

  addToWishlist(productId: number) {
    return this.http.post(`${environment.apiUrl}/cart/add-to-wishlist`, { productId : productId });
  }

  getUserCart() {
    return this.http.get(`${environment.apiUrl}/cart/get-user-cart`)
      .pipe(map((res: any) => deserialize<Cart[]>(Cart, res)));
  }
}
