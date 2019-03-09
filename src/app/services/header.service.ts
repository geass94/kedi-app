import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }
  getSideBar() {
    return this.http.get(`${environment.apiUrl}/specification/get-parent-categories`);
  }
}
