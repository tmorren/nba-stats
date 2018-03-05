import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
  monthAverages;
  players: Player[] = [];
  selectedTeam: string;
  team: Team;

  // Subscriptions
  stream: Subscription;
  subscription: Subscription[] = [];
  watchForIdChange: Subscription;

  // Check if loaded
  infoLoaded: boolean = false;
  monthStatsLoaded: boolean = false;
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

      this.getTeamInfo(this.selectedTeam);
      this.getTeamPlayers(this.selectedTeam);
      this.getTeamGameLogPastMonth(this.selectedTeam);
    });
  }

  getTeamGameLogPastMonth(team) {
    const sub = this.gamesService.getTeamGameLogPastMonth(team).subscribe( (data) => {
     // console.log(data);
      this.gameLogs = data.teamgamelogs.gamelogs;
      console.log(this.gameLogs);
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
