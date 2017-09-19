import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GamesComponent, GameListComponent, GameComponent]
})
export class GamesModule { }
