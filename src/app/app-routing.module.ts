import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "./guards/auth.guard";
import {MainComponent} from "./layout/main/main.component";
import {ProtectedModule} from "./components/protected/protected.module";
import {PublicModule} from "./components/public/public.module";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>  ProtectedModule
      },
      {
        path: '',
        loadChildren: () =>  PublicModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
