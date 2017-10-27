import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { GamesService } from './games.service';
import { GamesComponent } from './games.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';
import { GameLogComponent } from './game-log/game-log.component';
import { DataTableModule,SharedModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    GamesRoutingModule
  ],
  declarations: [
    GamesComponent, 
    GameListComponent, 
    GameComponent, 
    GameLogComponent
  ],
  exports: [
    GameComponent,
    GamesComponent,
    GameListComponent,
    GameLogComponent
  ],
  providers: [
    GamesService
  ]
})
export class GamesModule { }
