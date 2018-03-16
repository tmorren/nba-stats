import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

/** SERVICES */
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  selectedGame: number;
  game;
  quarterSummary;
  awayTeam;
  homeTeam;

  // Subscriptions
  stream: Subscription;
  subscription: Subscription[] = [];
  watchForIdChange: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService) { }

  ngOnInit() {
    this.watchForIdChange = this.route.params.subscribe(
      (params) => {

        for (const sub of this.subscription) {
          sub.unsubscribe();
        }

        this.selectedGame = params['id'];
        this.getGameBoxscore();
      }
    );
  }

  getGameBoxscore(){
    const sub = this.gamesService.getGameBoxscore(this.selectedGame).subscribe( (data) => {
      console.log(data);
      this.game = data.gameboxscore.game
      this.quarterSummary = data.gameboxscore.quarterSummary;
      this.awayTeam = data.gameboxscore.awayTeam;
      this.homeTeam = data.gameboxscore.homeTeam;

      console.log('Game', this.game);
      console.log('Quarter sum', this.quarterSummary);
      console.log('awayTeam', this.awayTeam);
      console.log('homeTeam', this.homeTeam);
    });
    
    this.subscription.push(sub);
  }

}
