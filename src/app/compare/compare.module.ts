import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** COMPONENTS */
import { CompareComponent } from './compare.component';
import { CompareSelectComponent } from './compare-select/compare-select.component';
//import { ComparePlayersComponent } from './compare-players/compare-players.component';

/** MODULES */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompareRoutingModule } from './compare-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CompareRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CompareComponent,
    CompareSelectComponent
  ]
})
export class CompareModule { }
