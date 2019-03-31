import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Cart} from "../models/cart";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";
import {BehaviorSubject, Subject} from "rxjs/index";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    console.log("Constructed", "CartService");
    if (this.authService.isLoggedIn()) {

      this.seedCartSubject();
    }
  }

  public shoppingCart = new Subject();
  public deleteListener = new Subject();

  addToCart(productId: number, qty: number) {
    if (!qty) {
      qty = 1;
    }
    this.http.post(`${environment.apiUrl}/cart/add-to-cart`, { productId : productId, quantity: qty }).subscribe(
      res => {
        let item = deserialize<Cart>(Cart, res);
        this.shoppingCart.next( item );
      },
      err => {

      },
      () => {
        // TODO
        window.location.href = "/cart";
      }
    );
  }

  removeFromCart(id: number) {
    this.http.delete(`${environment.apiUrl}/cart/remove-from-cart/${id}`).subscribe( res => {
      if (res === true) {
        this.deleteListener.next(id);
      }
    });
  }

  addToWishlist(productId: number) {
    return this.http.post(`${environment.apiUrl}/cart/add-to-wishlist`, { productId : productId });
  }

  getUserCart() {
    return this.http.get(`${environment.apiUrl}/cart/get-user-cart`)
      .pipe(map((res: any) => deserialize<Cart[]>(Cart, res)));
  }

  private seedCartSubject() {
    this.http.get(`${environment.apiUrl}/cart/get-user-cart`)
      .pipe(map((res: any) => deserialize<Cart[]>(Cart, res))).subscribe(res => {
        res.forEach(c => {
           this.shoppingCart.next( c );
        });
      });
  }
}
