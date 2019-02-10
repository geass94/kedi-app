import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductService} from "../../../../services/product.service";
import {Product} from "../../../../models/product";
import {deserialize} from "serializer.ts/Serializer";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {CartService} from "../../../../services/cart.service";
declare var jQuery: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  productsResponse: Product[] = [];
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

    this.productService.getProducts().subscribe(res => {
      this.productsResponse = deserialize<Product[]>(Product, res);

      for (let i = 0; i < this.productsResponse.length; i++) {
          if (i % 2 === 0) {
            let toPush: Product[] = [];
            if (typeof this.productsResponse[i] !== 'undefined') {
              toPush.push(this.productsResponse[i]);
            }
            if (typeof this.productsResponse[i + 1] !== 'undefined') {
              toPush.push(this.productsResponse[i + 1]);
            }
            this.products.push( deserialize(Product, toPush) );
          }
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id).subscribe((res) => {
      console.log(res);
    });
  }

  initCarousel() {
    if (this.products.length > 0) {
      jQuery(".features-home2-slider").owlCarousel({
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

  ngAfterViewInit() {

  }

}
