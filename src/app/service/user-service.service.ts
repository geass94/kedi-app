// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
// import {User} from "../model/user";
//
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UserServiceService {
//   private signUpUrl = 'api/heroes';  // URL to web api
//   constructor(
//     private http: HttpClient) { }
//
//   signUp (user: User): Observable<User> {
//     return this.http.post<User>(this.signUpUrl, user, httpOptions).pipe(
//       tap((hero: User) => this.log(`added user w/ id=${user.id}`)),
//       catchError(this.handleError<User>('signUp'))
//     );
//   }
//
//   private handleError<T> (operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//
//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead
//
//       // TODO: better job of transforming error for user consumption
//       this.log(`${operation} failed: ${error.message}`);
//
//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }
//
//   /** Log a HeroService message with the MessageService */
//   private log(message: string) {
//     console.log(message);
//   }
// }
