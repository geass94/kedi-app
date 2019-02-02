import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {deserialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product: Product = new Product;
  const id = this.route.snapshot.paramMap.get("id") ;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProduct(parseInt(this.id)).subscribe(res => {
      this.product = deserialize<Product>(Product, res);
    });
  }

}
