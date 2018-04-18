import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from "./game-routing.module";
import {GameComponent} from "./game.component";
import {GamedetailsComponent} from "./gamedetails/gamedetails.component";
import {EditgameComponent} from "./editgame/editgame.component";
import {ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
  exports:[
    GameRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [

    GameComponent,
    GamedetailsComponent,
    EditgameComponent,

  ],
  providers: [

  ]
})
export class GamesModule {}
