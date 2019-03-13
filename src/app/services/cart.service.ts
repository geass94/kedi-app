import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Cart} from "../models/cart";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";
import {BehaviorSubject, Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
    this.getUserCart();
  }

  public shoppingCart = new Subject();

  addToCart(productId: number, qty: number) {
    if (!qty) {
      qty = 1;
    }
    this.http.post(`${environment.apiUrl}/cart/add-to-cart`, { productId : productId, quantity: qty }).subscribe(res => {
      let item = deserialize<Cart>(Cart, res);
      console.log(item);
      this.shoppingCart.next( item );
    });

  }

  addToWishlist(productId: number) {
    return this.http.post(`${environment.apiUrl}/cart/add-to-wishlist`, { productId : productId });
  }

  private getUserCart() {
    this.http.get(`${environment.apiUrl}/cart/get-user-cart`)
      .pipe(map((res: any) => deserialize<Cart[]>(Cart, res))).subscribe(res => {
        res.forEach(c => {
           this.shoppingCart.next( c );
        });
      });
  }
}
