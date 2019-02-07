import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {deserialize} from "serializer.ts/Serializer";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  constructor(
    private productService: ProductService
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
  }


}
