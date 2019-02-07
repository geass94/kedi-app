import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts() {
    return this.http.get(`${environment.apiUrl}/product/get-products`);
  }
  getProduct(id: number ) {
    return this.http.get(`${environment.apiUrl}/product/get-product-by-id/${id}`);
  }
  getProductVariants() {
    return this.http.get(`${environment.apiUrl}/product/get-products`);
  }
}
