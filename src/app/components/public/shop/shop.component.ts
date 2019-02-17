import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {deserialize} from "serializer.ts/Serializer";
import {Menu} from "../../../models/menu";
import {MenuService} from "../../../services/menu.service";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  loggedUser: User;
  products: Product[];
  sideBar: Menu = new Menu;

  constructor(
    private productService: ProductService,
    private menuService: MenuService,
    private userService: UserService
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


}
