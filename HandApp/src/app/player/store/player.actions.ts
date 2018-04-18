import {Action} from "@ngrx/store";
import {Player} from "../player.model";

export const INITIALIZE_PLAYERS = 'INITIALIZE_PLAYERS';
export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const STOP_UPDATE_PLAYER = 'STOP_UPDATE_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';

export class InitializePlayers implements Action {
  readonly type = INITIALIZE_PLAYERS;

  constructor(public payload: Player[]) {}
};

export class AddPlayer implements Action{
  readonly type = ADD_PLAYER;
  constructor(public payload: Player){}

}
export class UpdatePlayer implements Action {
  readonly type = UPDATE_PLAYER;

  constructor(public payload: { player: Player, editedPlayerIndex: number }) {}
}
  export class StopUpdatePlayer implements Action{
  readonly type = STOP_UPDATE_PLAYER;
  constructor(){}
}

  export class DeletePlayer implements Action{
  readonly type = DELETE_PLAYER;
  constructor(public payload: {player: Player}){}
}

export type PlayerActions =
InitializePlayers | AddPlayer | UpdatePlayer | StopUpdatePlayer | DeletePlayer;
