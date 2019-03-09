import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Product, ProductPage} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {deserialize} from "serializer.ts/Serializer";
import {Menu} from "../../../models/menu";
import {MenuService} from "../../../services/menu.service";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {CartService} from "../../../services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Filter} from "../../../models/filter";
import {Sort} from "../../../models/sort";
import {PriceRange} from "../../../models/price-range";
declare var jQuery: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit, AfterViewInit {
  loggedUser: User;
  products: Product[];
  sideBar: Menu = new Menu;
  maxPrice = 0;
  minPrice = 0;
  filter = new Filter();

  constructor(
    private productService: ProductService,
    private menuService: MenuService,
    private userService: UserService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedUser = this.userService.loadProfile();
    this.productService.getPriceRange().subscribe(
      res => {
        let range = deserialize<PriceRange>(PriceRange, res);
        this.minPrice = range.minPrice;
        this.maxPrice = range.maxPrice;
      },
      err => {

      },
      () => {
        this.filter.maxPrice = this.maxPrice;
        this.filter.minPrice = this.minPrice;
        this.initPriceSlider();
      }
    );
    this.menuService.getSideBar().subscribe(res => {
      this.sideBar = deserialize<Menu>(Menu, res);
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.applyFilterFromURL(params);
      this.filterProducts();
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id).subscribe();
  }

  imgClass(i: number) {
    return i === 0 ? 'primary-img' : 'secondary-img';
  }

  onSort(v: any): void {
    // this.sort = v;
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
    this.filter.category = p.getAll("category").map(value => parseInt(value, 10)) || [];
    this.filter.color = p.getAll("color").map(value => parseInt(value, 10)) || [];
    this.filter.manufacturer = p.getAll("manufacturer").map(value => parseInt(value, 10)) || [];
    this.filter.maxPrice = parseFloat(p.get("max_price") || '0');
    this.filter.minPrice = parseFloat(p.get("min_price") || '0');
    this.filter.sort.sort = p.get("sort") || 'name';
    this.filter.sort.order = p.get("order") || 'desc';
    this.filter.sort.page = p.get("page") || 0;
  }

  applyFilter(p: any) {
    let keys = Object.keys(p);
    if (keys.length > 1) {
        this.filter.minPrice = p.priceMin;
        this.filter.maxPrice = p.priceMax;
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
    this.router.navigate(['/shop'],
      {
        queryParams: {
          category: this.filter.category,
          color: this.filter.color,
          manufacturer: this.filter.manufacturer,
          max_price: this.filter.maxPrice,
          min_price: this.filter.minPrice,
          sort: this.filter.sort.sort,
          order: this.filter.sort.order,
          page: this.filter.sort.page
        }
      }
    );
  }

  private filterProducts(): void {
    this.productService.getFilteredProducts(this.filter).subscribe(
      (res) => {
        let data: ProductPage = res;
        this.products = data.content;
      });
  }

  ngAfterViewInit() {

  }

}
