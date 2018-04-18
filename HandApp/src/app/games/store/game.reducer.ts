import * as GameActions from "./game.actions";
import {Game} from "../game.model";

export interface AppState {
  games: GameState;
}

export interface GameState  {
  games: Game[];
  gamesToUpdateId: number;
  editedGame: Game;
}

const initialState: GameState = {
  games: [
  ],
  gamesToUpdateId: -1,
  editedGame: null
}


export function GameReducer(state = initialState, actions: GameActions.GamesActions )
{
  switch (actions.type){
    case GameActions.INITIALIZE_GAMES:
      state.games = actions.payload;
      return {...state};
    case GameActions.ADD_GAMES:
      return {
        ...state,
        games:[ ...state.games, actions.payload]
      }
    case GameActions.UPDATE_GAMES:
      const editedGame = state.games[actions.payload.editedGameIndex];
      const updatedGame = {
        ...editedGame,
        ...actions.payload.game
      };
      const games = [...state.games];
      games[actions.payload.editedGameIndex-1] = updatedGame;
      return {
        ...state,
        games : games,
        gamesToUpdateId : -1,
        editedGame: null
      }
    case GameActions.STOP_UPDATE_GAMES:
      return{
        ...state,
        gamesToUpdateId : -1,
        editedGame: null
      }
    case GameActions.DELETE_GAMES:
      const oldGameArray = [...state.games];console.log(actions.payload);
      console.log(actions.payload.game);
      oldGameArray.splice(actions.payload.game.id-1, 1);
      return {
        ...state,
        games: oldGameArray,
        gamesToUpdateId: -1,
        editedGame: null
      }
    default:
      return state;
  }
}
