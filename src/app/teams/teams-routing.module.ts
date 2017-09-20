import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'teams',
            component: TeamsComponent,
            children: [
                {
                    path: '',
                    component: TeamListComponent
                },
                {
                    path: ':id',
                    component: TeamComponent
                }
            ]
        }
    ])
],
exports: [ RouterModule ]
})
export class TeamsRoutingModule { }
