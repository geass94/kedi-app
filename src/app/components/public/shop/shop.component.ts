import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {deserialize} from "serializer.ts/Serializer";
import {Menu} from "../../../models/menu";
import {MenuService} from "../../../services/menu.service";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  sideBar: Menu;
  constructor(
    private productService: ProductService,
    private menuService: MenuService
  ) { }
  imgClass(i: number) {
    if (i === 0) {
      return "primary-img";
    } else {
      return "secondary-img";
    }
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products.push(deserialize<Product>(Product, res));
    });
    this.menuService.getSideBar().subscribe(res => {
      this.sideBar = deserialize<Menu>(Menu, res);
      console.log(this.sideBar.categories);
    });
  }


}
