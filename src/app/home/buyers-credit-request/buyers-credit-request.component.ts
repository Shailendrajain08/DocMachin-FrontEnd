import { Component, OnInit } from "@angular/core";
import { DocumentService } from "../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-buyers-credit-request',
  templateUrl: './buyers-credit-request.component.html',
  styleUrls: ['./buyers-credit-request.component.scss']
})
export class BuyersCreditRequestComponent implements OnInit {
  public item1;
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
  public selectedDoc1 = "";
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
  beneDetail: any;
  item: any;
  boe: boolean = false;
  pipo: string;
  pipoValue: string = 'select PI/PO';
  arrayData: any = [];
  beneArray: any = [];
  pipoArr: any = [];
  amountArray: any = [];
  outTog: boolean;
  amountArray1: any = [];
  alertToggle: boolean;
  item3: any;
  constructor(
    public documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
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
    this.documentService.getPipo().subscribe(
      (res: any) => {
        console.log("HEre Response", res), (this.item1 = res.data);
      },
      (err) => console.log(err)
    );
    this.userService.getBene(1).subscribe(
      (res: any) => {
        (this.beneDetail = res.data),
          console.log("Benne Detail", this.beneDetail);
      },
      (err) => console.log("Error", err)
    );

    this.documentService.getBcTask({ file: "buyerCredit" }).subscribe(
      (res: any) => {
        this.allTransactions = res.task;
        console.log("ALL TRANSACTIONS", this.allTransactions);
      },
      (err) => console.log(err)
    );
  }

  clickPipo(a, b, c, d, e) {


    if (e['airwayBlcopy']) {
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
    else {
      this.alertToggle = true
      setTimeout(() => {
        console.log('hi')
        this.alertToggle = false
      }, 5000);
      return
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


  // getTransactions(selectedRowValues) {
  //   this.documentService.getLcTask({ pi_poNo: selectedRowValues, file:this.file }).subscribe(
  //     (res: any) => {
  //       this.allTransactions = res.task;
  //       console.log("ALL TRANSACTIONS", this.allTransactions);
  //     },
  //     (err) => console.log(err)
  //   );
  // }

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

  modo(a) {
    console.log(a)
    this.documentService.getBoe(a)
      .subscribe(
        data => {
          this.boe = true
          this.item = data['data']
          console.log("king123")
          console.log(data['data'])
          console.log("Boe Data", this.item)
          this.documentService.getPipoByBene(a)
            .subscribe(
              data1 => {
                this.boe = true
                this.item3 = data1['data']
                console.log("king123")
                console.log(data1)


                //this.router.navigate(['/login'], { queryParams: { registered: true }});
              },
              error1 => {
                console.log("error")
              });
        },
        error => {
          console.log("error")
        });
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
    console.log(data.beneDetail.beneName)


    if (!data.completed) {
      this.documentService.task = data
      this.documentService.draft = true;
      //data.pipoDetail["_id"] = data._id;
      this.documentService.pdfData = data.pipoDetail;
      if (data.bank == 'yesBank') {
        this.router.navigate(['home/trade-request-letter', data.beneDetail.beneName]);
      }
      else if (data.bank == 'axisBank') {
        this.router.navigate(['home/buyers-credit-axis', data.beneDetail.beneName]);
      }


    } else {
      this.router.navigateByUrl(`/home/completed-task/${data._id}`);
    }

  }

  showThisPdf() {
    this.documentService.draft = false;
    console.log(this.selectedDoc)
    console.log(this.pipoArr)
    if (this.myRadio == 'axisBank') {
      console.log("h");
      this.router.navigate(['home/buyers-credit-axis', {
        pipo: this.pipoArr,
        amount: this.selectedDoc
      }]);
      //this.router.navigate(['home/buyers-credit-axis', this.selectedDoc]);
    }
    else {
      //this.router.navigate(['home/trade-request-letter', this.selectedDoc]);
      this.router.navigate(['home/trade-request-letter', {
        pipo: this.pipoArr,
        amount: this.selectedDoc
      }]);
    }

  }

}
