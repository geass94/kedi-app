import { Component, OnInit } from '@angular/core';
import {Cart} from "../../../../models/cart";
import {CartService} from "../../../../services/cart.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-quick-checkout',
  templateUrl: './quick-checkout.component.html',
  styleUrls: ['./quick-checkout.component.css']
})
export class QuickCheckoutComponent implements OnInit {
  shoppinCart: Cart[];
  subtotal = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getUserCart().subscribe(
      res => {
        this.shoppinCart = res;
      },
      err => {

      },
      () => {
        console.log(this.shoppinCart)
        this.countSubtotal();
      }
    );
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
