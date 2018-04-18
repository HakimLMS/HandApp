import { Injectable } from '@angular/core';
import  'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {
 constructor(private http: HttpClient){}

  attemptAuth(_username: string, _password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        '_username' : _username.toString(),
        '_password' : _password.toString()
      })
    };

    const credentials = {'_username' : _username.toString(),
      '_password' : _password.toString()}


    console.log(httpOptions + ' ' + credentials);
    return this.http.post('http://92.222.217.92/api/login_check', credentials, httpOptions);

  }

}
