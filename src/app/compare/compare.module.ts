import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule,SharedModule } from 'primeng/primeng';

/** COMPONENTS */
import { CompareComponent } from './compare.component';
import { CompareSelectComponent } from './compare-select/compare-select.component';
import { CompareSelectedPlayerComponent } from './compare-selected-player/compare-selected-player.component';
//import { ComparePlayersComponent } from './compare-players/compare-players.component';

/** MODULES */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompareRoutingModule } from './compare-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayerCompareComponent } from './player-compare/player-compare.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CompareRoutingModule,
    DataTableModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CompareComponent,
    CompareSelectComponent,
    CompareSelectedPlayerComponent,
    PlayerCompareComponent
  ]
})
export class CompareModule { }
