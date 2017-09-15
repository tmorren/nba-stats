import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component'

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MainNavComponent
  ],
  declarations: [
    MainNavComponent
  ]
})
export class CoreModule { }
