import { Component, OnInit } from "@angular/core";
import { DocumentService } from "../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";

@Component({
  selector: 'app-lc-isurance',
  templateUrl: './lc-isurence.component.html',
  styleUrls: ['./lc-isurence.component.scss']
})
export class LcIsuranceComponent implements OnInit {
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
  file: any;
  bene: string;
  amount: number;
  pipo: string;
  pipoValue: string;
  arrayData: any = [];
  beneArray: any = [];
  pipoArr: any = [];
  amountArray: any = [];
  outTog: boolean;
  amountArray1: any = [];
  alertToggle: boolean;
  constructor(
    public documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    console.log("hello")
  }

  ngOnInit(): void {
    //window.location.reload();

    this.route.params.subscribe(params => {
      this.file = this.route.snapshot.params['file'];
      this.showInvoice = false;
      console.log("hello")
    });
    this.file = this.route.snapshot.paramMap.get('file')
    this.bene = this.route.snapshot.paramMap.get('bene')
    this.amount = parseInt(this.route.snapshot.paramMap.get('amount'))
    this.pipo = this.route.snapshot.paramMap.get('pipo')


    if (this.pipo) {
      console.log(this.pipo)
      this.pipoValue = 'Select PI/PO'
      this.arrayData.push("PI" + "-" + this.pipo + "-" + this.bene)
      this.beneArray.push(this.bene)
      //this.beneArray.push(this.bene)
      this.pipoArr.push(this.pipo)
      this.amountArray.push(this.amount)
      this.outTog = true
    }
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
    this.documentService.getTask({ pi_poNo: selectedRowValues, file: this.file }).subscribe(
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
      if (this.file == "inland") {
        if (data.bank == 'axisBank') {
          this.router.navigate(['home/letterOfCreditInlandAxis', { pipo: data.pi_poNo, file: this.file }]);
        }
        else if (data.bank == 'yesBank') {
          this.router.navigate(['home/letter-of-credit', { pipo: data.pi_poNo, file: this.file }]);
        }
      }
      else if (this.file == "import") {

        if (data.bank == 'axisBank') {
          console.log("h");
          this.router.navigate(['home/letter-of-credit-import-axis', { pipo: data.pi_poNo, file: this.file }]);

        }
        else if (data.bank == 'yesBank') {
          this.router.navigate(['home/letter-of-credit-import', { pipo: data.pi_poNo, file: this.file }]);
        }


      }

    } else {
      this.router.navigateByUrl(`/home/completed-task/${data._id}`);
    }

  }

  showThisPdf(piPo) {

    console.log("hello")
    this.documentService.draft = false;
    let a = [];
    a.push(piPo)
    this.pipoArr = a;
    if (this.file == "inland") {
      console.log("hello1")
      if (this.myRadio == 'axisBank') {
        this.router.navigate(['home/letterOfCreditInlandAxis', {
          pipo: this.pipoArr,
          amount: this.selectedRow.amount,
          file: this.file
        }]);
      }
      else if (this.myRadio == 'yesBank') {
        this.router.navigate(['home/letter-of-credit', {
          pipo: this.pipoArr,
          amount: this.selectedRow.amount,
          file: this.file
        }]);
      }
    }
    else if (this.file == "import") {
      console.log("hello2")
      if (this.myRadio == 'axisBank') {
        console.log("h");
        this.router.navigate(['home/letter-of-credit-import-axis', {
          pipo: this.pipoArr,
          amount: this.selectedRow.amount,
          file: this.file
        }]);
      }
      else if (this.myRadio == 'yesBank') {
        this.router.navigate(['home/letter-of-credit-import', {
          pipo: this.pipoArr,
          amount: this.selectedRow.amount,
          file: this.file
        }]);
      }

    }

  }

  showThisPdf1(piPo) {
    // this.documentService.draft = false;
    // console.log(this.myRadio)
    // if (this.file == "inland") {
    //   console.log("hello1")
    //   if (this.myRadio == 'axisBank') {
    //     this.router.navigate(['home/letterOfCreditInlandAxis', { pipo: piPo, file: this.file }]);
    //   }
    //   else if (this.myRadio == 'yesBank') {
    //     this.router.navigate(['home/letter-of-credit', { pipo: piPo, file: this.file }]);
    //   }
    // }
    // else if (this.file == "import") {
      console.log("hello2")
      if (this.myRadio == 'axisBank') {
        console.log("h");
        this.router.navigate(['home/letter-of-credit-import-axis', {
          pipo: this.pipoArr,
          amount: this.amount,
          file: this.file
        }]);
      }
      else if (this.myRadio == 'yesBank') {
        this.router.navigate(['home/letter-of-credit-import', {
          pipo: this.pipoArr,
          amount: this.amount,
          file: this.file
        }]);
      }

    }

  }

// }
