import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-boxscore',
  templateUrl: './game-boxscore.component.html',
  styleUrls: ['./game-boxscore.component.css']
})
export class GameBoxscoreComponent implements OnInit {

  @Input() boxscore;

  constructor() { }

  ngOnInit() {
    console.log('boxscore', this.boxscore);
  }

}
