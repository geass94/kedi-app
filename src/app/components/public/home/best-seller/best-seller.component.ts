import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from "../../../../models/product";
import {ProductService} from "../../../../services/product.service";
import {CartService} from "../../../../services/cart.service";
declare var jQuery: any;

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BestSellerComponent implements OnInit {
  bestSale: Product = null;
  bestSales: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getBestSales().subscribe(
      res => {
        this.bestSales = res;
      },
      err => {

      },
      () => {
        this.bestSale = this.bestSales[0];
        this.bestSales.shift();
      }
    );
  }

  getNewPrice(p: Product): number {
    return p.price - (p.price * p.sale / 100);
  }

  getTimeLeft(date: string) {
   // return new moment.format(date)
  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
  }

  initCarousel() {
    jQuery(".sell-area .sell-slider").owlCarousel({
      autoPlay: true,
      slideSpeed: 2000,
      pagination: false,
      navigation: false,
      items : 4,
      itemsDesktop : [1199, 4],
      itemsDesktopSmall : [1100, 3],
      itemsTablet: [768, 2],
      itemsMobile : [479, 1],
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id, 1);
  }

}
