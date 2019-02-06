import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";

export const ProtectedRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  }
]
