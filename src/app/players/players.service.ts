import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Functions } from '../shared/functions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlayersService {

  private apiURL = 'https://api.mysportsfeeds.com/v1.1/pull/nba/latest/overall_team_standings.json';

  constructor(public http: HttpClient) { }

  getPlayers(team = null){
    let requestUrl = environment.baseUrl + "/2016-2017-regular/cumulative_player_stats.json";// + team + "&playerstats=" + statsRequested;
    console.log('here');
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    const params = new HttpParams()
    //.set('team', String(team))
    .set('playerstats', 'PTS/G,AST/G,REB/G');
    

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

}
