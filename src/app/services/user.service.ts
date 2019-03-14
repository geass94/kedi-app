import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = null;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  setProfile(): void {
    this.http.get(`${environment.apiUrl}/user/me`).subscribe((user) => {
        this.user = deserialize<User>(User, user);
      },
      () => {

      },
      () => {
        localStorage.setItem('user', JSON.stringify(this.user));
        if (this.authService.isLoggedIn()) {
          window.location.href = "/home";
        }
      }
    );
  }

  loadProfile(): User {
    return this.user !== null ? this.user : JSON.parse(localStorage.getItem('user'));
  }

  updateProfile(u: User): void {
    this.http.put(`${environment.apiUrl}/user/update/${u.id}`, serialize(u)).subscribe((res) => {
      let usr: User = deserialize(User, res);
      localStorage.setItem('user', JSON.stringify(usr));
    });
  }

}
