import { Component, OnInit } from "@angular/core";
import { DocumentService } from "../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-outward-remittance",
  templateUrl: "./outward-remittance.component.html",
  styleUrls: ["./outward-remittance.component.scss"],
})
export class AdvanceOutwardRemittanceComponent implements OnInit {
  public item = [];
  public item1 = [];
  public item2;
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
  constructor(
    public documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

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


  }

  getTransactions(selectedRowValues) {
    this.documentService.getTask({ pi_poNo: selectedRowValues, file: "advance" }).subscribe(
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
    return (
      (this.selectedRow = selectedRowValues),
      (this.showInvoice = true),
      (this.tableWidth = "30%"),
      (this.greaterAmount = parseInt(this.selectedRow.amount))
    );
  }

  onItemChange(value) {
    console.log(" Value is : ", value);
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
    if (!data.completed) {
      this.documentService.task = data
      this.documentService.draft = true;
      //data.pipoDetail["_id"] = data._id;
      this.documentService.pdfData = data.pipoDetail;
      if (data.bank == "yesBank") {
        if (parseInt(data.pipoDetail.amount) < 200000) {
          this.documentService.pdfData = this.selectedRow;
          this.router.navigateByUrl(`/home/inward-remittance/${data.pi_poNo}`);
        } else {
          console.log(this.selectedDoc);
          this.router.navigateByUrl(`/home/fbg-wavier/${data.pi_poNo}`);

        }
      }
      else {
        if (parseInt(data.pipoDetail.amount) < 200000) {
          console.log("h1");
          this.documentService.pdfData = this.selectedRow;
          this.router.navigateByUrl(`/home/advance-remittance/${data.pi_poNo}`);
        } else {
          console.log(this.selectedDoc);
          console.log("h2");
          console.log("pipo", data.pi_poNo);
          this.router.navigateByUrl(`/home/advance-remittance-fbg/${data.pi_poNo}`);

        }
      }


    } else {
      this.router.navigateByUrl(`/home/completed-task/${data._id}`);
    }

  }

  showThisPdf(piPo) {
    this.documentService.draft = false;
    console.log(this.myRadio)
    let a = [];
    a.push(piPo)
    this.pipoArr = a;
    if (this.myRadio == 'axisBank') {
      console.log("h");
      if (parseInt(this.selectedRow.amount) < 200000) {
        console.log("h1");
        this.documentService.pdfData = this.selectedRow;
        this.router.navigate(['home/advance-remittance', {
          pipo: this.pipoArr,
          amount: this.selectedRow.amount
        }]);
        //this.router.navigateByUrl(`/home/advance-remittance/${piPo}`);
      } else {
        console.log(this.selectedDoc);
        console.log("h2");
        console.log("pipo", piPo);
        this.router.navigate(['home/advance-remittance-fbg', {
          pipo: this.pipoArr,
          amount: this.selectedRow.amount
        }]);
        //this.router.navigateByUrl(`/home/advance-remittance-fbg/${piPo}`);

      }
    }
    else {
      if (parseInt(this.selectedRow.amount) < 200000) {
        this.documentService.pdfData = this.selectedRow;
        this.router.navigate(['home/inward-remittance', {
          pipo: this.pipoArr,
          amount: this.selectedRow.amount
        }]);
        //this.router.navigateByUrl(`/home/inward-remittance/${piPo}`);
      } else {
        console.log(this.selectedDoc);
        this.router.navigate(['home/fbg-wavier', {
          pipo: this.pipoArr,
          amount: this.selectedRow.amount
        }]);
        // this.router.navigateByUrl(`/home/fbg-wavier/${piPo}`);

      }
    }

  }

  showThisPdf1(piPo) {
    this.documentService.draft = false;
    console.log(this.myRadio)
    if (this.myRadio == 'axisBank') {
      console.log("h");
      if (this.amount < 200000) {
        console.log("h1");
        this.documentService.pdfData = this.selectedRow;
        this.router.navigate(['home/advance-remittance', {
          pipo: this.pipoArr,
          amount: this.amount
        }]);
        //this.router.navigateByUrl(`/home/advance-remittance/${piPo}`);
      } else {
        console.log(this.selectedDoc);
        console.log("h2");
        console.log("pipo", piPo);
        this.router.navigate(['home/advance-remittance-fbg', {
          pipo: this.pipoArr,
          amount: this.amount
        }]);
        //this.router.navigateByUrl(`/home/advance-remittance-fbg/${piPo}`);

      }
    }
    else {
      if (this.amount < 200000) {
        this.documentService.pdfData = this.selectedRow;
        this.router.navigate(['home/inward-remittance', {
          pipo: this.pipoArr,
          amount: this.amount
        }]);
        // this.router.navigateByUrl(`/home/inward-remittance/${piPo}`);
      } else {
        console.log(this.selectedDoc);

        this.router.navigate(['home/fbg-wavier', {
          pipo: this.pipoArr,
          amount: this.amount
        }]);
        // this.router.navigateByUrl(`/home/fbg-wavier/${piPo}`);

      }
    }

  }
}
