import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
export class SingleProductComponent implements OnInit, AfterViewInit {
  selectedVariant: Product;
  chosenQuantity = 1;
  colorVariants: Product [] = [];
  product: Product = new Product;
  pluginsInited = false;
  private id: string;
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (typeof this.product.id === 'undefined') {
        this.renderProduct();
      } else {
        let result = this.colorVariants.find(obj => {
          return obj.id === this.selectedVariant.id;
        });
        this.product = result;
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id, this.chosenQuantity);
  }

  addToWishlist(product: Product) {
    this.cartService.addToWishlist(product.id);
  }

  private renderProduct() {
    this.loadProduct();
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
      }
    );
  }

  onColorChange() {
    // this.router.navigate(['/product',  this.selectedVariant.id], { relativeTo: this.route });
    window.location.href = "/product/" + this.selectedVariant.id;
  }

  updateQuantity(value: any) {
    this.chosenQuantity = parseInt(value, 10);
  }

  ready(isReady: boolean) {
    if (isReady && !this.pluginsInited) {
      this.pluginsInited = true;
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

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
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
  }

}
