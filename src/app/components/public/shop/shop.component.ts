import {AfterViewInit, Component, OnInit} from '@angular/core';
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
    this.productService.getProducts().subscribe(res => {
      this.products = deserialize<Product[]>(Product, res);
    });

    this.menuService.getSideBar().subscribe(res => {
      this.sideBar = deserialize<Menu>(Menu, res);
    }).unsubscribe();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id).subscribe();
  }

  priceSliderOnChange(v: any) {
    console.log(v);
  }

  ngAfterViewInit() {
    jQuery( "#slider-range" ).slider({
      range: true,
      min: 100,
      max: 750,
      values: [ 100, 700 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "" + ui.values[ 0 ] + " -- " + ui.values[ 1 ] );
      }
    });
    jQuery( "#amount" ).val( "" + jQuery( "#slider-range" ).slider( "values", 0 ) +
      " -- " + jQuery( "#slider-range" ).slider( "values", 1 ) );
  }

}
