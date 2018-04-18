import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../shared/services/token-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  token: boolean;

  constructor(private tokenStorageService : TokenStorageService) { }

  ngOnInit() {
    this.tokenStorageService.getToken() != null? this.token = true: this.token = false;
  }

  logout(){
    this.tokenStorageService.signOut();
  }
}
