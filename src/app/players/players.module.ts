import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player-list/player-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlayerComponent,
    PlayerListComponent
  ]
})
export class PlayersModule { }
