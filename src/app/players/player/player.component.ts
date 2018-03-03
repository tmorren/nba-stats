import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

/** CLASSES */
import { Functions } from '../../shared/functions';
import { Player } from '../../shared/classes/player';

/** SERVICES */
import { PlayersService } from '../players.service';
import { GamesService } from '../../games/games.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  gameLogs;
  leagueTopStat = [];
  monthAverages;
  monthStatsLoaded: boolean = false;
  player: Player;
  selectedPlayer: number;
  stream: Subscription;
  statsLoaded: boolean = false;
  subscription: Subscription[] = [];
  infoLoaded: boolean = false;
  watchForIdChange: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private playersService: PlayersService,
    private gamesService: GamesService
  ) { 

  }

  ngOnInit() {
    this.watchForIdChange = this.route.params.subscribe(
      (params) => {
        this.selectedPlayer = params['id'];
        if(this.stream) {
          this.stream.unsubscribe();
        }

        this.player = new Player;

        this.getPlayerStats(this.selectedPlayer);
        this.getPlayerInfo(this.selectedPlayer);
        this.getPlayerGameLogPastMonth(this.selectedPlayer);
      },
      (err) => console.log('Error!'),
      ()=> this.getPlayerStats(this.selectedPlayer)
    );

    console.log(this.player);
  }

  createRadarChart() {
    console.log('Radar Chart!');
  }

  getLeagueLeaderStatsByPosition() {
    const stats = [
      {
        'stat' : 'PtsPerGame',
        'abbr' : 'PTS/G'
      },
      {
        'stat' : 'AstPerGame',
        'abbr' : 'AST/G'
      },
      {
        'stat' : 'RebPerGame',
        'abbr' : 'REB/G'
      },
      {
        'stat' : 'StlPerGame',
        'abbr' : 'STL/G'
      },
      {
        'stat' : 'BlkPerGame',
        'abbr' : 'BS/G'
      }
    ];

    stats.forEach( stat => {
      const sub = this.playersService.getLeagueLeaders(stat['abbr'], 'latest', 1, this.player.Position).subscribe( (data) => {
        this.leagueTopStat[stat['abbr']] = data.cumulativeplayerstats.playerstatsentry[0].stats[stat.stat]['#text'];
      },
      (err) => console.log(err),
      () => {
        if (Object.keys(this.leagueTopStat).length >= stats.length) {
          this.createRadarChart();
        }
      }
    );
      this.subscription.push(sub);
    });
    
  }

  getPlayerInfo(player){
    this.playersService.getPlayerInfo(player).subscribe( (data) => {
      let playerInfo = data.activeplayers.playerentry[0].player;
      
      this.player = Object.assign(this.player, playerInfo);
      this.getLeagueLeaderStatsByPosition();
    });
  }

  getPlayerStats(player){
    this.playersService.getPlayerStats(player).subscribe( (data) => {
      let playerStats = data.cumulativeplayerstats.playerstatsentry[0].stats;

      this.player = Object.assign(this.player, playerStats);
      this.statsLoaded = true;
    });
  }

  getPlayerGameLogPastMonth(player) {
    this.gamesService.getPlayerGameLogPastMonth(player).subscribe( (data) => {
      this.gameLogs = data.playergamelogs.gamelogs;
      if (this.gameLogs.length < 0){
        return [];
      }
      this.gameLogs.reverse();

      const averages = ['Pts', 'Reb', 'Ast', 'Stl', 'Blk', 'Tov', 'FgMade', 'FgAtt',
                        'Fg3PtMade', 'Fg3PtAtt', 'FtMade', 'FtAtt'];
      this.monthAverages = [];

      for(let stat of averages) {
        this.monthAverages[stat] = [];
        this.monthAverages[stat]['total'] = 0;
        for(let i=0; i < this.gameLogs.length; i++) {
          this.monthAverages[stat]['total'] += Number(this.gameLogs[i].stats[stat]['#text']);
        }
        this.monthAverages[stat]['average'] = Number((this.monthAverages[stat]['total'] / this.gameLogs.length).toFixed(1));
      }

      this.monthAverages['FgPct'] = [];
      this.monthAverages['Fg3PtPct'] = [];
      this.monthAverages['FtPct'] = [];

      this.monthAverages['FgPct']['total'] = ((this.monthAverages['FgMade']['average'] / this.monthAverages['FgAtt']['average']) * 100).toFixed(1);
      this.monthAverages['Fg3PtPct']['total'] = ((this.monthAverages['Fg3PtMade']['average'] / this.monthAverages['Fg3PtAtt']['average']) * 100).toFixed(1);
      this.monthAverages['FtPct']['total'] = ((this.monthAverages['FtMade']['average'] / this.monthAverages['FtAtt']['average']) * 100).toFixed(1);

      this.monthStatsLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.stream) {
      this.stream.unsubscribe();
    }
    if (this.watchForIdChange) {
      this.watchForIdChange.unsubscribe();
    }

    for (const sub of this.subscription) {
        sub.unsubscribe();
    }
  }
}
