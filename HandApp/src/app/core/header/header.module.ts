import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent} from "./header.component";
import {
  MatButtonModule, MatIcon, MatIconModule, MatListModule, MatMenuModule,
  MatSidenavModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {HomeComponent} from "../home/home.component";

@NgModule({
  declarations: [ HeaderComponent, HomeComponent ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
  ],
  exports: [
    CommonModule,
    MatMenuModule,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
})
export class HeaderModule { }
