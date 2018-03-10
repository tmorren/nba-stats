import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomePageComponent } from './home-page/home-page.component'

/** SERVICES */
import { HomeService } from './home-page/home.service';

/** MODULES */
import { SearchModule } from '../shared/search/search.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SearchModule
  ],
  exports: [
    MainNavComponent,
    HomePageComponent
  ],
  declarations: [
    MainNavComponent,
    HomePageComponent
  ],
  providers: [
    HomeService
  ]
})
export class CoreModule { }
