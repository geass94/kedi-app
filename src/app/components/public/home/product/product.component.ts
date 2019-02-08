import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../../services/product.service";
import {Product} from "../../../../models/product";
import {deserialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productsResponse: Product[] = [];
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
      this.productsResponse = deserialize<Product[]>(Product, res);

      for (let i = 0; i < this.productsResponse.length; i++) {
          if (i % 2 === 0) {
            const toPush: Product[] = [
              this.productsResponse[i],
              this.productsResponse[i + 1]
            ];
            this.products.push( deserialize(Product, toPush) );
          }
      }
      console.log(this.products);
    });
  }

}
