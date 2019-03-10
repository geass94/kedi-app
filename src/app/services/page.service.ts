import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  getPage(alias: string) {
    return this.http.get(`${environment.apiUrl}/basic-page/${alias}`);
  }
}
