import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Product} from "../models/product";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";

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
  getProductVariants(ids: any[]): Observable<Product[]> {
    console.log (ids)
    let params = new HttpParams();
    params = params.append('ids', JSON.stringify(ids).replace("[", "").replace("]", ""));
    return this.http.get(`${environment.apiUrl}/product/get-product-variants`, {params: params})
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }
}
