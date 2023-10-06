import { Component, OnInit } from "@angular/core";
import { DocumentService } from "../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-fbg-buyer',
  templateUrl: './fbg-buyer.component.html',
  styleUrls: ['./fbg-buyer.component.scss']
})
export class FbgBuyerComponent implements OnInit {
  public item = []
  public item1 = [];
  public item2 = [];
  public user;
  public selectedRow;
  public showInvoice;
  public tableWidth;
  public export = false;
  public import = false;
  public lastIndex;
  public showPdf = false;
  public greaterAmount = 0;
  public selectedDoc = "";
  public allTransactions: any = [];
  Ax1: boolean;
  Ax2: boolean;
  step1: any;

  piPoForm = new FormGroup({
    pi_poNo: new FormControl(""),
    benneName: new FormControl(""),
    currency: new FormControl(""),
    amount: new FormControl(""),
    incoterm: new FormControl(""),
    lastDayShipment: new FormControl(""),
    paymentTerm: new FormControl(""),
    pcRefNo: new FormControl(""),
  });
  url: any;
  constructor(
    public documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.documentService.getPipo().subscribe(
      (res: any) => {
        console.log("HEre Response", res);
          this.item = res.data;
          console.log("all pipo",this.item);
        for (let value of this.item) {
          console.log(value)
          if (value['file'] == 'import') {
        this.item1.push(value)
          }
        }
      },
      (err) => console.log(err)
    );
  }

  getTransactions(selectedRowValues) {
    this.documentService.getTask({ pi_poNo: selectedRowValues, file:"fbgBuyer" }).subscribe(
      (res: any) => {
        this.allTransactions = res.task;
        console.log("ALL TRANSACTIONS", this.allTransactions);
      },
      (err) => console.log(err)
    );
  }

  getInvoices(selectedRowValues, i) {
    console.log("SELECTED", selectedRowValues);
    console.log("INDEX", i);
    this.lastIndex = i;
    return (
      (this.selectedRow = selectedRowValues),
      (this.showInvoice = true),
      (this.tableWidth = "30%"),
      (this.greaterAmount = parseInt(this.selectedRow.amount))
    );
  }

  onExport() {
    this.export = !this.export;
  }

  onImport() {
    this.import = !this.import;
  }
  exBill() {
    this.Ax1 = !this.Ax1;
  }
  withBill() {
    this.Ax2 = !this.Ax2;
  }

  onNewTrans() {
    this.step1 = !this.step1;
  }

  toggleStep1() {
    this.step1 = false;
    this.showPdf = false;
  }

  // getTrasactions() {
  //   const data: any = this.documentService.getTask();
  //   this.allTransactions = data.task;
  // }

  viewTask(data) {
    console.log(data)
    if(!data.completed) {
      this.documentService.task = data
      this.documentService.draft = true;
      //data.pipoDetail["_id"] = data._id;
      this.documentService.pdfData = data.pipoDetail;
      this.router.navigateByUrl(`/home/fbg-wavier-file/${data.pi_poNo}`);
      }
      else {
      this.router.navigateByUrl(`/home/completed-task/${data._id}`);
    }

  }

  showThisPdf(piPo) {
    this.documentService.draft = false;
    this.router.navigateByUrl(`/home/fbg-wavier-file/${piPo}`);

  }
}
