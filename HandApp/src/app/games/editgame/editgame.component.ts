import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Player} from "../../player/player.model";
import {Observable} from "rxjs/Observable";
import * as FromPlayer from '../../player/store/player.reducer';
import * as FromGame from '../store/game.reducer';
import {Store} from "@ngrx/store";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Game} from "../game.model";
import * as GameActions from "../store/game.actions";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as moment from "moment";
import {DataGameInitService} from "../../shared/services/data-game-init.service";
import {DataPlayerInitService} from "../../shared/services/data-player-init.service";
import {Message} from "../../shared/message.model";


@Component({
  selector: 'app-editgame',
  templateUrl: './editgame.component.html',
  styleUrls: ['./editgame.component.css']
})
export class EditgameComponent implements OnInit {
  gameForm: FormGroup;
  editMode: boolean = false;
  playersState: Observable<{players: Player[]}>;
  gameState: Observable<{games: Game[]}>;
  games: Game[];
  editedGameId: number;
  editedGame: Game;


  constructor(private gameStore: Store<FromGame.AppState>,
              private playerStore: Store<FromPlayer.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private initDataGames: DataGameInitService,
              private initDataPlayer: DataPlayerInitService
              ) {
  }

  ngOnInit() {
    const dataGame = this.initDataGames.initGameState();
    this.gameState = dataGame['gamesState'];
    this.games = dataGame['games'];
    const dataPlayer = this.initDataPlayer.InitPlayerState();
    this.playersState = dataPlayer['playersState'];
    this.formUpdateInit();
  }

  formInit() {
    let gameDate = '' ;
    let gameHome_Team = '';
    let gameAway_Team = '';
    let gameRoster: Player[];

    if (this.editMode == true) {
      gameDate = moment(this.editedGame.date).format('DD-MM-YYYY');
      gameHome_Team = this.editedGame.home_team;
      gameAway_Team = this.editedGame.away_team;
      gameRoster = this.editedGame.roster;

    }

    this.gameForm = new FormGroup(
      {
        'date': new FormControl(gameDate, Validators.required),
        'gameHome_Team': new FormControl(gameHome_Team, Validators.required),
        'gameAway_Team': new FormControl(gameAway_Team, Validators.required),
        'gameRoster': new FormControl(gameRoster)
      }
    )
  }

  onSubmit() {
    const value = this.gameForm.value;
    const passed = moment(value.date).isBefore();
    const date = moment(value.date).format('DD-MM-YYYY');
    const gameToAdd = new Game(null, date , value.gameHome_Team, value.gameAway_Team, value.gameRoster, passed);

    if (this.editMode == true) {
      gameToAdd.id = this.editedGameId;
      this.dataStorageService.updateGame(gameToAdd).subscribe();
      this.gameStore.dispatch(new GameActions.UpdateGames({game: gameToAdd, editedGameIndex: this.editedGameId}));
    } else {
      this.gameState.subscribe((gameSate) => {
        gameSate.games.length <= 0 ? gameToAdd.id = 1 : gameToAdd.id = gameSate.games.length;
      });
      this.gameStore.dispatch(new GameActions.AddGames(gameToAdd));
      this.dataStorageService.addGame(gameToAdd);
    }
    this.stopEdit();
  }

  onSendRoster(){
    const value = this.gameForm.value;
    var name: string;
    for( let player of value.roster)
    {
     name = name + '' + player.name;
    }
    const message = new Message(name); console.log(message);
    this.dataStorageService.sendMessage(message);
  }

  formUpdateInit() {
    this.formInit();
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id != null) {
          this.editedGameId = params.id;
          this.editMode = true;
          this.gameState.subscribe(
            (gamesState) => {
              this.editedGame = gamesState.games.find(Game => Game.id == params.id);
              this.editedGameId = this.editedGame.id;
              this.formInit();
            });
        }
      });
  }

  stopEdit() {
    this.gameStore.dispatch(new GameActions.StopUpdateGame());
    this.router.navigate(['games']);
  }
}


