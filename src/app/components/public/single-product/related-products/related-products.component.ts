import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../models/product";
import {ProductService} from "../../../../services/product.service";
declare var jQuery: any;

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {
  relatedProducts: Product[] = [];
  @Input()
  parentId: number;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getRelatedProducts(this.parentId).subscribe(res => {
      this.relatedProducts = res;
    });
  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
  }

  initCarousel() {
    if (this.relatedProducts.length > 0) {
      jQuery(".related-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 4,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 1],
      });
    }
  }

}
