import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {AuthService} from "../auth.service";
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  _username: string;
  _password: string;

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorageService) { }

  ngOnInit() {
    this.initForm();
    }

  initForm(){
    this.loginForm = new FormGroup({
        '_username' : new FormControl('', Validators.required),
      '_password' : new FormControl('', Validators.required)
    });

  }

  submit(){
    this._username = this.loginForm.value._username;
    this._password = this.loginForm.value._password;
    this.login();
  }

  login() {
    this.authService.attemptAuth(this._username, this._password).subscribe(
      (data) => {
        this.token.saveToken(data.token);
        this.router.navigate(['/']);
      })
  }


}
