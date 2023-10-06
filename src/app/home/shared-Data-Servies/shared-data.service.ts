import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private returnUrl = new BehaviorSubject('');
  currentReturnUrl = this.returnUrl.asObservable();
  private dashBoard = new BehaviorSubject(true);

 currentDashBoard = this.dashBoard.asObservable();

 private export  = new BehaviorSubject(false);
 currentExport = this.export.asObservable();

 private exportPipo  = new BehaviorSubject(false);
 currentExportPipo = this.exportPipo.asObservable();
  
 constructor() { }
  changeDashboard(status: boolean) {
    this.dashBoard.next(status)
    this.export.next(false)
    
  }
  changeExport(status: boolean) {
    this.dashBoard.next(false)
    this.export.next(status)
    
  }
  changeretunurl(url: string) {
    
    this.returnUrl.next(url)
    
  }

}
