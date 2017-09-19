import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';

@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule
  ],
  declarations: [
    GamesComponent, 
    GameListComponent, 
    GameComponent
  ],
  exports: [
    GamesComponent
  ],
  providers: [

  ]
})
export class GamesModule { }
