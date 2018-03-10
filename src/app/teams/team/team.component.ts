import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

/** Chart.js */
import { Chart } from 'chart.js';

/** CLASSES */
import { Functions } from '../../shared/functions';
import { Team } from '../../shared/classes/team';
import { Player } from '../../shared/classes/player';

/** SERVICES */
import { TeamsService } from '../teams.service';
import { GamesService } from '../../games/games.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  gameLogs;
  leagueTopStat = [];
  monthAverages;
  players: Player[] = [];
  selectedTeam: string;
  team: Team;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private teamsService: TeamsService) { }

  ngOnInit() {
    this.watchForIdChange = this.route.params.subscribe(params => {
      
      this.selectedTeam = params['abbreviation'];
      if(this.stream) {
        this.stream.unsubscribe();
      }

      if(this.radarChart !== undefined){
        this.radarChart.destroy();
      }

      if(this.doughnutChart !== undefined){
        this.doughnutChart.destroy();
      }

      this.getTeamInfo(this.selectedTeam);
      this.getTeamPlayers(this.selectedTeam);
      this.getTeamGameLogPastMonth(this.selectedTeam);
    });
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
                  this.team.Fg3PtMadePerGame['#text'] * 3, 
                  this.team.Fg2PtMadePerGame['#text'] * 2,
                  this.team.FtMadePerGame['#text'],
                ]
            }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.team.City + ' ' + this.team.Name + ' Point Distribution - ' + this.team.PtsPerGame['#text'] + ' ppg'
        },
        animation: false
      }
    });
    this.doughnutLoaded = true;
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
                label: 'Stat as  % of League Leader',
                backgroundColor: 'rgba(77,173,247, .5)',
                borderColor: '#228AE6',
                pointBackgroundColor: '#228AE6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [
                  this.team.PtsPerGame['#text'] / this.leagueTopStat['PTS/G'] * 100, 
                  this.team.RebPerGame['#text'] / this.leagueTopStat['REB/G'] * 100, 
                  this.team.AstPerGame['#text'] / this.leagueTopStat['AST/G'] * 100, 
                  this.team.StlPerGame['#text'] / this.leagueTopStat['STL/G'] * 100, 
                  this.team.BlkPerGame['#text'] / this.leagueTopStat['BS/G'] * 100
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
          text: this.team.City + ' ' + this.team.Name + ' vs. League Leader'
        },
        animation: false
      }
    });
    this.radarLoaded = true;
  }

  getLeagueLeaderStats() {
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
      const sub = this.teamsService.getLeagueLeaders(stat['abbr'], 'latest', 1).subscribe( (data) => {
        this.leagueTopStat[stat['abbr']] = data.overallteamstandings.teamstandingsentry[0].stats[stat.stat]['#text'];
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

  getTeamGameLogPastMonth(team) {
    const sub = this.gamesService.getTeamGameLogPastMonth(team).subscribe( (data) => {
      this.gameLogs = data.teamgamelogs.gamelogs;

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

  getTeamInfo(team){
    this.teamsService.getTeamInfo(team).subscribe( (data) => {
      let teamInfo = data.overallteamstandings.teamstandingsentry[0].team;
      let teamStats = data.overallteamstandings.teamstandingsentry[0].stats;

      team = new Team;
      this.team = Object.assign(team, teamInfo);
      this.team = Object.assign(team, teamStats);
      this.getLeagueLeaderStats();
      console.log(team);
    });
  }

  getTeamPlayers(team){
    this.teamsService.getTeamPlayers(team).subscribe( (data) => {
      for(var i = 0; i < data.cumulativeplayerstats.playerstatsentry.length; i++){
        let playerInfo = data.cumulativeplayerstats.playerstatsentry[i].player;
        let playerStats = data.cumulativeplayerstats.playerstatsentry[i].stats;
        let player = new Player;

        player = Object.assign(player, playerInfo);
        player = Object.assign(player, playerStats);
        this.players.push(player);
      }
    });
  }

  sortPlayers(players, sortBy){
    this.players = Functions.sort(players, sortBy);
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
