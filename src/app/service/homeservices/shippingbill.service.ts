import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable} from 'rxjs';
import {ShippingBillDisplayListViewItem, ShippingBill} from "../../../model/shippingBill.model";
import {DocumentService} from '../document.service';

@Injectable({ providedIn: "root" })
export class ShippingbillDataService {
  public shippingBillSubsciber = new BehaviorSubject([]);
  constructor(public documentService: DocumentService) {

  }
  get shippingbills$(): Observable<Array<ShippingBillDisplayListViewItem>> {
    return this.shippingBillSubsciber.asObservable();
  }

  setPipoData(data) {
    let temppipo: any = new ShippingBillDisplayListViewItem(data);
    this.shippingBillSubsciber.next(temppipo.shippingBillList);
    return temppipo;
  }

  getShippingBillList = () => {
    return new Promise((resolve, reject) => {
      this.documentService.getMaster(1).subscribe(
        (res: any) => {
          let temppipo = new ShippingBillDisplayListViewItem(res.data);
          this.shippingBillSubsciber.next(temppipo.shippingBillList);
          resolve(temppipo);
        },
        (err) => reject(err)
      );
    });
  }
}
