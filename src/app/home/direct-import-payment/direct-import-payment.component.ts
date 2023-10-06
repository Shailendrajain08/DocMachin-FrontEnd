import { Component, OnInit } from "@angular/core";
import { DocumentService } from "../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-direct-import-payment',
  templateUrl: './direct-import-payment.component.html',
  styleUrls: ['./direct-import-payment.component.scss']
})
export class DirectImportPaymentComponent implements OnInit {
  public item1;
  public item2;
  public item3;
  public user;
  public selectedRow;
  public tableWidth;
  public export = false;
  public import = false;
  public lastIndex;
  public showPdf = false;
  public greaterAmount = 0;
  public selectedDoc = "";
  public showInvoice = false;
  public allTransactions: any = [];
  Ax1: boolean;
  Ax2: boolean;
  step1: any;
  myRadio: any;

  outTog: boolean = false;
  pipoValue = 'Select PI/PO'

  url: any;
  file: any;
  arrayData: any = [];
  pipoArr: any = [];
  bene: string;
  beneArray: any = [];
  alertToggle: any;
  amount: any;
  amountArray: any = [];
  amountArray1: any = [];

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
  constructor(
    public documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.documentService.getPipo().subscribe(
      (res: any) => {
        console.log("HEre Response", res), (this.item1 = res.data);
      },
      (err) => console.log(err)
    );
    this.file = this.route.snapshot.paramMap.get('file')
    this.bene = this.route.snapshot.paramMap.get('bene')
    this.amount = parseInt(this.route.snapshot.paramMap.get('amount'))
    if (this.file) {
      console.log(this.file)
      this.pipoValue = 'Select PI/PO'
      this.arrayData.push("PI" + "-" + this.file + "-" + this.bene)
      this.beneArray.push(this.bene)
      this.beneArray.push(this.bene)
      this.pipoArr.push(this.file)
      this.amountArray.push(this.amount)
      this.outTog = true
    }

    this.documentService.getBoe(1).subscribe((res: any) => {
      console.log("BOE Data", res),
      (this.item3 = res.data);
    },
    (err)=> console.log(err)
    );
  }


  getTransactions(selectedRowValues) {
    console.log("jjsjsjsj")
    this.documentService.getBoeTask({ boeNumber: selectedRowValues }).subscribe(
      (res: any) => {
        this.allTransactions = res.task;
        console.log("ALL TRANSACTIONS", this.allTransactions);
      },
      (err) => console.log(err)
    );
  }

  clickPipo(a, b, c, d) {
    let x = a + "-" + b + "-" + c
    if (this.arrayData.length > 0) {
      if (c == this.beneArray[0]) {

        let j = this.arrayData.indexOf(x)
        if (j == -1) {

          this.arrayData.push(x)
          this.pipoArr.push(b)
          this.beneArray.push(c)
          let l = parseInt(d)
          this.amountArray.push(l)
          //this.amount = this.amount + parseInt(d)
        }
        else {
          console.log("x")
        }

        console.log(this.arrayData)
      }
      else {
        this.alertToggle = true
        setTimeout(() => {
          console.log('hi')
          this.alertToggle = false
        }, 5000);
        return
      }
    }
    else {
      //this.amount = this.amount + parseInt(d)
      this.arrayData.push(x)
      this.pipoArr.push(b)
      this.beneArray.push(c)
      let l = parseInt(d)
      this.amountArray.push(l)
    }





  }

  amountFun(a, b) {
    console.log('shshshh')
    this.amountArray1[b] = parseInt(a)
    let z = 0;
    for (let value of this.amountArray1) {
      z = z + value
    }
    this.amount = z
    console.log(this.amountArray1)
    console.log(this.amount)
    console.log('shshshh')
  }

  removePipo(i) {
    this.arrayData.splice(i, 1)
    this.pipoArr.splice(i, 1)
    this.beneArray.splice(i, 1)
    this.amount = this.amount - this.amountArray[i]
  }

  getInvoices(selectedRowValues, i) {
    console.log("SELECTED", selectedRowValues);
    console.log("INDEX", i);
    this.lastIndex = i;
    this.getTransactions(selectedRowValues.boeNumber)
    return (
      (this.selectedRow = selectedRowValues),
      (this.showInvoice = true),
      (this.tableWidth = "30%"),
      (this.greaterAmount = parseInt(this.selectedRow.amount))
    );
    this.getTransactions(selectedRowValues.boeNumber)

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
    // data.pipoDetail["draft"] = true;
    // data.pipoDetail["_id"] = data._id;
    // this.documentService.pdfData = data.pipoDetail;
    // this.router.navigateByUrl(`/home/inward-remittance/${data.pi_poNo}`);
    console.log("PIPO NO", data);
    if (!data.completed) {
      this.documentService.task = data
      this.documentService.draft = true;
      //data.pipoDetail["_id"] = data._id;
      this.documentService.pdfData = data.pipoDetail;
      if (data.bank == 'yesBank') {
        this.router.navigateByUrl(`/home/inward-remittance-boe/${data.boeNumber}`);
      }
      else if (data.bank == 'axisBank') {
        this.router.navigateByUrl(`/home/direct-import-axis/${data.boeNumber}`);
      }


    } else {
      this.router.navigateByUrl(`/home/completed-task/${data._id}`);
    }
  }

  showThisPdf(piPo) {
    this.documentService.draft = false;
    let a = [];
    a.push(piPo)
    this.pipoArr = a;
    if (this.myRadio == 'axisBank') {
      console.log("h");
      this.router.navigate(['home/direct-import-axis', {
        pipo: this.pipoArr,
        amount: this.selectedRow.amount
      }]);

    }
    else if (this.myRadio == 'yesBank') {
      this.router.navigate(['home/inward-remittance-boe', {
        pipo: this.pipoArr,
        amount: this.selectedRow.amount
      }])
    }
  }

  showThisPdf1(piPo) {
    this.documentService.draft = false;
    if (this.myRadio == 'axisBank') {
      console.log("h");
      //this.router.navigateByUrl(`/home/direct-import-axis/${piPo}`);
      this.router.navigate(['home/direct-import-axis', {
        pipo: this.pipoArr,
        amount: this.amount
      }]);

    }
    else if (this.myRadio == 'yesBank') {
      //this.router.navigateByUrl(`/home/inward-remittance-boe/${piPo}`);
      this.router.navigate(['home/inward-remittance-boe', {
        pipo: this.pipoArr,
        amount: this.amount
      }])
    }
  }

}
