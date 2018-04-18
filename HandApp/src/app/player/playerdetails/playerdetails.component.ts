import { Component, OnInit } from '@angular/core';
import {Player} from "../player.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as FromPlayerState from "../store/player.reducer";
import * as PlayerActions from '../store/player.actions'
import {DataStorageService} from "../../shared/services/data-storage.service";
import {relative} from "path";
import {relativeToRootDirs} from "@angular/compiler-cli/src/transformers/util";
import {DataPlayerInitService} from "../../shared/services/data-player-init.service";

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.component.html',
  styleUrls: ['./playerdetails.component.css']
})
export class PlayerdetailsComponent implements OnInit {
  players: Player[];
  selectedPlayer: Player;
  constructor(private router : Router, private route: ActivatedRoute, private store: Store<FromPlayerState.AppState>, private dataStorage: DataStorageService, private dataPlayerService: DataPlayerInitService) { }

  ngOnInit(){
    const arrayPlayer = this.dataPlayerService.InitPlayerState();
    this.players = arrayPlayer['players'];
    var playerId: number;
    this.route.params.subscribe((params) => {
      playerId = params.id;
      this.selectedPlayer = this.players.find(Player => Player.id == playerId);
    });
    if(!this.players) {
      this.dataStorage.getPlayer(+this.route.snapshot.params['id']).subscribe((player: Player) => {this.selectedPlayer = player});
    }
  }

  onDelete(){
    this.dataStorage.deletePlayer(this.selectedPlayer).subscribe();
    this.store.dispatch(new PlayerActions.DeletePlayer({player: this.selectedPlayer}));
    this.router.navigate(['players/']);
  }

  onEdit(id:number){
    this.router.navigate(['players/edit/', +this.selectedPlayer.id]);
  }
}
