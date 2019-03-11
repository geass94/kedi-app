import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../../models/address";
import {deserialize, serialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user: User;
  loggedIn = false;
  shippingAddress: Address;
  steps = {
    step1: false,
    step2: false,
    step3: false
  };
  step1Form = FormGroup;
  step2Form = FormGroup;
  step3Form = FormGroup;
  step4Form = FormGroup;

  constructor(private userService: UserService) {
    this.user = this.userService.loadProfile();
  }

  ngOnInit() {
    if (this.user !== null) {
      this.loggedIn = true;
      this.initStep1Form();
    }
  }

  private initStep1Form(): void {
    this.step1Form = new FormGroup({
      'firstName': new FormControl(this.user.personalInformation.firstName, Validators.nullValidator),
      'lastName': new FormControl(this.user.personalInformation.lastName, Validators.nullValidator),
      'email': new FormControl(this.user.email, Validators.nullValidator),
      'phone': new FormControl(this.user.personalInformation.phone, Validators.nullValidator),
      'company': new FormControl(this.user.personalInformation.company, Validators.nullValidator),
      'address1': new FormControl(this.user.personalInformation.address1, Validators.nullValidator),
      'address2': new FormControl(this.user.personalInformation.address2, Validators.nullValidator),
      'city': new FormControl(this.user.personalInformation.city, Validators.nullValidator),
      'postCode': new FormControl(this.user.personalInformation.postCode, Validators.nullValidator),
      'country': new FormControl(this.user.personalInformation.country, Validators.nullValidator),
      'state': new FormControl(this.user.personalInformation.state, Validators.nullValidator),
    });
    this.steps.step1 = true;
    this.initStep2Form();
  }

  private initStep2Form(): void {
    this.step2Form = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'company': new FormControl(null, Validators.required),
      'address1': new FormControl(null, Validators.required),
      'address2': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'postCode': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
    });
  }

  onForm2Submit() {
    const form = this.step2Form;
    console.log(form)
    if (form.valid) {
      let toSubmit: Address = deserialize<Address>(Address, serialize(form.value));
      this.shippingAddress = toSubmit;
      this.steps.step2 = true;
    }
  }

}
