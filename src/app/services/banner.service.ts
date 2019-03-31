import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Banner} from "../models/banner";
import {deserialize} from "serializer.ts/Serializer";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }

  getBanners(area: string) {
    return this.http.get(`${environment.apiUrl}/banner/get-all-by-area/${area}`)
      .pipe(map((res: any) => deserialize<Banner[]>(Banner, res)));
  }

}
