import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../../services/order.service";
import {Order} from "../../../../models/order";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(
      res => {
        this.orders = res;
      }
    );
  }

}
