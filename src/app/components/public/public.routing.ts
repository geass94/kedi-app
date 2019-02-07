import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {ShopComponent} from "./shop/shop.component";

export const PublicRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'product/:id',
    component: SingleProductComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  }
];
