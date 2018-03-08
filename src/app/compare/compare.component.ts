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
    this.playersService.getActivePlayers().subscribe( 
      (data) => {
        this.players = data.activeplayers.playerentry;
      },
      (err) => {
        console.log(err);
        this.players = [];
      }
    )
  };

  loadPlayer(player_number, player) {
    if(player_number == 'one') {
      this.playerOne = player;
      console.log('Player one', this.playerOne);
    } else if (player_number == 'two') {
      this.playerTwo = player
      console.log('Player two', this.playerTwo);
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
