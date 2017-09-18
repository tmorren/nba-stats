import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export class Functions {

    static initializeAuthHeaders (headers){
        let username: string = environment.apiUsername;
        let password: string = environment.apiPassword;
        
        headers.append("Authorization", "Basic " + btoa(username + ":" + password));

        return headers;
    }
}