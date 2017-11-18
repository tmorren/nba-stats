import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-log',
  templateUrl: './game-log.component.html',
  styleUrls: ['./game-log.component.css']
})
export class GameLogComponent implements OnInit {

  @Input() player: number;
  mostRecentGame;
  gameLogs;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService) { 
    }

  ngOnInit() {
    this.getPlayerGameLog(this.player);
    console.log(this.player);
  }


  getPlayerGameLog(player, season = 'latest'){
    this.gamesService.getPlayerGameLog(player, season).subscribe( (data) => {
      console.log(data);
      this.gameLogs = data.playergamelogs.gamelogs;
      this.gameLogs.reverse();
      this.mostRecentGame = this.gameLogs[0];
      console.log(this.gameLogs);
    });
  }
}
