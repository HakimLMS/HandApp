import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {DataStorageService} from "../shared/services/data-storage.service";
import {Observable} from "rxjs/Observable";
import {Player} from "./player.model";
import {Injectable} from "@angular/core";

@Injectable()
export class PlayerResolver implements Resolve<Player>{
  constructor(private datastorage: DataStorageService){}
  resolve(route:ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<Player> {

  return this.datastorage.getPlayer(+route.paramMap.get('id'));
  }
}
