import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user";
import {Product} from "../../../../models/product";
import {ProductService} from "../../../../services/product.service";
import {UserService} from "../../../../services/user.service";
import {CartService} from "../../../../services/cart.service";
import {deserialize} from "serializer.ts/Serializer";
declare var jQuery: any;

@Component({
  selector: 'app-saleoff',
  templateUrl: './saleoff.component.html',
  styleUrls: ['./saleoff.component.css']
})
export class SaleoffComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
  }

  ngOnInit() {

    this.productService.getSaleOff().subscribe(res => {
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
      jQuery(".sell-off-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: false,
        items : 4,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 1],
      });
    }
  }

}
