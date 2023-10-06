import { DocumentService } from "../../service/document.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { UserService } from "../../service/user.service";
import { AppConfig } from "src/app/app.config";

@Component({
  selector: 'app-ca-documents',
  templateUrl: './ca-documents.component.html',
  styleUrls: ['./ca-documents.component.scss']
})
export class CaDocumentsComponent implements OnInit, AfterViewInit {
  @Input() que: any;
  @Input() entities: any;
  @ViewChild('inputName', { static: true }) public inputRef: ElementRef;
  public type: string = 'directive';
  public disabled: boolean = false;
  @ViewChild(DropzoneDirective, { static: true }) directiveRef?: DropzoneDirective;
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
  headers: { Authorization: any; };
  authToken: any;
  public config: DropzoneConfigInterface;
  data: any;
  api_base: any;
  constructor(
    public documentService: DocumentService,
    @Inject(PLATFORM_ID) public platformId, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private router: Router, public appconfig: AppConfig) {
    this.loadFromLocalStorage()
    this.api_base = appconfig.apiUrl;
    console.log(this.api_base)
    console.log(this.authToken)
    this.headers = {
      Authorization: this.authToken,
    }

    if (isPlatformBrowser(this.platformId)) {
      this.config = {
        url: `${this.api_base}/member/uploadImage`, //`${this.api_base}/member/uploadImage`
        method: `POST`,
        maxFiles: 5,
        maxFilesize: 5,
        addRemoveLinks: true,
        headers: this.headers,
        timeout: 120000,
        // autoProcessQueue: false,
        dictDefaultMessage: 'Drag a document here',
        acceptedFiles: 'image/*,application/pdf',
        previewTemplate: '<div  class=\"dz-preview dz-file-preview\" style=\"text-align: right; margin-right:3px;\">\n <div class=\"dz-image\" style=\"text-align: right; margin-right:3px;\"> <img data-dz-thumbnail /></div>\n <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <i style=\"color: red; text-align: center;font-size: 30px;\" class=\"fa fa-exclamation-circle\"></i>\n  </div>\n</div>'
      };
    }
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
    this.documentService.getCaTask(1).subscribe(
      (res: any) => {
        console.log("HEre Response", res), (this.item1 = res.task);
        console.log(this.item1)
      },
      (err) => console.log(err)
    );
  }


  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    //this.uploading = false;
    console.log('onUploadError:', args, args[1].message);
  }
  public onUploadSuccess(args: any): void {
    //this.uploading = false;]
    console.log(args[1].data)
    console.log(this.data)
    this.data.caUrl = args[1].data;
    this.data.caDone = "yes"
    console.log(this.data)
    this.documentService.completeTask({ _id: this.data._id, task: this.data }).subscribe(
      (res1) => {
        console.log("COMPLETED");
        this.documentService.taskEmail({ task: this.data }).subscribe(
          (res2) => {
            console.log("Email Sent");
            //this.router.navigate(["/home/advance-outward-remittance"]);
          },
          (err) => console.log("ERROR")
        );
        //this.router.navigate(["/home/advance-outward-remittance"]);
      },
      (err) => console.log("ERROR")
    );

  }

  clicked(data) {
    this.data = data
    console.log(data)
  }

  viewTask(data) {
    console.log("hhhh")
    this.router.navigateByUrl(`/home/completed-task/${data._id}`);

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

  public loadFromLocalStorage() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    return this.authToken;
  }

  ngAfterViewInit() {
    //   window['sidebarInit']();
    //   if (isPlatformBrowser(this.platformId)) {
    //     this.filePreview();
    //   }
  }

}
