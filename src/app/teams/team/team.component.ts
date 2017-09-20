import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  selectedTeamId: number;
  subscription: Subscription[] = [];
  stream: Subscription;
  watchForIdChange: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.watchForIdChange = this.route.params.subscribe(params => {
      
      this.selectedTeamId = params['id'];
      if(this.stream) {
        this.stream.unsubscribe();
      }

      //console.log(this.selectedTeamId);
    });
}

}
