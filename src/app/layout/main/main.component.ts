import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  loggedUser: User;

  constructor(private userService: UserService) {
    this.loggedUser = this.userService.loadProfile();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}
