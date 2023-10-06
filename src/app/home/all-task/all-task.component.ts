import { DocumentService } from "../../service/document.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss']
})
export class AllTaskComponent implements OnInit {
  public item1: any;
  public item2;
  public user;
  public selectedRow;
  public showInvoice;
  public tableWidth;
  public export = false;
  public import = true;
  public lastIndex;
  public showPdf = false;
  public greaterAmount = 0;
  public selectedDoc = "";
  public allTransactions: any = [];
  Ax1: boolean;
  Ax2: boolean;
  step1: any;
  myRadio: any;
  url: any;
  file: any;
  pending: boolean;
  completed: boolean;
  all: boolean;

  data: any;
  constructor(
    public documentService: DocumentService, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private router: Router) {


  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.file = this.route.snapshot.params['file'];
      this.showInvoice = false;
      console.log("hello")
      if (this.file === 'pending') {
        console.log("hello1")
        this.pending = true;
        this.completed = false;
        this.all = false;
      }
      else if (this.file === 'completed') {
        this.pending = false;
        this.completed = true;
        this.all = false;
      }
      else if (this.file === 'all') {
        this.pending = false;
        this.completed = false;
        this.all = true;
      }

    });
    this.documentService.getAllExport("hhh").subscribe(
      (res: any) => {
        console.log("HEre Response", res), (this.item2 = res.data);
        console.log(this.item2)
      },
      (err) => console.log(err)
    );
    this.documentService.getAllTask("hhh").subscribe(
      (res: any) => {
        console.log("HEre Response", res), (this.item1 = res.task);
        console.log(this.item1)
      },
      (err) => console.log(err)
    );

  }




  clicked(data) {
    this.data = data
    console.log(data)
  }

  viewTask(data) {
    console.log(data)
    if (!data.completed) {
      this.documentService.task = data
      this.documentService.draft = true;
      //data.pipoDetail["_id"] = data._id;
      this.documentService.pdfData = data.pipoDetail;
      if (data.bank == 'axisBank') {
        if (data.file == "inland") {
          this.router.navigate(['home/letterOfCreditInlandAxis', { pipo: data.pi_poNo, file: this.file }]);
        }
        else if (data.file == "import") {
          this.router.navigate(['home/letter-of-credit-import-axis', { pipo: data.pi_poNo, file: this.file }]);
        }
        else if (data.file == "boe") {
          this.router.navigateByUrl(`/home/direct-import-axis/${data.boeNumber}`);
        }
        else if (data.file == "advance") {

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
        else if (data.file.startsWith('s')) {
          this.router.navigate(['home/a2cum-application', { pipo: data.pi_poNo, file: data.file }]);
        }

      }
      else if (data.bank == 'yesBank') {
        if (data.file == "inland") {
          this.router.navigate(['home/letter-of-credit', { pipo: data.pi_poNo, file: this.file }]);
        }
        else if (data.file == "import") {
          this.router.navigate(['home/letter-of-credit-import', { pipo: data.pi_poNo, file: this.file }]);
        }
        else if (data.file == "boe") {
          this.router.navigateByUrl(`/home/inward-remittance-boe/${data.boeNumber}`);
        }
        else if (data.file == 'advance') {
          if (parseInt(data.pipoDetail.amount) < 200000) {
            this.documentService.pdfData = this.selectedRow;
            this.router.navigateByUrl(`/home/inward-remittance/${data.pi_poNo}`);
          } else {
            console.log(this.selectedDoc);
            this.router.navigateByUrl(`/home/fbg-wavier/${data.pi_poNo}`);

          }
        }
        else if (data.file.startsWith('s')) {
          this.router.navigate(['home/a2cum-application-yesbank', { pipo: data.pi_poNo, file: data.file }]);
        }
      }


    } else {
      this.router.navigateByUrl(`/home/completed-task/${data._id}`);
    }

  }

  showThisPdf(piPo) {
    this.documentService.draft = false;
    console.log(this.myRadio)
    if (this.myRadio == 'axisBank') {
      console.log("h");
      if (parseInt(this.selectedRow.amount) < 200000) {
        console.log("h1");
        this.documentService.pdfData = this.selectedRow;
        this.router.navigateByUrl(`/home/advance-remittance/${piPo}`);
      } else {
        console.log(this.selectedDoc);
        console.log("h2");
        console.log("pipo", piPo);
        this.router.navigateByUrl(`/home/advance-remittance-fbg/${piPo}`);

      }
    }
    else {
      if (parseInt(this.selectedRow.amount) < 200000) {
        this.documentService.pdfData = this.selectedRow;
        this.router.navigateByUrl(`/home/inward-remittance/${piPo}`);
      } else {
        console.log(this.selectedDoc);


        this.router.navigateByUrl(`/home/fbg-wavier/${piPo}`);

      }
    }

  }

  viewExportTask(data) {
    console.log(data)
    this.router.navigateByUrl(`/home/completed-export/${data._id}`);
  }

  viewExportPendingTask(data) {
    this.documentService.draft = true
    this.documentService.task = data
    if (data.fileType == 'BL') {
      this.router.navigateByUrl(`/home/bill-lodgement`);
    }
    else if (data.fileType == 'PCR') {
      this.router.navigateByUrl(`/home/packing-credit-request`);
    }
    else if (data.fileType == 'IRD') {
      this.router.navigateByUrl(`/home/export-home`);
    }

  }

  import1() {
    this.import = !this.import
    this.export = !this.export
  }

  export1() {
    console.log("inside export")
    this.import = !this.import
    this.export = !this.export
  }

}
