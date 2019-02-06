import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./home/product/product.component";
import {SignupComponent} from "./signup/signup.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {RouterModule} from "@angular/router";
import {PublicRoutes} from "./public.routing";
import {SliderComponent} from "../../layout/main/slider/slider.component";
import {BrowserModule} from "@angular/platform-browser";
import {OwlModule} from "ngx-owl-carousel";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./login/login.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    SignupComponent,
    SingleProductComponent,
    SliderComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forChild(PublicRoutes),
    OwlModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ]
})

export class PublicModule { }
