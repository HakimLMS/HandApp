import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {init} from "protractor/built/launcher";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Store} from "@ngrx/store";
import * as FromPlayerState from "../store/player.reducer";
import * as PlayerActions from '../store/player.actions';
import {Player} from "../player.model";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {CustomNumberValidator} from "../../shared/services/CustomNumberValidator";
import {DataPlayerInitService} from "../../shared/services/data-player-init.service";

@Component({
  selector: 'app-editplayer',
  templateUrl: './editplayer.component.html',
  styleUrls: ['./editplayer.component.css']
})
export class EditplayerComponent implements OnInit {
  editMode: boolean = false;
  routeId;
  playerForm: FormGroup;
  players: Player[];
  selectedPlayer: Player;

  constructor(private router : Router, private route: ActivatedRoute, private store: Store<FromPlayerState.AppState>, private dataStorage: DataStorageService, private dataPlayerService: DataPlayerInitService) {}

  ngOnInit() {
    this.initForm();
    const arrayPlayer = this.dataPlayerService.InitPlayerState();
    this.players = arrayPlayer['players'];

    this.route.params.subscribe(
      (params: Params) => { if (params['id'] != null) {
          this.routeId = +params['id'];
          this.editMode = true;
          if (this.editMode == true) {
            this.dataStorage.getPlayer(+this.routeId).subscribe((player: Player) => {
              this.selectedPlayer = player;
              this.initForm();
            });
          };
        }});

    this.routeId != null? this.editMode = true : this.editMode;

    if(this.editMode)
    {
      this.route.params.subscribe((params) => {
        this.selectedPlayer = this.players.find(Player => Player.id == params.id);
      });
    }
  }

  initForm() {
    let playerName = '';
    let playerSurname = '';
    let playerNumber = '';
    let playerPoste = '';
    let playerMatchCount = '';
    //let playerPhoto = '';

    if(this.editMode == true)
    {
      playerName = this.selectedPlayer.name;
      playerSurname = this.selectedPlayer.surname;
      playerNumber = this.selectedPlayer.number.toString();
      playerPoste = this.selectedPlayer.poste;
      playerMatchCount = this.selectedPlayer.matchcount;
      //playerPhoto = this.selectedPlayer.photo;
    }

    this.playerForm = new FormGroup({
     'name': new FormControl(playerName,[Validators.required, Validators.minLength(4)]),
    'surname': new FormControl(playerSurname, [Validators.required, Validators.minLength(4)]),
    'number': new FormControl(playerNumber,[Validators.required, Validators.pattern('^[0-9]+$')]),
    'poste': new FormControl(playerPoste, [Validators.required,Validators.minLength(4)]),
    'matchcount': new FormControl(playerMatchCount, Validators.required),
    //'photo': new FormControl(playerPhoto, [Validators.required,Validators.minLength(4)])
    });
  }

  onSubmit() {
    const value = this.playerForm.value;
    const playerToAdd = new Player(null, value.name, value.surname, value.number, './assets/img/avatar.png', value.poste, value.matchcount);

    if(this.editMode == true) {
      playerToAdd.id = this.selectedPlayer.id;
      this.dataStorage.udpadatePlayer(playerToAdd).subscribe((player)=> {
        this.players.splice(+player.id, 1, player);
      });
      this.store.dispatch(new PlayerActions.UpdatePlayer({player : playerToAdd, editedPlayerIndex : playerToAdd.id}));
    }
    else {
      playerToAdd.id? playerToAdd.id = this.players[this.players.length - 1].id + 1: playerToAdd.id = 1;
      this.dataStorage.addPlayer(playerToAdd).subscribe((player) => {
        this.players.push(playerToAdd);
      });
      this.store.dispatch(new PlayerActions.AddPlayer(playerToAdd));
    }
    this.stopEdit();
  }

  stopEdit() {
    this.store.dispatch(new PlayerActions.StopUpdatePlayer());
    this.router.navigate(['/players']);
  }
}
