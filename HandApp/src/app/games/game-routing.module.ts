import {RouterModule, Routes} from "@angular/router";
import {GameComponent} from "./game.component";
import {EditgameComponent} from "./editgame/editgame.component";
import {GamedetailsComponent} from "./gamedetails/gamedetails.component";
import {NgModule} from "@angular/core";
import {AuthGuardService} from "../shared/guards/auth-guard.service";

const routes: Routes = [
  { path: 'games', component: GameComponent, children: [
      {path: 'details/:id', component: GamedetailsComponent},
      {path: 'edit', component: EditgameComponent },
      {path: 'edit/:id', component: EditgameComponent}
    //], canActivate: [AuthGuardService]},
    ]},
  ];

@NgModule({
  imports: [
   RouterModule.forChild(routes ),
  ],
  exports: [
    RouterModule,
  ]
})
export class GameRoutingModule{}
