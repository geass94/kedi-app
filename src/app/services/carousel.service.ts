import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient) { }

  getCarouselByArea(area: string) {
    return this.http.get(`${environment.apiUrl}/carousel/get-by-area/${area}`);
  }
}
