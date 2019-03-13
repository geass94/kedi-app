import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  isLoggedIn = false;

  constructor(private authService: AuthenticationService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}
