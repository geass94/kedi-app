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
  user: User;
  piForm: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.loadProfile();
    this.piForm = new FormGroup({
      firstName: new FormControl(this.user.personalInformation.firstName, Validators.required),
      lastName: new FormControl(this.user.personalInformation.lastName, Validators.required),
      address1: new FormControl(this.user.personalInformation.address1, Validators.required),
      address2: new FormControl(this.user.personalInformation.address2, Validators.required),
      city: new FormControl(this.user.personalInformation.city, Validators.required),
      postCode: new FormControl(this.user.personalInformation.postCode, Validators.required),
      company: new FormControl(this.user.personalInformation.company, Validators.required),
      country: new FormControl(this.user.personalInformation.country, Validators.required),
      state: new FormControl(this.user.personalInformation.state, Validators.required),
    });
  }

  onPiSubmit() {
    let u: User = this.user;
    u.personalInformation = serialize(this.piForm.value);
    this.userService.updateProfile(u);
  }

}
