import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game-list/game-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'games',
            component: GameListComponent,
            children: [
                {
                    path: ':id',
                    component: GameComponent
                },
            ]
        }
    ])
],
exports: [ RouterModule ]
})
export class GamesRoutingModule { }
