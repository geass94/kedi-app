import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { FooterComponent } from './layout/main/footer/footer.component';
import {JwtInterceptor} from "./helpers/jwt-interceptor";
import {ErrorInterceptor} from "./helpers/error-interceptor";
import { FormsModule } from '@angular/forms';
import { MainComponent } from './layout/main/main.component';
import {CommonModule, LocationStrategy, PathLocationStrategy} from "@angular/common";
import { UserMenuComponent } from './layout/main/header/user-menu/user-menu.component';
import { QuickCheckoutComponent } from './layout/main/header/quick-checkout/quick-checkout.component';
import {CartService} from "./services/cart.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    UserMenuComponent,
    QuickCheckoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
