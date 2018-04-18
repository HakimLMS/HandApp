import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";
import {AuthGuardService} from "./shared/guards/auth-guard.service";

const routes : Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
