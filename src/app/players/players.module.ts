import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { DataTableModule,SharedModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    PlayersRoutingModule,
    DataTableModule,
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
