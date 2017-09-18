import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
 
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     let username: string = environment.apiUsername;
//     let password: string = environment.apiPassword;
    
//     headers.append("Authorization", "Basic " + btoa(username + ":" + password));
//     // Get the auth header from the service.
//     const authHeader = this.auth.getAuthorizationHeader();
//     // Clone the request to add the new header.
//     const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
//     // Pass on the cloned request instead of the original request.
//     return next.handle(authReq);
//   }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
        let username: string = environment.apiUsername;
        let password: string = environment.apiPassword;

        const authReq = req.clone({headers: req.headers.set("Authorization", "Basic " + btoa(username + ":" + password))});
        console.log("Settings auth headers");
        return next.handle(authReq);
      }
}