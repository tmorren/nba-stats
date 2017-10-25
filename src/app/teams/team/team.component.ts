import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamsService } from '../teams.service';
import { Subscription } from 'rxjs/Subscription';

import { Functions } from '../../shared/functions';
import { Team } from '../../shared/classes/team';
import { Player } from '../../shared/classes/player';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  players: Player[] = [];
  selectedTeam: string;
  subscription: Subscription[] = [];
  stream: Subscription;
  team: Team;
  watchForIdChange: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamsService: TeamsService) { }

  ngOnInit() {
    this.watchForIdChange = this.route.params.subscribe(params => {
      
      this.selectedTeam = params['abbreviation'];
      if(this.stream) {
        this.stream.unsubscribe();
      }

      this.getTeamInfo(this.selectedTeam);
      this.getTeamPlayers(this.selectedTeam);
    });
  }

  getTeamInfo(team){
    this.teamsService.getTeamInfo(team).subscribe( (data) => {
      let teamInfo = data.overallteamstandings.teamstandingsentry[0].team;
      let teamStats = data.overallteamstandings.teamstandingsentry[0].stats;

      team = new Team;
      this.team = Object.assign(team, teamInfo);
      this.team = Object.assign(team, teamStats);
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

}
