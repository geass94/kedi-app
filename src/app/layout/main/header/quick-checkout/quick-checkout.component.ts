import { Component, OnInit } from '@angular/core';
import {Cart} from "../../../../models/cart";
import {CartService} from "../../../../services/cart.service";
import {deserialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-quick-checkout',
  templateUrl: './quick-checkout.component.html',
  styleUrls: ['./quick-checkout.component.css']
})
export class QuickCheckoutComponent implements OnInit {
  shoppinCart: Cart[] = [];
  subtotal = 0;
  itemsInCart = 0;
  constructor(private cartService: CartService) {
    console.log("quick");
  }

  ngOnInit() {
    this.cartService.shoppingCart.subscribe( data => {
      let item = deserialize<Cart>(Cart, data);
      if (item.savedForLater === false && item.wishlist === false) {
        this.shoppinCart.push( item );
        this.countSubtotal();
        this.itemsInCart = this.shoppinCart.length;
      }
    });

    this.cartService.deleteListener.subscribe(res => {
      console.log("quick cart: ", res);
      this.shoppinCart.splice(this.shoppinCart.indexOf( this.shoppinCart.find(c => c.id === res) ), 1);
      this.countSubtotal();
      this.itemsInCart = this.shoppinCart.length;
    });
  }

  private countSubtotal() {
    this.shoppinCart.forEach(item => {
      if (item.product.bundle !== null) {
        this.subtotal += (item.product.bundle.price - (item.product.bundle.price * item.product.bundle.sale / 100)) * item.quantity;
      } else {
        this.subtotal += (item.product.price - (item.product.price * item.product.sale / 100)) * item.quantity;
      }
    });
  }
}
