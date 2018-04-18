import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";


const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent}
  ]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AuthRoutingModule { }
