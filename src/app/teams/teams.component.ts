import { Component, OnInit } from '@angular/core';
import { TeamsService } from './teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [TeamsService]
})
export class TeamsComponent implements OnInit {

  teams = [];

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(){
    this.teamsService.getTeamStandings().subscribe( (res) => {
      this.teams = res.overallteamstandings.teamstandingsentry;
      console.log(this.teams);
    });
  }

}
