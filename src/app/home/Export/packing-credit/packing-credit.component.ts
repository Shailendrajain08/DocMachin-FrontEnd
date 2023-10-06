import { Component, OnDestroy, OnInit } from "@angular/core";
import { DocumentService } from "../../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import * as data from '../../../inward.json';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from "@angular/platform-browser";
import { UserService } from "../../../service/user.service";
import { ConfirmDialogService } from "../../../confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'app-packing-credit',
  templateUrl: './packing-credit.component.html',
  styleUrls: ['./packing-credit.component.scss']
})
export class PackingCreditComponent implements OnInit, OnDestroy {
  public item1;
  public item2;
  public user;
  public selectedRow;
  public showInvoice;
  public select = false;
  public tableWidth;
  public export = false;
  public import = false;
  public lastIndex;
  public showPdf = false;
  public greaterAmount = 0;
  public selectedDoc = "";
  public Question1 = '';
  public Question2 = '';
  public Question3 = '';
  public Question4 = '';
  public Question5 = '';
  public Question6 = '';
  public Question7 = '';
  public Question8 = '';
  public Question9 = '';
  public Question10 = '';
  public allTransactions: any = [];
  public generateIndex;
  lodgement1: any;
  lodgement2: any;
  Ax1: boolean;
  Ax2: boolean;
  step1: any;
  myRadio: any;
  myRadio1: any;
  myRadio2: any;
  myRadio3: any;
  myRadio4: any;
  myRadio5: any;
  myRadio6: any;
  purposeSelect = false;
  selectPurpose = false
  public selectedPurpose: any = [];
  url: any;
  file: any;
  purposeCode: any;
  detail: any;
  jsondata: any;
  purposeRows: any[];
  dataJson: any;
  pgNumber = 0;
  pcNumber = 0;
  selectedPipo: boolean = false;
  selectedRowSb: boolean = false;
  item3: any;
  selectedSb: boolean;
  proceed: boolean = true;
  c: any;
  pipoArray: any = [];
  sbArray: any = [];
  tryArray: any = [];
  bankReference: any;
  generate0: boolean = false;
  generate3: boolean = false;
  generate1: boolean = false;
  generate2: boolean = false;
  generate4: boolean = false;
  generate5: boolean = false;
  generate6: boolean = false;
  data4: any;
  data5: any;
  data6: any;
  data7: any = [];
  done: boolean;
  doc: any = [];
  generate: boolean;
  generatePurpose: any = [];
  sbPurpose: any = [];
  sbPurpose1: any = [];
  importPurpose: any = [];
  noImportPurpose: any = [];
  donePurpose: any = [];
  doneSbPurpose: any = [];
  doneImportPurpose: any = [];
  mainDoc: any = [];
  mainDoc1: any;
  mainDoc2: any;
  mainDoc3: any;
  doc1: boolean;
  data8: any;
  data9: any = [];
  dataImport: any;
  sbPurposeDone1: any = [];
  item4 = [];
  item5 = [];
  bankRef: any;
  newTask: any = [];
  z: any;
  zToggle: any = [];
  isDone: boolean;
  isGenerate: boolean = false;
  isProceed: boolean = false;
  advanceRef: any;
  billOfCredit: any;
  lc: any;
  withDiscount: any;
  scrutiny: any;
  arr: any = [];
  totalAmount: any;
  isDoneAll: boolean;
  constructor(
    public documentService: DocumentService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService
  ) {
    console.log("hello")
  }

  ngOnInit(): void {
    //window.location.reload();
    console.log(data['default'])
    this.jsondata = data['default'];
    console.log(this.jsondata[0].purpose)
    this.dataJson = this.jsondata


    this.route.params.subscribe(params => {
      this.file = this.route.snapshot.params['file'];
      this.showInvoice = false;
      console.log("hello")
    });
    // this.documentService.getMaster(1).subscribe(
    //   (res: any) => {
    //     console.log(res), (this.item1 = res.data);
    //   },
    //   (err) => console.log(err)
    // );

    this.documentService.getPipo().subscribe(
      (res: any) => {
        console.log("HEre Response", res), (this.item1 = res.data);
      },
      (err) => console.log(err)
    );

    this.documentService.getThird().subscribe(
      (res: any) => {
        console.log("HEre Response Third", res);
        this.item5 = res.data;
        for (let value of this.item5) {
          if (value['file'] == 'export') {

            this.item4.push(value);
            console.log('awwww', this.item4);
          }
        }
      },
      (err) => console.log(err)
    );

    this.userService.getTeam()
      .subscribe(
        data => {
          console.log("king123")
          console.log(data['data'][0])
          this.item3 = data['data'][0]
          console.log(this.item3)
          this.arr = this.item3.gst.split('');
          console.log(this.arr)
          //this.letterHead = data['data'][0].file[0]["Letter Head"]
          //this.router.navigate(['/addMember'], { queryParams: { id: data['data']._id } })

        },
        error => {
          console.log("error")
        });

    if (this.documentService.task) {
      this.generate = true
      this.isGenerate = true;
      if (this.documentService.task.task[0].pipoUrls) {
        let k = 0;
        let gene = []

        for (let value of this.documentService.task.task[0].pipoUrls) {
          let r = value.changingThisBreaksApplicationSecurity
          gene.push(this.sanitizer.bypassSecurityTrustResourceUrl(r))
          k++
        }
        this.mainDoc1 = gene
        this.pipoArray = this.documentService.task.task[0].pipoNumbers
      }
    }
  }

  changeCheckbox1(value) {
    let j = this.pipoArray.indexOf(value)
    if (j == -1) {
      this.pipoArray.push(value)
    }
    else {
      this.pipoArray.splice(j, 1)
    }

    console.log(this.pipoArray)
  }

  changeCheckbox2(value) {
    let j = this.tryArray.indexOf(value)
    if (j == -1) {
      this.tryArray.push(value)
    }
    else {
      this.tryArray.splice(j, 1)
    }

    console.log(this.tryArray)
  }

  generateDoc1() {
    //console.log(code, j)
    this.generate = true
    this.isGenerate = true;

    let generateDoc2: any = [];
    let amount = 0
    if (this.Question1 == 'no') {
      for (let item of this.item1) {
        for (let sb of this.pipoArray) {
          if (item.pi_poNo === sb) {
            generateDoc2.push(this.sanitizer.bypassSecurityTrustResourceUrl(
              item.doc
            ))
            amount = amount + parseInt(item.amount)
          }
        }
      }
      this.totalAmount = amount
      console.log(this.totalAmount)
      this.mainDoc1 = generateDoc2
    }

    if (this.Question1 == 'no') {
      console.log('hhshshs')
      if (this.Question2 == 'fob') {
        console.log('1')
        this.totalAmount = this.totalAmount * 0.90
      }
      else if (this.Question2 == 'cif') {
        console.log('2')
        this.totalAmount = this.totalAmount * 0.75
      }
    }
    else if (this.Question1 == 'yes') {
      console.log('3')
      this.totalAmount = ''
    }

    this.newTask[0] = {
      pipoNumbers: this.pipoArray,
      pipoUrls: this.mainDoc1,
      purposeCode: '',
      bankRef: '',
      amount: this.totalAmount
    }
    console.log(this.totalAmount)
  }

  onBack() {
    this.isGenerate = false;
    this.pipoArray = []
  }


  doneDox() {
    console.log(this.newTask)
    if (this.documentService.draft) {
      this.documentService.updateExportTask({ task: this.newTask, completed: 'yes', fileType: 'PCR' }, this.documentService.task._id).subscribe(
        (data) => {
          console.log("king123");
          console.log(data);
          this.documentService.draft = false
          this.documentService.task.id = ''
          this.isDoneAll = true
          this.toastr.success('Task saved as completed successfully!');
          this.router.navigate(["/home/dashboardTask"]);
          //this.router.navigate(['/login'], { queryParams: { registered: true }});
        },
        (error) => {
          console.log("error");
        }
      );
    }
    else {
      this.documentService.addExportTask({ task: this.newTask, completed: 'yes', fileType: 'PCR' }).subscribe(
        (res) => {
          this.isDoneAll = true
          this.toastr.success('Task saved successfully!');
          console.log("Transaction Saved");
          this.router.navigate(["/home/dashboardTask"]);

        },
        (err) => {
          this.toastr.error('Error!');
          console.log("Error saving the transaction")
        }
      );
    }

  }

  exportAsPDF1() {
    if (this.Question7 == 'yes') {
      this.lc = 'lc'
    }
    else if (this.Question7 == 'no') {
      this.lc = 'nonLc'
    }

    this.scrutiny = this.Question8;
    this.withDiscount = this.Question9


    const height =
      Math.round($("#mainId").outerHeight() * 0.0104166667 * 10) / 10;
    console.log($("#mainId").html());
    this.documentService
      .getPDF({
        data: $("#mainId").html(),
        filename: "Final Report",
        format: {
          paperWidth: 7,
          paperHeight: height + 5,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        template:
          "./app/modules/pdfGenerationModule/pdfTemplate/finalreport.ejs",
      })
      .subscribe((data) => {
        if (data && data.success) {
          console.log(data);
          this.data4 = data
          this.data5 = data.file.replace('application/octet-stream', 'application/pdf')
          console.log(this.data5)
          this.data6 = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.data5
          );
          console.log(this.data6)
          this.data8 = this.data6
          //this.newTask.url1 = this.data5;
          this.done = true;
          this.newTask[0] = {
            pipoNumbers: this.pipoArray,
            pipoUrls: this.mainDoc1,
            purposeCode: '',
            bankRef: '',
            generateDoc1: this.data8,
            amount: this.totalAmount
          }
          this.isProceed = true

        }
      });
  }

  sendMail() {
    let val = {
      file: this.bankRef
    }
    this.documentService.exportEmail({ task: val }).subscribe(
      (res2) => {
        this.toastr.success('Message sent successfully!');
        console.log("Email Sent");

        //this.router.navigate(["/home/advance-outward-remittance"]);
      },
      (err) => console.log("ERROR")
    );
  }

  change(e) {
    console.log(e.target.value);
    this.advanceRef = e.target.value
  }

  edit() {

  }
  downloadPDF() {

  }

  ngOnDestroy() {
    console.log("Inside draft");

    if (!this.isDoneAll && this.generate && !this.documentService.draft) {
      this.confirmDialogService.confirmThis('Do you want to save this task?', () => {
        if (this.isProceed) {
          this.documentService.addExportTask({ task: this.newTask, completed: 'yes', fileType: 'PCR' }).subscribe(
            (res) => {
              this.toastr.success('Saved the transaction as completed');
              console.log("Transaction Saved");
              //this.router.navigate(["/home/dashboardTask"]);

            },
            (err) => {
              this.toastr.error('Error!');
              console.log("Error saving the transaction")
            }
          );
        }
        else {
          this.documentService.addExportTask({ task: this.newTask, completed: 'no', fileType: 'PCR' }).subscribe(
            (res) => {
              this.toastr.success('Saved the transaction as draft');
              console.log("Transaction Saved");
              //this.router.navigate(["/home/dashboardTask"]);

            },
            (err) => {
              this.toastr.error('Error!');
              console.log("Error saving the transaction")
            }
          );
        }

      }, () => {
        console.log("no");
      });
    }

  }

  goBack(){
    this.isGenerate = false;
    this.generate = false;
  }

}
