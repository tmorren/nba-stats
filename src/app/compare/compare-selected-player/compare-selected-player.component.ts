import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compare-selected-player',
  templateUrl: './compare-selected-player.component.html',
  styleUrls: ['./compare-selected-player.component.css']
})
export class CompareSelectedPlayerComponent implements OnInit {

  selectedPlayer;

  @Input() set player (player) {
    this.selectedPlayer = player;
  };

  constructor() { }

  ngOnInit() {
  }

}
