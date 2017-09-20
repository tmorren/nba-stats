import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  private playerIdSub: any;
  playerId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.playerIdSub = this.route.params.subscribe(params => {
      this.playerId = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }

}
