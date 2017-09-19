import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import { HomePageComponent } from './core/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'teams',
    loadChildren: 'app/teams/teams.module#TeamsModule'
  },
  {
    path: 'players',
    loadChildren: 'app/players/players.module#PlayersModule'
  },
  {
    path: 'games',
    loadChildren: 'app/games/games.module#GamesModule'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
