import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from "../../../../models/product";
import {CartService} from "../../../../services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductFile} from "../../../../models/product-file";
import {ProductService} from "../../../../services/product.service";
import {Size} from "../../../../models/size";
declare var jQuery: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  @Input()
  product: Product;
  pluginsInited = false;
  selectedVariant: Product;
  selectedSize: number;

  allFiles: ProductFile[] = [];


  @Input()
  colorVariants: Product [];
  availableColors: Product[] = [];
  availabelSizes: Size[] = [];


  chosenQuantity = 1;
  bundledProduct: Product[];
  constructor(private cartService: CartService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.selectedVariant = this.product;

    this.selectedVariant.productFiles.forEach(pf => {
      if (this.allFiles.indexOf(pf) === -1) {
        this.allFiles.unshift(pf);
      }
    });

    this.colorVariants.forEach(v => {
      if (this.availableColors.indexOf(v) === -1) {
        if (!this.availableColors.filter(ac => ac.color.id === v.color.id).length) {
          this.availableColors.push(v);
        }
      }
      if (this.availabelSizes.indexOf(v.size) === -1) {
        if (!this.availabelSizes.filter(ac => ac.id === v.size.id).length) {
          this.availabelSizes.push(v.size);
        }
      }
    });

    this.availableColors.forEach(v => {
      v.productFiles.forEach(f => {
        if (!this.allFiles.filter(af => af.name === f.name).length) {
          this.allFiles.push(f);
        }
      });
    });

    this.productService.getBundles(this.product.id).subscribe(
      res => {
        this.bundledProduct = res;
      }
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id, this.chosenQuantity);
  }

  addToWishlist(product: Product) {
    this.cartService.addToWishlist(product.id);
  }

  onColorChange(c) {
    this.router.navigate(['/product',  c], { relativeTo: this.route });
  }

  onSizeChange(s) {
    console.log(s);
    // this.router.navigate(['/product',  this.selectedVariant.id],
    //   {
    //           relativeTo: this.route ,
    //           queryParams: {
    //             size: s,
    //           }
    //         }
    //     );
  }

  updateQuantity(value: any) {
    this.chosenQuantity = parseInt(value, 10);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
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

}
