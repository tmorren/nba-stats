import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getNBANews();
  }

  getNBANews() {
    const sub = this.homeService.getNBANews().subscribe( (data) => {
      console.log(data);
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
