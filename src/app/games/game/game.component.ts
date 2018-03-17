import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

/** Chart.js */
import { Chart } from 'chart.js';

/** SERVICES */
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  selectedGame: number;
  game;
  quarterSummary;
  awayTeam;
  homeTeam;
  showAwayTeam: boolean = true;
  showHomeTeam: boolean = false;

  // Charts
  awayDoughnutChart: any;
  homeDoughnutChart: any;
  groupedBarChart: any;

  // Subscriptions
  stream: Subscription;
  subscription: Subscription[] = [];
  watchForIdChange: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService) { }

  ngOnInit() {
    this.watchForIdChange = this.route.params.subscribe(
      (params) => {

        for (const sub of this.subscription) {
          sub.unsubscribe();
        }

        this.selectedGame = params['id'];
        this.getGameBoxscore();
      }
    );
  }

  createDoughnutCharts() {
    if(this.awayDoughnutChart !== undefined){
      this.awayDoughnutChart.destroy();
    }

    if(this.homeDoughnutChart !== undefined){
      this.homeDoughnutChart.destroy();
    }

    this.awayDoughnutChart = new Chart('awayDoughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['3Pt', '2PT', 'FT'],
        datasets: [
            {
                backgroundColor: ['rgba(255,105,180, .5)', 'rgba(63,70,173, .5)', 'rgba(101, 210, 242, .7)'],
                data: [
                  this.awayTeam.awayTeamStats.Fg3PtMade['#text'] * 3, 
                  this.awayTeam.awayTeamStats.Fg2PtMade['#text'] * 2,
                  this.awayTeam.awayTeamStats.FtMade['#text'],
                ]
            }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.game.awayTeam.City + ' ' + this.game.awayTeam.Name + ' Point Distribution - ' + this.awayTeam.awayTeamStats.Pts['#text'] + ' PTS'
        },
        animation: false
      }
    });

    this.homeDoughnutChart = new Chart('homeDoughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['3Pt', '2PT', 'FT'],
        datasets: [
            {
                backgroundColor: ['rgba(255,105,180, .5)', 'rgba(63,70,173, .5)', 'rgba(101, 210, 242, .7)'],
                data: [
                  this.homeTeam.homeTeamStats.Fg3PtMade['#text'] * 3, 
                  this.homeTeam.homeTeamStats.Fg2PtMade['#text'] * 2,
                  this.homeTeam.homeTeamStats.FtMade['#text'],
                ]
            }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.game.homeTeam.City + ' ' + this.game.homeTeam.Name + ' Point Distribution - ' + this.homeTeam.homeTeamStats.Pts['#text'] + ' PTS'
        },
        animation: false
      }
    });
  }

  createGroupedBarChart() {
    if(this.groupedBarChart !== undefined){
      this.groupedBarChart.destroy();
    }

    this.groupedBarChart = new Chart('groupedBarChart', {

      type: 'bar',
      data: {
        labels: ['Reb', 'Ast', 'Stl', 'Blk'],
        datasets: [{
          label: this.game.awayTeam.City + ' ' + this.game.awayTeam.Name,
          backgroundColor: "rgba(84,216,186, .5)",
          data: [
            this.awayTeam.awayTeamStats.Reb['#text'], 
            this.awayTeam.awayTeamStats.Ast['#text'], 
            this.awayTeam.awayTeamStats.Stl['#text'],
            this.awayTeam.awayTeamStats.Blk['#text']
          ]
        }, {
          label: this.game.homeTeam.City + ' ' + this.game.homeTeam.Name,
          backgroundColor: "rgba(181, 41, 62, .5)",
          data: [
            this.homeTeam.homeTeamStats.Reb['#text'], 
            this.homeTeam.homeTeamStats.Ast['#text'], 
            this.homeTeam.homeTeamStats.Stl['#text'],
            this.homeTeam.homeTeamStats.Blk['#text']
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: this.game.awayTeam.City + ' ' + this.game.awayTeam.Name + ' vs. ' + this.game.homeTeam.City + ' ' + this.game.homeTeam.Name,
        },
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        },
        animation: false
      }
    });
  }

  getGameBoxscore(){
    const sub = this.gamesService.getGameBoxscore(this.selectedGame).subscribe( 
      (data) => {
        console.log(data);
        this.game = data.gameboxscore.game
        this.quarterSummary = data.gameboxscore.quarterSummary;
        this.awayTeam = data.gameboxscore.awayTeam;
        this.homeTeam = data.gameboxscore.homeTeam;

        
        console.log('Game', this.game);
        console.log('Quarter sum', this.quarterSummary);
        console.log('awayTeam', this.awayTeam);
        console.log('homeTeam', this.homeTeam);
      },
      (err) => console.log(err),
      () => {
        this.createDoughnutCharts();
        this.createGroupedBarChart();
      }
    );
    
    this.subscription.push(sub);
  }

  toggleTeamBoxScore(team) {
    if (team == 'away') {
      this.showAwayTeam = true;
      this.showHomeTeam = false;
    } else if (team == 'home') {
      this.showAwayTeam = false;
      this.showHomeTeam = true;
    }
  }

}
