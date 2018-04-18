import { Injectable } from '@angular/core';
import {
  HttpHandler, HttpInterceptor, HttpEvent, HttpRequest, HttpUserEvent,
  HttpErrorResponse
} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {Observable} from 'rxjs/Observable';
import {User} from "../../auth/user.model";
import {Router} from "@angular/router";
import {TokenStorageService} from "./token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization'

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private token: TokenStorageService) {}

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    let authReq = request;
    if (this.token.getToken() != null ) {
      authReq = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
     return next.handle(authReq).do(
       (error) => {
         if(error instanceof HttpErrorResponse ) {
           if(error.status === 401) {
             this.router.navigate(['login']);
           }
         }
       }
     )
    }
}
