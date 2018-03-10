import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Functions } from '../shared/functions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamsService {

  private apiURL = 'https://api.mysportsfeeds.com/v1.1/pull/nba/latest/overall_team_standings.json';

  constructor(public http: HttpClient) { }

  getLeagueLeaders(stat, season = "latest", limit?, conference?) {
    let requestUrl = environment.baseUrl + `/${season}/overall_team_standings.json`;
    const headers = new HttpHeaders();

    let params = new HttpParams();

    params = params.append('teamstats', stat);

    if (limit) {
      params = params.append('limit', limit);
    } else {
      params = params.append('limit', '10');
    }

    if (conference) {
      params = params.append('division', conference);
    }

    params = params.append('sort', `stats.${stat}.D`);
    

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  getTeamStandings(){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(this.apiURL, {headers: headers}).map((res: any) => res);
  }

  getTeamInfo(team, season = "latest"){
    let requestUrl = environment.baseUrl + `/${season}/overall_team_standings.json`;

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    const params = new HttpParams()
    .set('team', String(team));
    //.set('teamstats', 'W');
    
    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

  getTeamPlayers(team, season = "latest"){
    let requestUrl = environment.baseUrl + `/${season}/cumulative_player_stats.json`;

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    const params = new HttpParams()
    .set('team', String(team))
    .set('playerstats', 'PTS/G,AST/G,REB/G,STL/G,BS/G')
    .set('sort', 'stats.PTS/G.d')
    .set('limit', '15');
    

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }

}
