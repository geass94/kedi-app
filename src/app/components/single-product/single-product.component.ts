import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {deserialize} from "serializer.ts/Serializer";
declare var jQuery: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SingleProductComponent implements OnInit, AfterViewInit {
  product: Product = new Product;
  private id = this.route.snapshot.paramMap.get("id") ;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProduct(parseInt(this.id)).subscribe(res => {
      this.product = deserialize<Product>(Product, res);
    });
  }


  ready(isReady: boolean) {
    console.log("modis")
    if (isReady) {
      jQuery(".product-page-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 5,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 2],
      });
    }
  }

  ngAfterViewInit() {
    jQuery(".product-slider").owlCarousel({
      autoPlay: false,
      slideSpeed: 2000,
      pagination: false,
      navigation: false,
      items : 3,
      itemsDesktop : [1199, 3],
      itemsDesktopSmall : [980, 3],
      itemsTablet: [768, 2],
      itemsMobile : [479, 1],
    });

    jQuery(".upsell-slider").owlCarousel({
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
    jQuery(".optima_zoom").elevateZoom({
      gallery: 'optima_gallery',
      cursor: 'pointer',
      galleryActiveClass: "active",
      imageCrossfade: true,
      loadingIcon: ""
    });
    jQuery(".optima_zoom").bind("click", function(e) {
      var ez =   jQuery('.optima_zoom').data('elevateZoom');
      ez.closeAll(); // NEW: This function force hides the lens, tint and window
      jQuery.fancybox(ez.getGalleryList());
      return false;
    });
  }

}
