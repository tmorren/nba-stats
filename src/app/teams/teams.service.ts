import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamsService {

  private apiURL = 'https://api.mysportsfeeds.com/v1.1/pull/nba/latest/overall_team_standings.json';

  constructor(public http: Http) { }

  getTeamStandings(){
    let username: string = 'tmorren';
    let password: string = '80GFTJ3iOo7s';
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
    console.log("hello");

    return this.http.get(this.apiURL, {headers: headers})
                    .map((res: Response) => res.json());
                    //.subscribe(res => this.teams = res, err => console.log('Failed'), () => console.log(this.teams));
  }

}
