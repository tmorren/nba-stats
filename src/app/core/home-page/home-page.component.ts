import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Functions } from '../../shared/functions';

/** CLASSES */
import { Article } from '../../shared/classes/article';

/** SERVICES */
import { HomeService } from './home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    articles: Article[] = [];
    // Subscriptions
    subscription: Subscription[] = [];
    todaysDate;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getNBANews();
    this.todaysDate = Functions.getTodaysDateString();
  }

  getNBANews() {
    const sub = this.homeService.getNBANews().subscribe( (data) => {
      this.articles = data.articles;
    });
    
    this.subscription.push(sub);
  }

  ngOnDestroy() {
    for (const sub of this.subscription) {
        sub.unsubscribe();
    }
  }

}
