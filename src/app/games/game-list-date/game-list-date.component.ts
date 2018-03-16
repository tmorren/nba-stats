import { Component, OnInit, Input } from '@angular/core';

/** SERVICES */
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-list-date',
  templateUrl: './game-list-date.component.html',
  styleUrls: ['./game-list-date.component.css']
})
export class GameListDateComponent implements OnInit {

  @Input() set date (date) {
    this.getGames(String(date));
  };
  @Input() title;

  games = [];

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit() {
  }

  getGames(date) {
    this.gamesService.getGameList(date).subscribe( 
      (data) => {
        this.games = data.scoreboard.gameScore;

        for(let i = 0;i < this.games.length; i++ ){

          if(this.games[i].currentQuarterSecondsRemaining){
            let time = this.games[i].currentQuarterSecondsRemaining;
            let minutes = Math.floor(time / 60);
            let seconds = time - minutes * 60;
            this.games[i].currentQuarterTimeRemaining = String(minutes) + ":" + String(seconds);
          }
        }
      },
      (err) => {
        console.log(err);
        this.games = [];
      }
    )
  }

}
