import {Player} from "../player.model";
import * as PlayerActions from "./player.actions";

export interface AppState {
  players: State;
}

export interface State {
  players: Player[];
  editedPlayerIndex: number;
  editedPlayer: Player;
}

const initialState: State = {
  players: [
    new Player( 1, 'Doe', 'John',  10, 'avatar.png', 'Arrière', '0'),
    new Player( 2, 'Doe', 'John',  7, 'avatar.png', 'Arrière', '0'),
    new Player( 3, 'Doe', 'John',  8, 'avatar.png', 'Demi', '0'),
    new Player( 4, 'Doe', 'John',  20, 'avatar.png', 'Demi', '0'),
    new Player( 5, 'Doe', 'John',  16, 'avatar.png', 'Ailier', '0'),
    new Player( 6, 'Doe', 'John',  17, 'avatar.png', 'Ailier', '0'),
    new Player( 7, 'Doe', 'John',  12, 'avatar.png', 'Pïvot', '0'),
    new Player( 8, 'Doe', 'John',  2, 'avatar.png', 'Gardien', '0'),
    new Player( 9, 'Doe', 'John',  1, 'avatar.png', 'Gardien', '0'),
    ],
  editedPlayer: null,
  editedPlayerIndex: -1
}


export function PlayerReducer(state = initialState, action: PlayerActions.PlayerActions){
switch (action.type){
  case PlayerActions.INITIALIZE_PLAYERS:
    state.players = action.payload;
    return {...state};
  case PlayerActions.ADD_PLAYER:
    return {...state,
    players: [...state.players, action.payload]
    };
  case PlayerActions.UPDATE_PLAYER:
    const editedPlayer = state.players[action.payload.editedPlayerIndex];
    const updatedPlayer = {
      ...editedPlayer,
      ...action.payload.player
    };
    const players = [...state.players];
    players[action.payload.editedPlayerIndex-1] = updatedPlayer;
    return{
      ...state,
      players: players,
      editedPlayer: null,
      editedPlayerIndex: -1
    };
  case PlayerActions.STOP_UPDATE_PLAYER:
    return{
      ...state,
      editedPlayer: null,
      editedPlayerIndex: -1
    }
  case PlayerActions.DELETE_PLAYER:
    const oldPlayersArray = [...state.players];
    oldPlayersArray.splice(action.payload.player.id - 1, 1);
    return{
      ...state,
      players: oldPlayersArray,
      editedPlayer: null,
      editedPlayerIndex: -1
    }
  default:
  return state;

}
}
