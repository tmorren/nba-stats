import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'app';
  data;
  private apiURL = 'https://api.mysportsfeeds.com/v1.1/pull/nba/2016-2017-regular/overall_team_standings.json';
  
  //?username=tmorren&password=80GFTJ3iOo7s

  constructor(private http: Http){
    //this.getData();
  }

  // getData(){
  //   let username: string = 'tmorren';
  //   let password: string = '80GFTJ3iOo7s';
  //   let headers: Headers = new Headers();
  //   headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 

  //   this.http.get(this.apiURL, {headers: headers})
  //                   .map((res: Response) => res.json())
  //                   .subscribe(res => this.data = res, err => console.log('Failed'), () => console.log(this.data));
  // }
 
}

