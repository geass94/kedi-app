import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Product, ProductPage} from "../models/product";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";
import {Filter} from "../models/filter";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts(sort: string, order: string, page: number): Observable<ProductPage> {
    let params = new HttpParams();
    params = params.append('sort', sort);
    params = params.append('order', order);
    params = params.append('page', page.toString());
    return this.http.get<ProductPage>(`${environment.apiUrl}/product/get-products`, {params: params});
  }

  getProduct(id: number ) {
    return this.http.get(`${environment.apiUrl}/product/get-product-by-id/${id}`);
  }

  getProductVariants(ids: any[]): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('ids', JSON.stringify(ids).replace(/[\[\]']+/g, ''));
    return this.http.get(`${environment.apiUrl}/product/get-product-variants`, {params: params})
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  getFilteredProducts(filter: Filter): Observable<ProductPage> {
    let params = new HttpParams();
    params = params.append('categories', JSON.stringify(filter.category).replace(/[\[\]']+/g, ''));
    params = params.append('colors', JSON.stringify(filter.color).replace(/[\[\]']+/g, ''));
    params = params.append('manufacturers', JSON.stringify(filter.manufacturer).replace(/[\[\]']+/g, ''));
    params = params.append('min_price', filter.minPrice.toString());
    params = params.append('max_price', filter.maxPrice.toString());
    params = params.append('sort', filter.sort.sort);
    params = params.append('order', filter.sort.order);
    params = params.append('page', filter.sort.page.toString());
    return this.http.get<ProductPage>(`${environment.apiUrl}/product/get-products-by-filter`, {params: params});
  }

  getPriceRange() {
    return this.http.get(`${environment.apiUrl}/product/get-price-range`);
  }

  getFeaturedProducts() {
    return this.http.get(`${environment.apiUrl}/product/get-featured-products`)
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  getNewProducts() {
    return this.http.get(`${environment.apiUrl}/product/get-new-products`)
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  getRelatedProducts(productId: number) {
    return this.http.get(`${environment.apiUrl}/product/get-related-products/${productId}`)
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  getSaleOff() {
    return this.http.get(`${environment.apiUrl}/product/get-sale-off`)
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }

  getBestSales() {
    return this.http.get(`${environment.apiUrl}/product/get-best-sale`)
      .pipe(map((res: any) => deserialize<Product[]>(Product, res)));
  }
}
