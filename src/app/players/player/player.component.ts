import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayersService } from '../players.service';
import { Subscription } from 'rxjs/Subscription';

import { Functions } from '../../shared/functions';
import { Player } from '../../shared/classes/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player;
  selectedPlayer: number;
  stream: Subscription;
  watchForIdChange: Subscription;
  //mainStats = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private playersService: PlayersService) { 

  }

  ngOnInit() {
    this.watchForIdChange = this.route.params.subscribe(params => {
      this.selectedPlayer = params['id'];
      if(this.stream) {
        this.stream.unsubscribe();
      }

      this.player = new Player;
      this.getPlayerStats(this.selectedPlayer);
      this.getPlayerInfo(this.selectedPlayer)
    });

    //this.mainStats.push(this.player.PtsPerGame);
    console.log(this.player);
  }

  getPlayerInfo(player){
    this.playersService.getPlayerInfo(player).subscribe( (data) => {
      let playerInfo = data.activeplayers.playerentry[0].player;
      
      this.player = Object.assign(this.player, playerInfo);
    });
  }

  getPlayerStats(player){
    this.playersService.getPlayerStats(player).subscribe( (data) => {
      let playerStats = data.cumulativeplayerstats.playerstatsentry[0].stats;

      this.player = Object.assign(this.player, playerStats);
    });
  }

}
