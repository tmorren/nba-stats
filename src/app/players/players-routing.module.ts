import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayersComponent } from './players.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player-list/player-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'players',
            component: PlayerListComponent,
            children: [
                {
                    path: ':id',
                    component: PlayerComponent
                },
            ]
        }
    ])
],
exports: [ RouterModule ]
})
export class PlayersRoutingModule { }
