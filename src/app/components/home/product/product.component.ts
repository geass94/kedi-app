import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product";
import {deserialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService
  ) { }
  imgClass(i:number){
    if (i==0){
      return "primary-img";
    }
    else {
      return "secondary-img";
    }
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products.push(deserialize<Product>(Product, res));
    });
  }

}
