import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Cart} from "../../../models/cart";
import {CartService} from "../../../services/cart.service";
import {deserialize} from "serializer.ts/Serializer";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  isLoggedIn = false;
  cartItems: Cart[] = [];
  subtotal = 0;
  constructor(private authService: AuthenticationService, private cartService: CartService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    console.log("Inited: ", "Cart");
    this.cartService.getUserCart().subscribe( data => {
      console.log("Cart data loaded: ", data)
      this.cartItems = data;
      this.countSubtotal();
    });

    this.cartService.deleteListener.subscribe(res => {
      // console.log("cart: ", res)
      this.cartItems.splice(this.cartItems.indexOf( this.cartItems.find(c => c.id === res)), 1);
    });
  }

  removeFromCart(cart: Cart) {
    this.cartService.removeFromCart(cart.id);
  }

  moveToWishlist(cart: Cart) {
    // console.log(cart);
  }

  saveForLater(cart: Cart) {
    // console.log(cart);
  }

  private countSubtotal() {
    this.cartItems.forEach(item => {
      this.subtotal += (item.product.price - (item.product.price * item.product.sale / 100)) * item.quantity;
    });
  }

  itemUnitPrice(item: Cart): number {
    return (item.product.price - (item.product.price * item.product.sale / 100));
  }

  itemSubotal(item: Cart): number {
    let itemSubtotal = 0;
    itemSubtotal += (item.product.price - (item.product.price * item.product.sale / 100)) * item.quantity;
    return itemSubtotal;
  }

}
