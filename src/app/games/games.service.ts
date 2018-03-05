import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Functions } from '../shared/functions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GamesService {

  constructor(public http: HttpClient) { }

  /** 
   *    Get game log for a player
   *    params ()
   *    player = int (Player ID)
   *    season = string
   * 
  */
  getPlayerGameLog(player, season = "latest"){
    let requestUrl = environment.baseUrl + `/${season}/player_gamelogs.json`;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    params = params.append('player', player);
    params = params.append('sort', 'gamelogs.game.date.d');

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  getPlayerGameLogPastMonth(player, season = "latest"){
    let requestUrl = environment.baseUrl + `/${season}/player_gamelogs.json`;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    params = params.append('player', player);
    params = params.append('limit', '20');
    params = params.append('date', 'since-1-months-ago');

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  getTeamGameLogPastMonth(team, season = "latest"){
    let requestUrl = environment.baseUrl + `/${season}/team_gamelogs.json`;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    params = params.append('team', team);
    //params = params.append('limit', '20');
    params = params.append('date', 'since-1-months-ago');

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  
}
