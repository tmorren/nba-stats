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

  getGameBoxscore(gameID,  season="latest") {
    let requestUrl = environment.baseUrl + `/${season}/game_boxscore.json`;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    params = params.append('gameid', gameID);

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  getGameList(date?, season="latest") {
    let requestUrl = environment.baseUrl + `/${season}/scoreboard.json`;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    if(!date) {
      var dateObj = new Date();
      let month: any = dateObj.getMonth() + 1; //months from 1-12
      let day: any = dateObj.getDate();
      let year: any = dateObj.getFullYear();
      
      if(month < 10) {
        month = "0" + String(month);
      }

      if(day < 10) {
        day = "0" + String(day);
      }
      date = String(year) + String(month) + String(day);
    }

    params = params.append('fordate', date);

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

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
