import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SigninComponent } from './core/auth/signin/signin.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import {AppRoutingModule} from "./app-routing.module";
import {MatListModule, MatSidenavModule, MatToolbarModule} from "@angular/material";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderModule} from "./core/header/header.module";
import { SidebarComponent } from './core/sidebar/sidebar.component';
import {MediaMatcher} from "@angular/cdk/layout";
import {PlayerModule} from "./player/player.module";
import {StoreModule} from "@ngrx/store";
import {PlayerReducer} from "./player/store/player.reducer";
import {DataStorageService} from "./shared/services/data-storage.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomNumberValidator} from "./shared/services/CustomNumberValidator";
import {GamesModule} from "./games/game.module";
import {GameReducer} from "./games/store/game.reducer";
import {ReactiveFormsModule} from "@angular/forms";
import {DataPlayerInitService} from "./shared/services/data-player-init.service";
import {DataGameInitService} from "./shared/services/data-game-init.service";
import {AuthService} from "./auth/auth.service";
import {TokenInterceptorService} from "./shared/services/token-interceptor.service";
import { JwtModule } from '@auth0/angular-jwt';
import {AuthModule} from "./auth/auth.module";
import {TokenStorageService} from "./shared/services/token-storage.service";
import {AuthGuardService} from "./shared/guards/auth-guard.service";


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    GamesModule,
    AuthModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule,
    HeaderModule,
    PlayerModule,
    MatSidenavModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({players: PlayerReducer, games: GameReducer} ),
  ],
  providers: [
    MediaMatcher,
    DataStorageService,
    CustomNumberValidator,
    DataPlayerInitService,
    DataGameInitService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    TokenStorageService,
    AuthGuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
