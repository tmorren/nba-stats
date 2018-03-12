import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


/** Chart.js */
import { Chart } from 'chart.js';

/** PrimeNG */
import { UIChart } from 'primeng/primeng';

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
  player: Player;
  // radarChartData: any;
  selectedPlayer: number;

  // Charts
  doughnutChart: any;
  radarChart: any;
  
  // Subscriptions
  stream: Subscription;
  subscription: Subscription[] = [];
  watchForIdChange: Subscription;

  // Check if loaded
  infoLoaded: boolean = false;
  monthStatsLoaded: boolean = false;
  doughnutLoaded: boolean = false;
  radarLoaded: boolean = false;
  statsLoaded: boolean = false;

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

        for (const sub of this.subscription) {
          sub.unsubscribe();
        }

        if(this.doughnutChart !== undefined){
          this.doughnutChart.destroy();
        }

        if(this.radarChart !== undefined){
          this.radarChart.destroy();
        }

        this.infoLoaded = false;
        this.monthStatsLoaded= false;
        this.doughnutLoaded= false;
        this.radarLoaded = false;
        this.statsLoaded = false;

        this.player = new Player;

        this.getPlayerStats(this.selectedPlayer);
        this.getPlayerInfo(this.selectedPlayer);
        this.getPlayerGameLogPastMonth(this.selectedPlayer);
      }
    );

    console.log(this.player);
  }

  createRadarChart() {
    if(this.radarChart !== undefined){
      this.radarChart.destroy();
    }

    this.radarChart = new Chart('radarChart', {
      type: 'radar',
      data: {
        labels: ['Pt', 'Reb', 'Ast', 'Stl', 'Blk'],
        datasets: [
            {
                label: 'Stat as  % of League Leader at ' + this.player.Position,
                backgroundColor: 'rgba(77,173,247, .5)',
                borderColor: '#228AE6',
                pointBackgroundColor: '#228AE6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [
                  this.player.PtsPerGame['#text'] / this.leagueTopStat['PTS/G'] * 100, 
                  this.player.RebPerGame['#text'] / this.leagueTopStat['REB/G'] * 100, 
                  this.player.AstPerGame['#text'] / this.leagueTopStat['AST/G'] * 100, 
                  this.player.StlPerGame['#text'] / this.leagueTopStat['STL/G'] * 100, 
                  this.player.BlkPerGame['#text'] / this.leagueTopStat['BS/G'] * 100
                ]
            }
        ]
      },
      options: {
        scale: {
          ticks: {
              min: 0,
              max: 100
          }
        },
        title: {
          display: true,
          text: this.player.FirstName + ' ' + this.player.LastName + ' vs. League Leader at ' + this.player.Position
        },
        animation: false
      }
    });
    this.radarLoaded = true;
  }

  createDoughnutChart() {
    if(this.doughnutChart !== undefined){
      this.doughnutChart.destroy();
    }

    this.doughnutChart = new Chart('doughnutChart', {

      type: 'doughnut',
      data: {
        labels: ['3Pt', '2PT', 'FT'],
        datasets: [
            {
                backgroundColor: ['rgba(252,196,25, .5)', 'rgba(226,30,86, .5)', 'rgba(84,216,186, .5)'],
                data: [
                  this.player.Fg3PtMadePerGame['#text'] * 3, 
                  this.player.Fg2PtMadePerGame['#text'] * 2,
                  this.player.FtMadePerGame['#text'],
                ]
            }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.player.FirstName + ' ' + this.player.LastName + ' Point Distribution - ' + this.player.PtsPerGame['#text'] + ' ppg'
        },
        animation: false
      }
    });
    this.doughnutLoaded = true;
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
        this.createDoughnutChart();
      }
    );
      this.subscription.push(sub);
    });
    
  }

  getPlayerInfo(player){
    const sub = this.playersService.getPlayerInfo(player).subscribe( (data) => {
      let playerInfo = data.activeplayers.playerentry[0].player;
      let teamInfo = data.activeplayers.playerentry[0].team;
      this.player['team'] = {};
      
      this.player = Object.assign(this.player, playerInfo);
      this.player['team'] = Object.assign(this.player['team'], teamInfo);
      this.getLeagueLeaderStatsByPosition();
    });
    
    this.subscription.push(sub);
  }

  getPlayerStats(player){
    const sub = this.playersService.getPlayerStats(player).subscribe( (data) => {
      let playerStats = data.cumulativeplayerstats.playerstatsentry[0].stats;

      this.player = Object.assign(this.player, playerStats);
      this.statsLoaded = true;
    });

    this.subscription.push(sub);
  }

  getPlayerGameLogPastMonth(player) {
    const sub = this.gamesService.getPlayerGameLogPastMonth(player).subscribe( (data) => {
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

    this.subscription.push(sub);
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
