import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomePageComponent } from './home-page/home-page.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainNavComponent,
    HomePageComponent
  ],
  declarations: [
    MainNavComponent,
    HomePageComponent
  ]
})
export class CoreModule { }
