import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {deserialize} from "serializer.ts/Serializer";
import {Menu} from "../../../models/menu";
import {MenuService} from "../../../services/menu.service";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {CartService} from "../../../services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var jQuery: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  products: Product[];
  private allProducts: Product[];
  sideBar: Menu = new Menu;
  maxPrice = 0;
  minPrice = 0;
  filter = {
    changed: false,
    category: [],
    color: [],
    manufacturer: [],
    price: {
      priceMin: this.minPrice,
      priceMax: this.maxPrice
    }
  };

  constructor(
    private productService: ProductService,
    private menuService: MenuService,
    private userService: UserService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedUser = this.userService.loadProfile();
  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.applyFilterFromURL(params);
      this.filterProducts();
    });

    if (!this.filter.changed) {
      this.productService.getProducts().subscribe(
        (res) => {
          this.products = deserialize<Product[]>(Product, res);
        },
        (err) => {

        },
        () => {
          this.maxPrice = Math.max.apply(null, this.products.map(function(item) {
            return item.price;
          }));

          this.minPrice = Math.min.apply(null, this.products.map(function(item) {
            return item.price;
          }));

          this.filter.price.priceMax = this.maxPrice;
          this.filter.price.priceMin = this.minPrice;

          this.allProducts = this.products;

          this.initPriceSlider();
        }
      );
    }

    this.menuService.getSideBar().subscribe(res => {
      this.sideBar = deserialize<Menu>(Menu, res);
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id).subscribe();
  }


  private initPriceSlider() {
    jQuery( "#slider-range" ).slider({
      range: true,
      min: this.minPrice,
      max: this.maxPrice,
      values: [ this.minPrice, this.maxPrice ],
      slide: ( event, ui ) => {
        jQuery( "#amount" ).val( "" + ui.values[ 0 ] + " -- " + ui.values[ 1 ] );
        this.filterProductsByPriceRange(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });
    jQuery( "#amount" ).val( "" + jQuery( "#slider-range" ).slider( "values", 0 ) +
      " -- " + jQuery( "#slider-range" ).slider( "values", 1 ) );
  }

  private filterProductsByPriceRange(min, max) {
    // this.products = this.allProducts.filter(e => e.price >= min && e.price <= max);
    this.applyFilter({priceMin: min, priceMax: max});
  }

  priceSliderOnChange(v: any) {
    let arr = v.split(" -- ");
    this.minPrice = parseFloat(arr[0]);
    this.maxPrice = parseFloat(arr[1]);
    jQuery( "#slider-range" ).slider({
      min: this.minPrice,
      max: this.maxPrice,
    });
    this.filterProductsByPriceRange(this.minPrice, this.maxPrice);
  }

  applyFilterFromURL(p: any) {
    if (!p.keys.length) {
      this.filter.changed = false;
    } else {
      this.filter.changed = true;
      this.filter.category = p.getAll("category").map(value => parseInt(value, 10)) || [];
      this.filter.color = p.getAll("color").map(value => parseInt(value, 10)) || [];
      this.filter.manufacturer = p.getAll("manufacturer").map(value => parseInt(value, 10)) || [];
      this.filter.price.priceMax = parseFloat(p.get("max_price"));
      this.filter.price.priceMin = parseFloat(p.get("min_price"));
    }
  }

  applyFilter(p: any) {
    let keys = Object.keys(p);
    if (keys.length > 1) {
        this.filter.price.priceMin = p.priceMin;
        this.filter.price.priceMax = p.priceMax;
    } else {
      if (this.filter[keys[0]].indexOf(p[keys[0]]) === -1) {
        this.filter[keys[0]].push(p[keys[0]]);
      } else {
        this.filter[keys[0]].splice(this.filter[keys[0]].indexOf(p[keys[0]]), 1);
      }
    }
    this.navigateByFilter();
  }

  private navigateByFilter(): void {
    this.filter.changed = true;
    this.router.navigate(['/shop'], { queryParams: { category: this.filter.category,
      color: this.filter.color,
      manufacturer: this.filter.manufacturer,
      max_price: this.filter.price.priceMax,
      min_price: this.filter.price.priceMin} });
  }

  private filterProducts(): void {
    this.productService.getFilteredProducts(this.filter).subscribe(
      (res) => {
        this.products = deserialize<Product[]>(Product, res);
      },
      (err) => {

      },
      () => {
        if (this.filter.changed
          && !this.filter.category.length
          && !this.filter.color.length
          && !this.filter.manufacturer.length
          && this.filter.price.priceMin === this.minPrice
          && this.filter.price.priceMax === this.maxPrice
          && !this.products.length) {
          this.products = this.allProducts;
        }
      }
    );
  }

  ngAfterViewInit() {

  }

}
