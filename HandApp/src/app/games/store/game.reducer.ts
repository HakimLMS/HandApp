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
    new Game(1, '21-04-2018', 'Thonon Les Bains', 'Annecy', null , false),
    new Game(2, '28-04-2018', 'Chambéry', 'Thonon Les Bains', null , false),
    new Game(3, '02-05-2018', 'Bourgouin-Jallieu', 'Thonon Les Bains', null , false),
    new Game(4, '09-05-2018', 'Thonon Les Bains', 'Tricastin', null , false),
    new Game(5, '16-05-2018', 'Anonnay', 'Thonon Les Bains', null , false),
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
      const editedGame = state.games[actions.payload.editedGameIndex-1];
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
      const oldGameArray = [...state.games];
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
