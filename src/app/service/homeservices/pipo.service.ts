import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {PipoDisplayListViewItem, PipoDisplayListView, PipoModel} from "../../../model/pipo.model";
import {DocumentService} from '../../service/document.service';

@Injectable({ providedIn: "root" })
export class PipoDataService {
  public pipolistSubsciber = new BehaviorSubject([]);
  public pipolistModelSubsciber = new BehaviorSubject([]);
  public pipoSingleSubsciber = new BehaviorSubject(new PipoDisplayListViewItem({}));
  constructor(public documentService: DocumentService) {

  }
  get pipo$(): Observable<Array<PipoDisplayListViewItem>> {
    return this.pipolistSubsciber.asObservable();
  }
  get pipoSingle$(): Observable<PipoDisplayListViewItem> {
    return this.pipoSingleSubsciber.asObservable();
  }
  get pipolistModel$(): Observable<Array<PipoModel>> {
    return this.pipolistModelSubsciber.asObservable();
  }
  setPipoData(data, type?: string) {
    let temppipo: any = new PipoDisplayListView(data, type);
    this.pipolistSubsciber.next(temppipo.pipolist);
    return temppipo;
  }
  setSinglePipoData(data) {
    this.pipoSingleSubsciber.next(new PipoDisplayListViewItem(data));
  }

  getPipoList = (type) => {
    return new Promise((resolve, reject) => {
      this.documentService.getPipo().subscribe(
        (res: any) => {
          let temppipo = new PipoDisplayListView(res.data, type);
          this.pipolistModelSubsciber.next(temppipo.pipoModelList);
          this.pipolistSubsciber.next(temppipo.pipolist);
          resolve(temppipo);
        },
        (err) => reject(err)
      );
    });
  }

  getShippingBillById(shippingBillId) {
    let pipolist = this.pipolistModelSubsciber.value;
    for (let i in pipolist) {
      if (pipolist[i]) {
        for (let j in pipolist[i].sbRef) {
          if (pipolist[i].sbRef[j]._id == shippingBillId) {
            return pipolist[i].sbRef[j];
          }
        }
      }
    }
  }

  getShippingBills(pipoid) {
    let pipolist = this.pipolistModelSubsciber.value;
    for (let i in pipolist) {
      if (pipolist[i]._id == pipoid) {
        return pipolist[i].sbRef;
      }
    }
  }
}
