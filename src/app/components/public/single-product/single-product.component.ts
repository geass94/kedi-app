import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {deserialize} from "serializer.ts/Serializer";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
declare var jQuery: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SingleProductComponent implements OnInit, AfterViewInit {
  selectedVariant: Product;
  colorVariants: Product [] = [];
  product: Product = new Product;
  private id: string;
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.loadProduct();
    });
  }

  private loadProduct() {
    this.productService.getProduct(parseInt(this.id)).subscribe((res) => {
        this.product = deserialize<Product>(Product, res);
      },
      (error) => {

      },
      () => {
        if (this.colorVariants.length === 0){
          this.productService.getProductVariants(this.product.productVariantIds).subscribe(res => {
            this.colorVariants = deserialize<Product[]>(Product, res);
          });
        }
      }
    );
  }

  onColorChange() {
    this.router.navigate(['/product',  this.selectedVariant.id], { relativeTo: this.route });
  }

  ready(isReady: boolean) {
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
