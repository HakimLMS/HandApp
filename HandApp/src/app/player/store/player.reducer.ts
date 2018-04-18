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
  players: [],
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
