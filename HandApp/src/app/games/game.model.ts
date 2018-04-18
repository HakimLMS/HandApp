import {Player} from "../player/player.model";
import {Moment} from "moment";


export class Game{
  constructor(public id: number, public date :string, public home_team: string, public away_team: string, public roster: Player[], public passed: boolean){
  }
}
