import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(order: Order) {
    return this.http.post(`${environment.apiUrl}/order/place-order`, order);
  }

  initPayment(order: Order): void {
    this.http.post(`${environment.apiUrl}/order/init-payment`, {id: order.id, uuid: order.uuid}).subscribe(
      (res) => {
        this.makeTransaction(res);
      }
    );
  }

  private makeTransaction(obj: Object) {
      var mapForm = document.createElement("form");
      mapForm.target = "_blank";
      mapForm.method = "POST"; // or "post" if appropriate
      mapForm.action = "https://e-commerce.cartubank.ge/servlet/Process3DSServlet/3dsproxy_init.jsp";
      Object.keys(obj).forEach(function (param) {
        var mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = param;
        mapInput.setAttribute("value", obj[param]);
        mapForm.appendChild(mapInput);
      });
      document.body.appendChild(mapForm);
      mapForm.submit();
  }
}
