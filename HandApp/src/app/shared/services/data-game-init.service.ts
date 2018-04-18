import {Store} from "@ngrx/store";
import * as fromGame from "../../games/store/game.reducer";
import * as gameActions from "../../games/store/game.actions";
import {DataStorageService} from "./data-storage.service";
import {Observable} from "rxjs/Observable";
import {Game} from "../../games/game.model";
import {Injectable} from "@angular/core";

@Injectable()
export class DataGameInitService {
  gameState: Observable<{games: Game[]}>;
  games: Game[];
  dataArray = [];
  constructor(private store: Store<fromGame.AppState>, private dataStorageService: DataStorageService){}

  initGameState(){
  this.gameState = this.store.select('games');
  this.store.select('games').subscribe((games) => {
      this.games = games.games;
    });

  if(this.games.length <= 0){

    this.dataStorageService.getGames().subscribe((games) => {
      const gamesFromApi = games;
      this.store.dispatch( new gameActions.InitializeGames(gamesFromApi));
      this.games = gamesFromApi;
    });

    this.gameState = this.store.select('games');
  }

  this.dataArray['gamesState'] = this.gameState;
  this.dataArray['games'] = this.games;

  return this.dataArray;
  }
}
