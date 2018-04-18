import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Player} from "../../player/player.model";
import "rxjs/Rx";
import {Game} from "../../games/game.model";
import {Message} from "../message.model";

@Injectable()
export class DataStorageService {
   players: Player[] = [];
  constructor(private httpClient: HttpClient){}

  getPlayers()  {
    this.httpClient.get<Player[]>('http://http://92.222.217.92/index.php/api/players',{ observe: 'body',
    responseType: 'json'}).subscribe((players) => {
     for(let player of players)
     {
       this.players.push(player);
     }
    });
    return this.players;
  }

  getPlayer(id: number)  {
    return this.httpClient.get<Player>('http://http://92.222.217.92/index.php/api/players/'+id, {observe: 'body', responseType:'json'});
  }

  addPlayer(player: Player) {
    return this.httpClient.post<Player>('http://http://92.222.217.92/index.php/api/players/create', player);
  }

  udpadatePlayer(player: Player) {
    return this.httpClient.put<Player>('http://http://92.222.217.92/index.php/api/players/edit/'+ player.id, player);
  }

  deletePlayer(player: Player) {
    return this.httpClient.delete<Player>('http://http://92.222.217.92/index.php/api/players/delete/'+ player.id);
  }

  getGames(){
    return this.httpClient.get<Game[]>('http://http://92.222.217.92/index.php/api/games');
  }

  getGame(id: number) {
    return this.httpClient.get<Game>('http://http://92.222.217.92/index.php/api/games'+id);
  }

  deleteGame(game: Game){
    return this.httpClient.delete<Game>('http://http://92.222.217.92/index.php/api/games/delete/'+ game.id);
  }

  updateGame(game: Game){
    return this.httpClient.put<Game>('http://http://92.222.217.92/index.php/api/games/update' + game.id, game);
  }

  addGame(game: Game)
  {
    return this.httpClient.post<Game>('http://http://92.222.217.92/index.php/api/games/add', game);
  }

  sendMessage(message: Message){
    return this.httpClient.post<Message>('http://http://92.222.217.92/index.php/twitter/post', message);
  }
}
