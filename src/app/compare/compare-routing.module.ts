import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompareComponent } from './compare.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'compare',
            component: CompareComponent,
        }
    ])
],
exports: [ RouterModule ]
})
export class CompareRoutingModule { }
