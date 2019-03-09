import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {RouterModule} from "@angular/router";
import {PublicRoutes} from "./public.routing";
import {SliderComponent} from "../../layout/main/slider/slider.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login/login.component";
import {CommonModule} from "@angular/common";
import { ShopComponent } from './shop/shop.component';
import { FeaturedProductsComponent } from './home/featured-products/featured-products.component';
import { SaleoffComponent } from './home/saleoff/saleoff.component';
import { NewproductsComponent } from './home/newproducts/newproducts.component';

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
  ],
  imports: [
    RouterModule.forChild(PublicRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ]
})

export class PublicModule { }
