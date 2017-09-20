import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
  providers: [TeamsService]
})
export class TeamListComponent implements OnInit {

  teams = [];

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(){
    this.teamsService.getTeamStandings().subscribe( (data) => {
      this.teams = data.overallteamstandings.teamstandingsentry;
    });
  }

}
