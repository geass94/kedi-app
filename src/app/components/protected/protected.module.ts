import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile.component";
import {RouterModule} from "@angular/router";
import {ProtectedRoutes} from "./protected.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    ProfileComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProtectedRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
})

export class ProtectedModule { }
