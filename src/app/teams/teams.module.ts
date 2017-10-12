import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamComponent } from './team/team.component';
import { DataTableModule,SharedModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    DataTableModule,
    SharedModule
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
