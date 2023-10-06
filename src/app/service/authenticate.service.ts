import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
    public authToken;
    constructor(private http: HttpClient) { }

    public addToken(token) {
      console.log(token)
      localStorage.setItem('token', token);
      this.authToken = token;
    }
    
    public logout() {
        this.authToken = null;
        localStorage.clear();
    }

   
     
}