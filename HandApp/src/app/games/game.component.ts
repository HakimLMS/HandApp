import { Component, OnInit } from '@angular/core';
import {Game} from "./game.model";
import {DataStorageService} from "../shared/services/data-storage.service";
import {Store} from "@ngrx/store";
import * as FromGame from "./store/game.reducer";
import * as GameActions from "./store/game.actions";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {DataGameInitService} from "../shared/services/data-game-init.service";



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gamesState: Observable<{games: Game[]}>;
  constructor(private dataStorage: DataStorageService, private store: Store<FromGame.AppState>, private router: Router, private route: ActivatedRoute, private initDataGames: DataGameInitService){}

  ngOnInit() {
  const gamesDataArray = this.initDataGames.initGameState(); console.log(gamesDataArray);
  this.gamesState = gamesDataArray['gamesState'];
  }

  deleteGame(id: number){
    console.log(id);
    this.gamesState.subscribe((value:{games: Game[]}) => {
      const gamesArray = value.games;
      var gameToDelete;
      this.dataStorage.getGame(id).subscribe((game) => {gameToDelete = game;
        this.dataStorage.deleteGame(gameToDelete);
        this.store.dispatch(new GameActions.DeleteGames({game: gameToDelete}));
      });

    });
}

  onGameDetails(gameId: number){
    this.router.navigate(['details/' + gameId], {relativeTo: this.route} );
  }
}
