import { Component, OnInit } from '@angular/core';
import {Game} from "../game.model";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromGame from '../store/game.reducer';
import * as gameActions from '../store/game.actions';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataGameInitService} from "../../shared/services/data-game-init.service";

@Component({
  selector: 'app-gamedetails',
  templateUrl: './gamedetails.component.html',
  styleUrls: ['./gamedetails.component.css']
})
export class GamedetailsComponent implements OnInit {

  game: Game;
  gamesState: Observable<{games: Game[]}>;
  constructor(private dataStorage: DataStorageService, private store: Store<fromGame.AppState>, private route: ActivatedRoute, private initDataGames: DataGameInitService, private router: Router) { }

  ngOnInit() {
  const dataGameArray = this.initDataGames.initGameState();
  this.gamesState = dataGameArray['gamesState'];
  this.route.params.subscribe(
    (params: Params) =>{
      const Id = +params['id'];
      this.gamesState.subscribe((gamesState) => {
        this.game = gamesState.games.find(Game => Game.id == Id);
      })
      }
    )
  }

  editGame(id: number){
    this.router.navigate(['games/edit/'+ id]);
  }

}
