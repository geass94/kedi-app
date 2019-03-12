import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    window.location.href = "/home";
  }

}
