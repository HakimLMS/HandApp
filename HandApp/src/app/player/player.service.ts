import {Player} from "./player.model";
import {DataStorageService} from "../shared/services/data-storage.service";
import {OnInit} from "@angular/core";
import {Subject} from "rxjs/Subject";


export class PlayerService {

  private players: Player[];

  setPlayers(players: Player[])
  {
    this.players = players;
  }


}
