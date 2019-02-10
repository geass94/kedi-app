import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {deserialize, serialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser: User;
  piForm: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loggedUser = this.userService.loadProfile();
    this.piForm = new FormGroup({
      firstName: new FormControl(this.loggedUser.personalInformation.firstName, Validators.required),
      lastName: new FormControl(this.loggedUser.personalInformation.lastName, Validators.required),
      address1: new FormControl(this.loggedUser.personalInformation.address1, Validators.required),
      address2: new FormControl(this.loggedUser.personalInformation.address2, Validators.required),
      city: new FormControl(this.loggedUser.personalInformation.city, Validators.required),
      postCode: new FormControl(this.loggedUser.personalInformation.postCode, Validators.required),
      company: new FormControl(this.loggedUser.personalInformation.company, Validators.required),
      country: new FormControl(this.loggedUser.personalInformation.country, Validators.required),
      state: new FormControl(this.loggedUser.personalInformation.state, Validators.required),
    });
  }

  onPiSubmit() {
    let u: User = this.loggedUser;
    u.personalInformation = serialize(this.piForm.value);
    this.userService.updateProfile(u);
  }

}
