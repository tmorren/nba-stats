import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../players.service';
import { Subscription } from 'rxjs/Subscription';

import { Functions } from '../../shared/functions';
import { Team } from '../../shared/classes/team';
import { Player } from '../../shared/classes/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players:  Player[] = [];

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    if(this.players.length == 0){
      this.getPlayers();
    }
  }

  getPlayers(){
    this.playersService.getPlayers().subscribe( (data) => {
      for(var i = 0; i < data.cumulativeplayerstats.playerstatsentry.length; i++){
        let playerInfo = data.cumulativeplayerstats.playerstatsentry[i].player;
        let playerStats = data.cumulativeplayerstats.playerstatsentry[i].stats;
        let player = new Player;

        player = Object.assign(player, playerInfo);
        player = Object.assign(player, playerStats);
        this.players.push(player);
        console.log(player.FirstName);
      }
      
      console.log(this.players);
    });
  }

  sortPlayers(players, sortBy){
  }
}
