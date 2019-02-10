import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {CartComponent} from "./cart/cart.component";

export const ProtectedRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
]
