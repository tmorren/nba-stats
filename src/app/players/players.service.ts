import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Functions } from '../shared/functions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlayersService {

  constructor(public http: HttpClient) { }

  getPlayers(team = null, season = "latest"){
    let requestUrl = environment.baseUrl + `/${season}/cumulative_player_stats.json`;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    params = params.append('playerstats', 'PTS/G,AST/G,REB/G');

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  getPlayerInfo(player, season = "latest"){
    let requestUrl = environment.baseUrl + `/${season}/active_players.json`;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    params = params.append('player', player);

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  getPlayerStats(player, season = "latest"){
    let requestUrl = environment.baseUrl + `/${season}/cumulative_player_stats.json`;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    params = params.append('player', player);

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  
}
