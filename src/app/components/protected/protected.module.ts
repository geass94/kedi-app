import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile.component";
import {RouterModule} from "@angular/router";
import {ProtectedRoutes} from "./protected.routing";
import {BrowserModule} from "@angular/platform-browser";
import {OwlModule} from "ngx-owl-carousel";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProtectedRoutes),
    OwlModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
})

export class ProtectedModule { }
