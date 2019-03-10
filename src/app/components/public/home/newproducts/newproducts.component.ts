import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user";
import {Product} from "../../../../models/product";
import {ProductService} from "../../../../services/product.service";
import {UserService} from "../../../../services/user.service";
import {CartService} from "../../../../services/cart.service";
import {deserialize} from "serializer.ts/Serializer";
declare var jQuery: any;

@Component({
  selector: 'app-newproducts',
  templateUrl: './newproducts.component.html',
  styleUrls: ['./newproducts.component.css']
})
export class NewproductsComponent implements OnInit {

  loggedUser: User;
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.loggedUser = userService.loadProfile();
  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
  }

  ngOnInit() {

    this.productService.getNewProducts().subscribe(res => {
      this.products = deserialize<Product[]>(Product, res);
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id, 1).subscribe((res) => {
      console.log(res);
    });
  }

  initCarousel() {
    if (this.products.length > 0) {
      jQuery(".features-home2-slider-2").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 4,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 2],
        itemsTablet: [768, 1],
        itemsMobile : [479, 1],
      });
    }
  }

}
