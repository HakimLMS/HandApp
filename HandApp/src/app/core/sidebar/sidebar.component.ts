import {Component, OnChanges, OnInit} from '@angular/core';
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  token: boolean;

  constructor(private tokenStorageService : TokenStorageService, private router : Router) { }

  ngOnInit() {
    this.token = true;
  }

  logout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }
}
