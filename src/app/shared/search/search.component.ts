import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() players;
  @Output() selectedPlayer: EventEmitter<any> = new EventEmitter();

  filteredPlayers: Observable<any[]>;
  playerCtrl: FormControl;

  constructor() {
    this.playerCtrl = new FormControl();
    this.filteredPlayers = this.playerCtrl.valueChanges
      .pipe(
        startWith(''),
        map(player => player ? this.filterPlayers(player) : this.players.slice())
      );
  }

  ngOnInit() {
  }

  filterPlayers(name: string) {
    return this.players.filter(player => {
      const players_name = player.player.FirstName + ' ' + player.player.LastName;
      if(players_name.toLowerCase().indexOf(name.toLowerCase()) === 0) {
        return true;
      } else if(player.player.LastName.toLowerCase().indexOf(name.toLowerCase()) === 0) {
        return true;
      } else if (player.player.FirstName.toLowerCase().indexOf(name.toLowerCase()) === 0 ){
        return true;
      } else {
        return false;
      }
    });
  }

  selectPlayer(evt, player) {
    if (evt.source.selected) {
      this.selectedPlayer.emit(player);
    }
    
  }
}