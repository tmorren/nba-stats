import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/** COMPONENTS */
import { CompareComponent } from './compare.component';
//import { ComparePlayersComponent } from './compare-players/compare-players.component';

/** MODULES */
import { CompareRoutingModule } from './compare-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    CompareRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    CompareComponent
  ]
})
export class CompareModule { }
