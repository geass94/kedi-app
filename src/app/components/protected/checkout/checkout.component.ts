import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Address} from "../../../models/address";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {CartService} from "../../../services/cart.service";
import {Cart} from "../../../models/cart";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/order";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit {
  user: User;
  isLoggedIn = false;
  shippingAddress: Address;
  cartItems: Cart[] = [];
  subtotal = 0;
  steps = {
    step1: false,
    step2: false,
    step3: false
  };
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  step4Form: FormGroup;
  private order: Order;
  constructor(private authService: AuthenticationService,
              private cartService: CartService,
              private orderService: OrderService,
              private userService: UserService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.user = this.userService.loadProfile();
      this.initStep1Form();
      this.cartService.shoppingCart.subscribe(data => {
        let item = deserialize<Cart>(Cart, data);
        if (item.savedForLater === false && item.wishlist === false) {
          this.cartItems.push( item );
          this.countSubtotal();
        }
      });

  }

  private initStep1Form(): void {
    // console.log(this.user)
    this.step1Form = new FormGroup({
      'firstName': new FormControl(this.user.personalInformation.firstName, Validators.nullValidator),
      'lastName': new FormControl(this.user.personalInformation.lastName, Validators.nullValidator),
      'email': new FormControl(this.user.email, Validators.nullValidator),
      'phone': new FormControl(this.user.personalInformation.phone, Validators.nullValidator),
      'company': new FormControl(this.user.personalInformation.company, Validators.nullValidator),
      'address1': new FormControl(this.user.personalInformation.address1, Validators.nullValidator),
      'address2': new FormControl(this.user.personalInformation.address2, Validators.nullValidator),
      'city': new FormControl(this.user.personalInformation.city, Validators.nullValidator),
      'postCode': new FormControl(this.user.personalInformation.postCode, Validators.nullValidator),
      'country': new FormControl(this.user.personalInformation.country, Validators.nullValidator),
      'state': new FormControl(this.user.personalInformation.state, Validators.nullValidator),
    });

    this.steps.step1 = true;
    this.initStep2Form();
  }

  private initStep2Form(): void {
    this.step2Form = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'company': new FormControl(null, Validators.required),
      'address1': new FormControl(null, Validators.required),
      'address2': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'postCode': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
    });
  }

  onForm2Submit() {
    const form = this.step2Form;
    if (form.valid) {
      let toSubmit: Address = deserialize<Address>(Address, serialize(form.value));
      this.shippingAddress = toSubmit;
      this.steps.step2 = true;
    }
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

  placeOrder() {
    const order = new Order();
    order.products = [];
    order.shippingAddress = this.shippingAddress;
    order.billingAddress = this.shippingAddress;
    this.cartItems.forEach(c => {
      order.products.push(c.product);
    });
    order.paymentMethod = "CARD";
    order.shippingMethod = "COURIER";
    this.orderService.placeOrder(order).subscribe(
      (res) => {
        this.order = deserialize<Order>(Order, res);
      },
      (err) => {

      },
      () => {
        this.orderService.initPayment(this.order);
      }
    );
  }

}
