import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatListModule, MatInputModule,
  MatToolbarModule
} from "@angular/material";
import {PlayerdetailsComponent} from "./playerdetails/playerdetails.component";
import {PlayerComponent} from "./player.component";
import {EditplayerComponent} from "./editplayer/editplayer.component";
import {PlayerRoutingModule} from "./player-routing.module";
import {PlayerService} from "./player.service";
import {ReactiveFormsModule} from "@angular/forms";
import {PlayerResolver} from "./player.resolver";

@NgModule({
  declarations:[
    PlayerdetailsComponent,
    PlayerComponent,
    EditplayerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    PlayerRoutingModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
  ],
  exports: [
    MatIconModule,
    PlayerRoutingModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
  ],
  providers: [
    PlayerService,
    PlayerResolver
  ]
})
export class PlayerModule { }
