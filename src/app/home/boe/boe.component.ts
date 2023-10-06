import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { DocumentService } from "../../service/document.service";
import * as xlsx from 'xlsx';
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from "../shared-Data-Servies/shared-data.service";

@Component({
  selector: 'app-boe',
  templateUrl: './boe.component.html',
  styleUrls: ['./boe.component.scss']
})
export class BOEComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  public showInvoice;
  public selectedRow;
  docu: any;
  public lastIndex;
  public item1;
  public tableWidth;
  public greaterAmount = 0;
  public allTransactions: any = [];
  public optionsVisibility: any = [];

  constructor(
    public documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private sharedData : SharedDataService
  ) { }

  ngOnInit(): void {
    this.documentService.getBoe(1).subscribe(
      (res: any) => {
        console.log(res), (this.item1 = res.data);
        console.log("item1 data", this.item1)
      },
      (err) => console.log(err)
    );
  }

  exportToExcel(){
    const ws: xlsx.WorkSheet =
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'BOE.xlsx');
  }

  uploadNew(){
    this.sharedData.changeretunurl('home/boe')
    this.router.navigate(['home/upload', { file: 'import', document: 'boe' }]);
  }

  getInvoices(selectedRowValues, i){
    console.log("SELECTED", selectedRowValues);
    console.log("INDEX", i);
    console.log(selectedRowValues.doc);
    this.lastIndex = i;

    this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
      selectedRowValues.doc
    );
    return (
      (this.selectedRow = selectedRowValues),
      (this.showInvoice = true),
      (this.tableWidth = "30%"),
      (this.greaterAmount = parseInt(this.selectedRow.amount))
    );
  }

  getTransactions(selectedRowValues){
    this.documentService.getTask({ pi_poNo: selectedRowValues, file: "advance" }).subscribe(
      (res: any) => {
        this.allTransactions = res.task;
        console.log("ALL TRANSACTIONS", this.allTransactions);
      },
      (err) => console.log(err)
    );
  }

  hide(){
    this.showInvoice = false;
  }

  toSave(data, index){
    this.optionsVisibility[index] = false;
    console.log(data);
    this.documentService.updateBoe(data, data._id).subscribe(
      (data) => {
        console.log("king123");
        console.log(data);
        this.toastr.success('Bill Of Entry row is updated')
        // this.router.navigate(["home/view-document/sb"]);
        //this.router.navigate(['/login'], { queryParams: { registered: true }});
      },
      (error) => {
        console.log("error");
      }
    );
  }

  toEdit(index){
    this.optionsVisibility[index] = true;
    this.toastr.warning('Bill Of Entry Row Is In Edit Mode');
  }

}
