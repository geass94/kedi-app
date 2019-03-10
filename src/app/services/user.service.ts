import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {deserialize, serialize} from "serializer.ts/Serializer";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  public loggedUser: User;

  constructor(private http: HttpClient) { }

  setProfile(): void {
    this.http.get(`${environment.apiUrl}/user/me`).subscribe((user) => {
        this.user = deserialize<User>(User, user);
      },
      () => {

      },
      () => {
        localStorage.setItem('loggedUser', JSON.stringify(this.user));
      }
    );
  }

  loadProfile(): User {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  updateProfile(u: User): void {
    this.http.put(`${environment.apiUrl}/user/update/${u.id}`, serialize(u)).subscribe((res) => {
      let usr: User = deserialize(User, res);
      localStorage.setItem('loggedUser', JSON.stringify(usr));
    });
  }

}
