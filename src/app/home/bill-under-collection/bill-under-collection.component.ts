import { Component, OnInit } from "@angular/core";
import { DocumentService } from "../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";

@Component({
  selector: 'app-bill-under-collection',
  templateUrl: './bill-under-collection.component.html',
  styleUrls: ['./bill-under-collection.component.scss']
})
export class BillUnderCollectionComponent implements OnInit {
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
  outTog: boolean = false;
  pipoValue = 'Select PI/PO'
  arrayData: any = [];
  pipoArr: any = [];
  bene: string;
  beneArray: any = [];
  alertToggle: any;
  amount: any;
  amountArray: any = [];
  amountArray1: any = [];
  url: any;
  file: any;
  doc: string;
  popo: string;
  pipo: string;
  pipo_id: string;
  myRadio: any;
  file1: any;
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
      if (this.file === 'lcUsance') {
        console.log("hello1")
        this.doc = "Lc Usance"
      }
      else if (this.file === 'lcSight') {
        console.log("hello2")
        this.doc = "Lc Sight"
      }
      else if (this.file === 'nonlcUsance') {
        console.log("hello3")
        this.doc = "Non Lc Usance"
      }
      else if (this.file === 'nonlcSight') {
        console.log("hello4")
        this.doc = "Non Lc Sight"
      }
    });


    this.file = this.route.snapshot.paramMap.get('file')
    this.bene = this.route.snapshot.paramMap.get('bene')
    this.amount = parseInt(this.route.snapshot.paramMap.get('amount'))
    this.pipo = this.route.snapshot.paramMap.get('pipo')
    this.pipo_id = this.route.snapshot.paramMap.get('pipo_id')
    if (this.file == 'nonlcUsance') {
      this.file1 = 'Non LC Usance'
    }
    else if (this.file == 'nonlcSight') {
      this.file1 = 'Non LC Sight'
    }
    else if (this.file == 'lcSight') {
      this.file1 = 'LC Sight'
    }
    else if (this.file == 'lcUsance') {
      this.file1 = 'LC Usance'
    }

    if (this.pipo) {
      console.log(this.pipo)
      this.pipoValue = 'Select PI/PO'
      this.arrayData.push("PI" + "-" + this.pipo + "-" + this.bene)
      this.beneArray.push(this.bene)
      this.beneArray.push(this.bene)
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
      this.router.navigate(['home/payment-acceptance', { pipo: data.pi_poNo,pipo_id: this.pipo_id, file: this.file }]);
    } else {
      this.router.navigateByUrl(`/home/completed-task/${data._id}`);
    }

  }

  showThisPdf(piPo) {
    let a = [];
    a.push(piPo)
    this.pipoArr = a;
    this.documentService.draft = false;
    this.router.navigate(['home/payment-acceptance', {
      pipo: this.pipoArr,
      amount: this.selectedRow.amount,
      pipo_id: this.pipo_id,
      file: this.file
    }]);

  }

  showThisPdf1(piPo) {
    this.documentService.draft = false;
    console.log(this.myRadio)

    if (this.myRadio == 'axisBank') {
      console.log("h");
      this.router.navigate(['home/payment-acceptance', {
        pipo: this.pipoArr,
        amount: this.amount,
        pipo_id: this.pipo_id,
        file: this.file
      }]);
    }
    else {
      this.router.navigate(['home/payment-acceptance', {
        pipo: this.pipoArr,
        amount: this.amount,
        pipo_id: this.pipo_id,
        file: this.file
      }]);

    }

  }

}
