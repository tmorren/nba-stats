import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Functions } from '../../shared/functions';

/** SERVICES */
import { PlayersService } from '../../players/players.service';

@Component({
  selector: 'app-league-leaders',
  templateUrl: './league-leaders.component.html',
  styleUrls: ['./league-leaders.component.css']
})
export class LeagueLeadersComponent implements OnInit {

  arrayOfKeys;
  leagueLeaders = [];
  leagueLeadersLoaded: boolean = false;
  loadingFail: boolean = false;

  // Subscriptions
  subscription: Subscription[] = [];

  constructor(
    private playersService: PlayersService
  ) { 
    
  }

  ngOnInit() {
    this.loadLeagueLeaders();
  }

  loadLeagueLeaders() {
    const stats = [
      {
        'stat' : 'PtsPerGame',
        'abbr' : 'PTS/G',
        'title' : 'Points Per Game'
      },
      {
        'stat' : 'AstPerGame',
        'abbr' : 'AST/G',
        'title' : 'Assists Per Game'
      },
      {
        'stat' : 'RebPerGame',
        'abbr' : 'REB/G',
        'title' : 'Rebounds Per Game'
      },
      {
        'stat' : 'StlPerGame',
        'abbr' : 'STL/G',
        'title' : 'Steals Per Game'
      },
      {
        'stat' : 'BlkPerGame',
        'abbr' : 'BS/G',
        'title' : 'Blocks Per Game'
      },
      {
        'stat' : 'Fg3PtMade',
        'abbr' : '3PM',
        'title' : 'Three Pointers Made'
      }
    ];

    stats.forEach( stat => {
      Functions.sleep(1000).then(() =>
        {   
          const sub = this.playersService.getLeagueLeaders(stat['abbr'], 'latest', 10).subscribe( (data) => {
            this.leagueLeaders[stat['abbr']] = data.cumulativeplayerstats.playerstatsentry;
            this.leagueLeaders[stat['abbr']].stat = stat['stat'];
            this.leagueLeaders[stat['abbr']].title = stat['title'];
          },
          (err) => {
            this.leagueLeadersLoaded = true;
            this.loadingFail = true;
          },
          () => {
            if (Object.keys(this.leagueLeaders).length >= stats.length) {
              this.arrayOfKeys = Object.keys(this.leagueLeaders);
              this.leagueLeadersLoaded = true;

              for (const sub of this.subscription) {
                sub.unsubscribe();
              }
            }
          })
          this.subscription.push(sub);
        }
      );
      
    });
  }

  ngOnDestroy() {
    for (const sub of this.subscription) {
        sub.unsubscribe();
    }
  }
}
