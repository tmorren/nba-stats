import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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

  // Subscriptions
  subscription: Subscription[] = [];

  constructor( 
    private router: Router,
    private playersService: PlayersService
  ) { }

  ngOnInit() {
    this.players = [];
    this.getActivePlayers();
  }

  getActivePlayers() {
    const sub = this.playersService.getActivePlayersForSearch().subscribe( 
      (data) => {
        console.log(data);
        this.players = [];
        this.players = data.activeplayers.playerentry;
      },
      (err) => {
        this.players = [];
      }
    );

    this.subscription.push(sub);
  };

  navigateToPlayer(evt) {
    this.router.navigate(['/players', evt.player.ID]); 
  }

  ngOnDestroy() {
    for (const sub of this.subscription) {
        sub.unsubscribe();
    }
  }

}
