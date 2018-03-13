import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

/** CLASSES */
import { Player } from '../shared/classes/player';

/** SERVICES */
import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  players:  Player[] = [];
  playerOne: Player;
  playerTwo: Player;

  subscription: Subscription[] = [];

  constructor(private playersService: PlayersService) { 
    
  }

  ngOnInit() {
    this.getActivePlayers();
  }

  getActivePlayers() {
    const sub = this.playersService.getActivePlayers().subscribe( 
      (data) => {
        this.players = [];
        this.players = data.activeplayers.playerentry;
      },
      (err) => {
        console.log(err);
        this.players = [];
      }
    );

    this.subscription.push(sub);
  };

  loadPlayer(player_number, player) {
    if(player_number == 'one') {
      this.playerOne = new Player;
      this.playerOne = player;
    } else if (player_number == 'two') {
      this.playerTwo = new Player;
      this.playerTwo = player;
    }
    
    this.getPlayerStats(player_number, player.player.ID);
  }

  getPlayerStats(player_number, player){
    const sub = this.playersService.getPlayerStats(player).subscribe( (data) => {
     
      let playerStats = data.cumulativeplayerstats.playerstatsentry[0].stats;

      if(player_number == 'one') {
        this.playerOne = Object.assign(this.playerOne, playerStats);
      } else if (player_number == 'two') {
        this.playerTwo = Object.assign(this.playerTwo, playerStats);
      }

    });

    this.subscription.push(sub);
  }

  ngOnDestroy() {
    for (const sub of this.subscription) {
        sub.unsubscribe();
    }
  }

}
