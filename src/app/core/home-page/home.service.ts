import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { Functions } from '../../shared/functions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

  constructor(public http: HttpClient) { }

  getNBANews(){
    let requestUrl = environment.newsApiUrl;
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    return this.http.get(requestUrl, {headers: headers, params: params}).map((res: any) => res);
  }


  
}
