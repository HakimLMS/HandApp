import {Game} from "../game.model";
import {Action} from "@ngrx/store";

export  const INITIALIZE_GAMES = 'INITIALIZE_GAMES';
export const ADD_GAMES = ' ADD_GAMES';
export const DELETE_GAMES = 'DELETE_GAMES';
export const UPDATE_GAMES = ' UPDATE_GAMES';
export const STOP_UPDATE_GAMES = 'STOP_UPDATE_GAMES';

export class InitializeGames implements Action {
  readonly type = INITIALIZE_GAMES;
  constructor(public payload: Game[]) {}
};

export class AddGames implements Action {
  readonly type = ADD_GAMES;
  constructor(public payload: Game){}
};

export class DeleteGames implements Action {
  readonly type = DELETE_GAMES;
  constructor( public payload: {game: Game}){};
};

export class UpdateGames implements Action {
  readonly type = UPDATE_GAMES;
  constructor (public payload: { game: Game, editedGameIndex: number}){}
};

export class StopUpdateGame implements Action{
  readonly type = STOP_UPDATE_GAMES;
  constructor(){};
}

export type GamesActions = InitializeGames | AddGames | DeleteGames | UpdateGames | StopUpdateGame;
