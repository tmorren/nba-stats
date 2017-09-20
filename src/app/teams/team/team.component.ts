import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamsService } from '../teams.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  selectedTeam: string;
  subscription: Subscription[] = [];
  stream: Subscription;
  watchForIdChange: Subscription;
  teamInfo;

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
    });
  }

  getTeamInfo(team){
    this.teamsService.getTeamInfo(team).subscribe( (data) => {
      console.log(data);
    });
  }

}
