import {RouterModule, Routes} from "@angular/router";
import {EditplayerComponent} from "./editplayer/editplayer.component";
import {PlayerdetailsComponent} from "./playerdetails/playerdetails.component";
import {NgModule} from "@angular/core";
import {PlayerComponent} from "./player.component";
import {AuthGuardService} from "../shared/guards/auth-guard.service";


const routes: Routes = [
  { path:'players', component: PlayerComponent, children: [
      {path:'edit/:id', component: EditplayerComponent},
      {path:'edit', component: EditplayerComponent},
      {path:'details/:id', component: PlayerdetailsComponent  }
      ], canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {}
