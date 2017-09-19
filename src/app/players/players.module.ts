import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player-list/player-list.component';

@NgModule({
  imports: [
    CommonModule,
    PlayersRoutingModule
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
