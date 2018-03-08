import { Component, OnInit, Input } from '@angular/core';

/** CLASSES */
import { Player } from '../../shared/classes/player';

@Component({
  selector: 'app-player-compare',
  templateUrl: './player-compare.component.html',
  styleUrls: ['./player-compare.component.css']
})
export class PlayerCompareComponent implements OnInit {
  playerOne: Player;
  playerTwo: Player;

  @Input() set playerOneSelected(player){
    console.log('setting player1');
    this.playerOne = player;
    if (this.playerTwo) {
      this.test();
    }
  };
  @Input() set playerTwoSelected(player){
    console.log('setting player2');
    this.playerTwo = player;
    if (this.playerOne) {
      this.test();
    }
  };

  constructor() { }

  ngOnInit() {
  }

  test(){
    console.log('In here!');
  }
}
