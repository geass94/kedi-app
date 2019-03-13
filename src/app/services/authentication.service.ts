import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs/index";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    if (this.currentUserValue && this.currentUserValue.accessToken) {
      return true;
    }
    return false;
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signup`, {name, email, password })
      .pipe(map(data => {
        return data;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
