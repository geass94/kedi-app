import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {deserialize} from "serializer.ts/Serializer";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {CartService} from "../../../services/cart.service";
declare var jQuery: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SingleProductComponent implements OnInit {
  colorVariants: Product [] = [];
  product: Product = new Product;
  private id: string;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.product = new Product();

      this.id = params.get('id');

      this.loadProduct();
    });
  }

  private loadProduct() {
    this.productService.getProduct(parseInt(this.id, 10)).subscribe((res) => {
        this.product = deserialize<Product>(Product, res);
      },
      (error) => {

      },
      () => {
        if (this.colorVariants.length === 0) {
          this.productService.getProductVariants(this.product.productVariantIds).subscribe(res => {
            this.colorVariants = deserialize<Product[]>(Product, res);
          });
        }
        console.log(this.colorVariants)
      }
    );
  }

}
