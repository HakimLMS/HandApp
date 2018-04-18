import {Store} from "@ngrx/store";
import * as playerActions from "../../player/store/player.actions";
import * as fromPlayer from "../../player/store/player.reducer";
import {DataStorageService} from "./data-storage.service";
import {Observable} from "rxjs/Observable";
import {Player} from "../../player/player.model";
import {Injectable} from "@angular/core";

@Injectable()
export class DataPlayerInitService {
  playerState: Observable<{players: Player[]}>;
  players: Player[];
  dataArray = [];

  constructor(private store: Store<fromPlayer.AppState>, private dataStorageService: DataStorageService){}

  InitPlayerState(){
    this.playerState = this.store.select('players');
    this.store.select('players').subscribe((players) => {
      this.players = players.players;
    });

    if(this.players.length <= 0) {
      const playerFromApi = this.dataStorageService.getPlayers();
      this.store.dispatch(new playerActions.InitializePlayers(playerFromApi));
      this.players = playerFromApi;
      this.playerState = this.store.select('players');
    }

    this.dataArray['playersState'] = this.playerState;
    this.dataArray['players'] = this.players;

    return this.dataArray;
  }
}
