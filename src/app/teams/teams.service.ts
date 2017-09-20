import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Functions } from '../shared/functions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamsService {

  private apiURL = 'https://api.mysportsfeeds.com/v1.1/pull/nba/latest/overall_team_standings.json';

  constructor(public http: HttpClient) { }

  getTeamStandings(){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(this.apiURL, {headers: headers}).map((res: any) => res);
  }

  getTeamInfo(team){
    let requestUrl = environment.baseUrl + "/2016-2017-regular/overall_team_standings.json?teamstats=W&team=" + team;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(requestUrl, {headers: headers}).map((res: any) => res);
  }

}
