import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';
import { Team } from '../../shared/classes/team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
  providers: [TeamsService]
})
export class TeamListComponent implements OnInit {

  teams:  Team[] = [];

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    if(this.teams.length == 0){
      this.getTeams();
    }
  }

  getTeams(){
    this.teamsService.getTeamStandings().subscribe( (data) => {
      this.teams = data.overallteamstandings.teamstandingsentry;
      console.log(this.teams);
    });
  }

}
