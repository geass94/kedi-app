import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {deserialize} from "serializer.ts/Serializer";
import {Menu} from "../../../models/menu";
import {MenuService} from "../../../services/menu.service";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {CartService} from "../../../services/cart.service";
declare var jQuery: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  products: Product[];
  sideBar: Menu = new Menu;
  maxPrice = 0;
  minPrice = 0;
  private allProducts: Product[];

  constructor(
    private productService: ProductService,
    private menuService: MenuService,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.loggedUser = this.userService.loadProfile();
  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (res) => {
      this.products = deserialize<Product[]>(Product, res);
      },
      (err) => {

      },
      () => {
        this.maxPrice = Math.max.apply(null, this.products.map(function(item) {
          return item.price;
        }));

        this.minPrice = Math.min.apply(null, this.products.map(function(item) {
          return item.price;
        }));

        this.allProducts = this.products;

        this.initPriceSlider();
      });

    this.menuService.getSideBar().subscribe(res => {
      this.sideBar = deserialize<Menu>(Menu, res);
    }).unsubscribe();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id).subscribe();
  }


  private initPriceSlider() {
    jQuery( "#slider-range" ).slider({
      range: true,
      min: this.minPrice,
      max: this.maxPrice,
      values: [ this.minPrice, this.maxPrice ],
      slide: ( event, ui ) => {
        jQuery( "#amount" ).val( "" + ui.values[ 0 ] + " -- " + ui.values[ 1 ] );
        this.filterProductsByPriceRange(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });
    jQuery( "#amount" ).val( "" + jQuery( "#slider-range" ).slider( "values", 0 ) +
      " -- " + jQuery( "#slider-range" ).slider( "values", 1 ) );
  }

  private filterProductsByPriceRange(min, max) {
    this.products = this.allProducts.filter(e => e.price >= min && e.price <= max);
  }

  priceSliderOnChange(v: any) {
    let arr = v.split(" -- ");
    this.minPrice = parseFloat(arr[0]);
    this.maxPrice = parseFloat(arr[1]);
    jQuery( "#slider-range" ).slider({
      min: this.minPrice,
      max: this.maxPrice,
    });
    this.filterProductsByPriceRange(this.minPrice, this.maxPrice);
  }

  ngAfterViewInit() {

  }

}
