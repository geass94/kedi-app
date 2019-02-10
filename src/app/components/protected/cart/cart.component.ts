import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loggedUser: User;

  constructor(private userService: UserService) {
    this.loggedUser = this.userService.loadProfile();
  }

  ngOnInit() {
  }

}
