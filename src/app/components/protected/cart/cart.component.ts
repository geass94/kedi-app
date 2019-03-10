import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Cart} from "../../../models/cart";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loggedUser: User;
  cartItems: Cart[];
  subtotal = 0;
  constructor(private userService: UserService, private cartService: CartService) {
    this.loggedUser = this.userService.loadProfile();
  }

  ngOnInit() {
    this.cartService.getUserCart().subscribe(
      (res) => {
        this.cartItems = res.filter(c => c.savedForLater === false && c.wishlist === false);
      },
      (err) => {

      },
      () => {
        this.countSubtotal();
      }
    );
  }

  removeFromCart(cart: Cart) {
    console.log(cart);
  }

  moveToWishlist(cart: Cart) {
    console.log(cart);
  }

  saveForLater(cart: Cart) {
    console.log(cart);
  }

  private countSubtotal() {
    this.cartItems.forEach(item => {
      if (item.product.bundle !== null) {
        this.subtotal += (item.product.bundle.price - (item.product.bundle.price * item.product.bundle.sale / 100)) * item.quantity;
      } else {
        this.subtotal += (item.product.price - (item.product.price * item.product.sale / 100)) * item.quantity;
      }
    });
  }

  itemUnitPrice(item: Cart): number {
    if (item.product.bundle !== null) {
      return (item.product.bundle.price - (item.product.bundle.price * item.product.bundle.sale / 100));
    } else {
      return (item.product.price - (item.product.price * item.product.sale / 100));
    }
  }

  itemSubotal(item: Cart): number {
    let itemSubtotal = 0;
    if (item.product.bundle !== null) {
      itemSubtotal += (item.product.bundle.price - (item.product.bundle.price * item.product.bundle.sale / 100)) * item.quantity;
    } else {
      itemSubtotal += (item.product.price - (item.product.price * item.product.sale / 100)) * item.quantity;
    }
    return itemSubtotal;
  }

}
