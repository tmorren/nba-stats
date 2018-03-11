import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Functions } from '../../shared/functions';

/** Chart.js */
import { Chart } from 'chart.js';

/** CLASSES */
import { Player } from '../../shared/classes/player';

/** Services */
import { PlayersService } from '../../players/players.service';

@Component({
  selector: 'app-player-compare',
  templateUrl: './player-compare.component.html',
  styleUrls: ['./player-compare.component.css']
})
export class PlayerCompareComponent implements OnInit {
  playerOne: Player;
  playerTwo: Player;
  leagueTopStat = [];

  // Charts
  playerOneDoughnutChart: any;
  playerTwoDoughnutChart: any;
  radarChart: any;

  // Subscriptions
  subscription: Subscription[] = [];

  // Check if loaded
  infoLoaded: boolean = false;
  playerOneDoughnutLoaded: boolean = false;
  playerTwoDoughnutLoaded: boolean = false;
  radarLoaded: boolean = false;

  @Input() set playerOneSelected(player){
    this.playerOne = new Player;
    this.playerOne = player;
    if (this.playerTwo) {
      if(this.playerOneDoughnutChart !== undefined){
        this.playerOneDoughnutChart.destroy();
      }
      if(this.radarChart!== undefined){
        this.radarChart.destroy();
      }
      this.playerOneDoughnutLoaded = false;
      this.radarLoaded = false;
      Functions.sleep(1000).then(() => this.initialStatsLoad());
    }
  };
  @Input() set playerTwoSelected(player){
    this.playerTwo = new Player;
    this.playerTwo = player;
    if (this.playerOne) {
      if(this.playerTwoDoughnutChart !== undefined){
        this.playerTwoDoughnutChart.destroy();
      }
      if(this.radarChart!== undefined){
        this.radarChart.destroy();
      }
      this.playerTwoDoughnutLoaded = false;
      this.radarLoaded = false;
      Functions.sleep(1000).then(() => this.initialStatsLoad());
    }
  };

  constructor(
    private playersService: PlayersService
  ) { }

  ngOnInit() {
    if(this.radarChart !== undefined){
      this.radarChart.destroy();
      this.radarLoaded = false;
    }
  }

  createDoughnutCharts() {
    if(this.playerOneDoughnutChart !== undefined){
      this.playerOneDoughnutChart.destroy();
    }

    if(this.playerTwoDoughnutChart !== undefined){
      this.playerTwoDoughnutChart.destroy();
    }

    this.playerOneDoughnutChart = new Chart('playerOneDoughnutChart', {

      type: 'doughnut',
      data: {
        labels: ['3Pt', '2PT', 'FT'],
        datasets: [
            {
                backgroundColor: ['rgba(252,196,25, .5)', 'rgba(226,30,86, .5)', 'rgba(84,216,186, .5)'],
                data: [
                  this.playerOne.Fg3PtMadePerGame['#text'] * 3, 
                  this.playerOne.Fg2PtMadePerGame['#text'] * 2,
                  this.playerOne.FtMadePerGame['#text'],
                ]
            }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.playerOne['player'].FirstName + ' ' + this.playerOne['player'].LastName + ' Point Distribution - ' + this.playerOne.PtsPerGame['#text'] + ' ppg'
        },
        animation: false
      }
    });
    this.playerOneDoughnutLoaded = true;

    this.playerTwoDoughnutChart = new Chart('playerTwoDoughnutChart', {

      type: 'doughnut',
      data: {
        labels: ['3Pt', '2PT', 'FT'],
        datasets: [
            {
                backgroundColor: ['rgba(252,196,25, .5)', 'rgba(226,30,86, .5)', 'rgba(84,216,186, .5)'],
                data: [
                  this.playerTwo.Fg3PtMadePerGame['#text'] * 3, 
                  this.playerTwo.Fg2PtMadePerGame['#text'] * 2,
                  this.playerTwo.FtMadePerGame['#text'],
                ]
            }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.playerTwo['player'].FirstName + ' ' + this.playerTwo['player'].LastName + ' Point Distribution - ' + this.playerTwo.PtsPerGame['#text'] + ' ppg'
        },
        animation: false
      }
    });
    this.playerTwoDoughnutLoaded = true;
  }

  createRadarChart() {
    if(this.radarChart !== undefined){
      this.radarChart.destroy();
      this.radarLoaded = false;
    }

    this.radarChart = new Chart('radarChart', {
      type: 'radar',
      data: {
        labels: ['Pt', 'Reb', 'Ast', 'Stl', 'Blk'],
        datasets: [
            {
                label: this.playerOne['player'].FirstName + " " + this.playerOne['player'].LastName,
                backgroundColor: 'rgba(77,173,247, .3)',
                borderColor: '#228AE6',
                pointBackgroundColor: '#228AE6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [
                  this.playerOne.PtsPerGame['#text'] / this.leagueTopStat['PTS/G'] * 100, 
                  this.playerOne.RebPerGame['#text'] / this.leagueTopStat['REB/G'] * 100, 
                  this.playerOne.AstPerGame['#text'] / this.leagueTopStat['AST/G'] * 100, 
                  this.playerOne.StlPerGame['#text'] / this.leagueTopStat['STL/G'] * 100, 
                  this.playerOne.BlkPerGame['#text'] / this.leagueTopStat['BS/G'] * 100
                ]
            },
            {
                label: this.playerTwo['player'].FirstName + " " + this.playerTwo['player'].LastName,
                backgroundColor: 'rgba(226,30,86, .3)',
                borderColor: '#E21E56',
                pointBackgroundColor: '#E21E56',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [
                  this.playerTwo.PtsPerGame['#text'] / this.leagueTopStat['PTS/G'] * 100, 
                  this.playerTwo.RebPerGame['#text'] / this.leagueTopStat['REB/G'] * 100, 
                  this.playerTwo.AstPerGame['#text'] / this.leagueTopStat['AST/G'] * 100, 
                  this.playerTwo.StlPerGame['#text'] / this.leagueTopStat['STL/G'] * 100, 
                  this.playerTwo.BlkPerGame['#text'] / this.leagueTopStat['BS/G'] * 100
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
          text: 'Compared to League Leaders'
        },
        animation: false
      }
    });
    this.radarLoaded = true;
  }

  initialStatsLoad(){
    console.log(this.playerOne);
    console.log(this.playerTwo);

    if(Object.keys(this.leagueTopStat).length == 0) {
      this.getLeagueLeaderStats();
    } else {
      this.createRadarChart();
    }

    // if(this.playerOne && this.playerTwo){
    //   this.createDoughnutCharts();
    // }
    this.createDoughnutCharts();
    
  }

  getLeagueLeaderStats(){
    //this.leagueTopStat = [];
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
      const sub = this.playersService.getLeagueLeaders(stat['abbr'], 'latest', 1).subscribe( (data) => {
        this.leagueTopStat[stat['abbr']] = data.cumulativeplayerstats.playerstatsentry[0].stats[stat.stat]['#text'];
      },
      (err) => console.log(err),
      () => {
        if (Object.keys(this.leagueTopStat).length >= stats.length) {
          this.createRadarChart();
        }
        // this.createDoughnutChart();
      }
    );
      this.subscription.push(sub);
    });
  }

  ngOnDestroy() {
    for (const sub of this.subscription) {
        sub.unsubscribe();
    }
  }
}
