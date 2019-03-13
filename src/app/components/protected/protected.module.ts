import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile.component";
import {RouterModule} from "@angular/router";
import {ProtectedRoutes} from "./protected.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {CartService} from "../../services/cart.service";
import {JwtInterceptor} from "../../helpers/jwt-interceptor";
import {ErrorInterceptor} from "../../helpers/error-interceptor";

@NgModule({
  declarations: [
    ProfileComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProtectedRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CartService
  ]
})

export class ProtectedModule { }
