import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfig } from '../../app/app.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class DashBoardService {
  api_base: string;
  authToken: string;

  public loginData = new BehaviorSubject({});
  constructor(private http: HttpClient, public appconfig: AppConfig) {
    this.api_base = appconfig.apiUrl;
    console.log(this.api_base)
  }


  public loadFromLocalStorage() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    return this.authToken;
  }

  getDashboardData(){
    this.loadFromLocalStorage();
    const httpOptions = {
      headers: new HttpHeaders({Authorization : this.authToken}),
    };
    let url = `${this.api_base}/dashboard-Data`;
    return this.http.get(url, httpOptions);
  }

  getOrderShipment(filterData){
    this.loadFromLocalStorage();
    const httpOptions = {
      headers: new HttpHeaders({Authorization : this.authToken}),
    };
    let url = `${this.api_base}/dashboard-Data/orderShipment?filtertype=${filterData}`;
    return this.http.get(url, httpOptions);
  }


}
