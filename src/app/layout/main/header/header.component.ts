import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Category} from "../../../models/category";
import {HeaderService} from "../../../services/header.service";
import {deserialize} from "serializer.ts/Serializer";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {AuthenticationService} from "../../../services/authentication.service";
declare var jQuery: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  headerMenu: Category[] = [];
  isLoggedIn = false;
  constructor(private headerService: HeaderService, private authService: AuthenticationService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
    this.headerService.getSideBar().subscribe(res => {
      this.headerMenu = deserialize<Category[]>(Category, res);
    });
  }

}
