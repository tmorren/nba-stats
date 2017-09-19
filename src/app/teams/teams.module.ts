import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TeamsComponent,
    TeamListComponent,
    TeamComponent
  ],
  exports: [
    TeamsComponent
  ],
  providers: [

  ]
})
export class TeamsModule { }
