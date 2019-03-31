import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }
  getSideBar(parentCategory: number) {
    return this.http.get(`${environment.apiUrl}/menu/get-sidebar/${parentCategory}`);
  }
}
