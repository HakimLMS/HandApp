import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

const TOKEN_KEY = "AuthToken"

@Injectable()
export class TokenStorageService {
  constructor() { }



  signOut() {

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string)
  {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(){
    return window.sessionStorage.getItem(TOKEN_KEY);
  }


}
