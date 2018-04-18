import { Injectable } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class AuthGuardService  implements CanActivate {

  constructor(private tokenStorage: TokenStorageService, private router: Router){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let tokenSet;
    this.tokenStorage.getToken() != null ? tokenSet = true : tokenSet = false;
    tokenSet == false ? this.router.navigate(['/login']): '';
    return tokenSet;
  }
}
