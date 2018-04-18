import {Component, OnInit} from '@angular/core';
import {Player} from "./player.model";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Route, Router} from "@angular/router";
import {DataPlayerInitService} from "../shared/services/data-player-init.service";
import {Store} from "@ngrx/store";
import * as fromPlayer from "./store/player.reducer";
import * as playerActions from "./store/player.actions";
import {DataStorageService} from "../shared/services/data-storage.service";


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playersState: Observable<{players: Player[]}>;
  openPart2: boolean =  false;
  constructor( private router: Router, private initPlayer: DataPlayerInitService, private route: ActivatedRoute) {}

  ngOnInit() {
    const playersDataArray = this.initPlayer.InitPlayerState();
    this.playersState = playersDataArray['playersState'];console.log(playersDataArray);
    this.route.snapshot.url.join('') === 'players' ? this.openPart2 = true: this.openPart2 = false;
  }

  onListPlayerClicked(id: number)
  {
    this.openPart2 = false;
    this.router.navigate(['players/details', id]);

  }

  onAddPlayer()
  {
    this.openPart2 = false;
    this.router.navigate(['players/edit']);
  }

}
