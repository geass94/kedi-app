import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {RouterModule} from "@angular/router";
import {PublicRoutes} from "./public.routing";
import {SliderComponent} from "../../layout/main/slider/slider.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login/login.component";
import {CommonModule} from "@angular/common";
import { ShopComponent } from './shop/shop.component';
import { FeaturedProductsComponent } from './home/featured-products/featured-products.component';
import { SaleoffComponent } from './home/saleoff/saleoff.component';
import { NewproductsComponent } from './home/newproducts/newproducts.component';
import { RelatedProductsComponent } from './single-product/related-products/related-products.component';
import { PageComponent } from './page/page.component';
import {CartService} from "../../services/cart.service";
import {JwtInterceptor} from "../../helpers/jwt-interceptor";
import {ErrorInterceptor} from "../../helpers/error-interceptor";
import { BestSellerComponent } from './home/best-seller/best-seller.component';

@NgModule({
  declarations: [
    HomeComponent,
    SignupComponent,
    SingleProductComponent,
    SliderComponent,
    LoginComponent,
    ShopComponent,
    FeaturedProductsComponent,
    SaleoffComponent,
    NewproductsComponent,
    RelatedProductsComponent,
    PageComponent,
    BestSellerComponent,
  ],
  imports: [
    RouterModule.forChild(PublicRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CartService
  ]
})

export class PublicModule { }
