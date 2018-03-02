import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { GamesModule } from '../games/games.module'
import { DataTableModule,SharedModule } from 'primeng/primeng';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    GamesModule,
    MatProgressSpinnerModule,
    PlayersRoutingModule,
    SharedModule
  ],
  declarations: [
    PlayersComponent,
    PlayerComponent,
    PlayerListComponent
  ],
  exports: [
    PlayersComponent
  ],
  providers: [

  ]
})
export class PlayersModule { }
