import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** CLASSES */
import { Player } from '../../shared/classes/player';

/** SERVICES */
import { PlayersService } from '../../players/players.service'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  players:  Player[] = [];

  constructor( 
    private router: Router,
    private playersService: PlayersService
  ) { }

  ngOnInit() {
    this.players = [];
    this.getActivePlayers();
  }

  getActivePlayers() {
    this.playersService.getActivePlayers().subscribe( 
      (data) => {
        console.log(data);
        this.players = data.activeplayers.playerentry;
      },
      (err) => {
        console.log(err);
        this.players = [];
      }
    )
  };

  navigateToPlayer(evt) {
    console.log(evt);
    this.router.navigate(['/players', evt.player.ID]); 
  }

}
