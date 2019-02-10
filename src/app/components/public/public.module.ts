import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./home/product/product.component";
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

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    SignupComponent,
    SingleProductComponent,
    SliderComponent,
    LoginComponent,
    ShopComponent,
  ],
  imports: [
    RouterModule.forChild(PublicRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ]
})

export class PublicModule { }
