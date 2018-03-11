import { Component, OnInit } from '@angular/core';

/** SERVICES */
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  todaysGames = [];

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.getTodaysGames();
  }

  getTodaysGames() {
    this.gamesService.getGameList().subscribe( 
      (data) => {
        this.todaysGames = data.scoreboard.gameScore;

        for(let i = 0;i < this.todaysGames.length; i++ ){

          if(this.todaysGames[i].currentQuarterSecondsRemaining){
            let time = this.todaysGames[i].currentQuarterSecondsRemaining;
            let minutes = Math.floor(time / 60);
            let seconds = time - minutes * 60;
            this.todaysGames[i].currentQuarterTimeRemaining = String(minutes) + ":" + String(seconds);
          }
        }
        console.log(this.todaysGames);
      },
      (err) => {
        console.log(err);
        this.todaysGames = [];
      }
    )
  }

}
