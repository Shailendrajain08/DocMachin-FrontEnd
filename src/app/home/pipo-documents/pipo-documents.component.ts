import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DocumentService } from '../../service/document.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import {
  DropzoneDirective,
  DropzoneConfigInterface,
} from 'ngx-dropzone-wrapper';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from '../../app.config';
import * as xlsx from 'xlsx';
import {PipoDataService} from "../../service/homeservices/pipo.service";

@Component({
  selector: 'app-pipo-documents',
  templateUrl: './pipo-documents.component.html',
  styleUrls: [
    '../../../sass/application.scss',
    './pipo-documents.component.scss',
  ],
})
export class PipoDocumentsComponent implements OnInit, AfterViewInit {
  @ViewChild('piposummery', { static: false }) piposummery: ElementRef;
  @ViewChild(DropzoneDirective, { static: true })
  directiveRef?: DropzoneDirective;

  @ViewChild('inputName', { static: true }) public inputRef: ElementRef;
  public type: string = 'directive';
  public item1 = [];
  public item = [];
  public item2;
  public item3 = [];
  public item4 = [];
  public item5 = [];
  mergedBOE = [];

  public user;
  public selectedRow;
  public showInvoice = false;
  public tableWidth;
  public export = false;
  public import = false;
  public lastIndex;
  public showPdf = false;
  public greaterAmount = 0;
  public selectedDoc = '';
  public allTransactions: any = [];
  public optionsVisibility: any = [];
  public Ax1: boolean;
  public Ax2: boolean;
  public step1: any;
  public url: any;
  public file: any;
  public doc: string;
  public pipo: boolean;
  public boe: boolean;
  public sb: boolean;
  public docu: any;
  public pipoNo: any;
  public toggle: boolean = false;

  public config: DropzoneConfigInterface;
  public config1: DropzoneConfigInterface;

  authToken: string;
  headers: any;

  piPoForm = new FormGroup({
    pi_poNo: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    benneName: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    incoterm: new FormControl('', Validators.required),
    lastDayShipment: new FormControl('', Validators.required),
    paymentTerm: new FormArray([this.initCourse()], Validators.required),
    pcRefNo: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });
  public pipoData: any;
  public payTerm: any;
  public benneDetail: any;
  public documentType: any;
  public beneValue: any;
  public z: any;
  public i: any;
  public pipourl1: any;
  public file1: any;
  public id: any;
  public pipo_id: any;
  public pipourl11: any;
  public piPoUrl: any;
  public toggle1: boolean;
  public toggle3: boolean;
  public toggle2: boolean;
  public upfile: any;
  public docTog: boolean;
  public pipoDoc: any = 'a';
  public viewData: any;
  public closeResult: string;
  public buttonToggle: any = false;
  public letterToggle: boolean;
  public uploadIsurance: boolean;
  public lcNumber: any;
  public lcAmount: any;
  public lcCurrency: any;
  public buttonToggle1: any;
  public buyer: boolean;
  public api_base: any;

  constructor(
    @Inject(PLATFORM_ID) public platformId,
    private formBuilder: FormBuilder,
    public documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public appconfig: AppConfig,
    private pipoDataService: PipoDataService,
  ) {
    this.api_base = appconfig.apiUrl;
    console.log(this.api_base);
    this.loadFromLocalStorage();
    console.log(this.authToken);
    this.headers = {
      Authorization: this.authToken,
    };

    if (isPlatformBrowser(this.platformId)) {
      console.log('asdkhsajvdsug');

      this.config1 = {
        url: `${this.api_base}/member/uploadImage`,
        method: `POST`,
        maxFiles: 5,
        maxFilesize: 5,
        addRemoveLinks: true,
        headers: this.headers,
        timeout: 120000,
        // autoProcessQueue: false,
        dictDefaultMessage: 'Drag a document here',
        acceptedFiles:
          'image/*,application/pdf,.psd,.txt,.doc,.docx,.ppt,.pptx, .pps, .ppsx',
        previewTemplate:
          '<div  class="dz-preview dz-file-preview" style="text-align: right; margin-right:3px;">\n <div class="dz-image" style="text-align: right; margin-right:3px;"> <img data-dz-thumbnail /></div>\n <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <i style="color: red; text-align: center;font-size: 30px;" class="fa fa-exclamation-circle"></i>\n  </div>\n</div>',
      };
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.pipo_id = this.route.snapshot.params['pipo_id'];
    console.log(this.id, this.pipo_id);
    this.documentService.getBoe(1).subscribe(
      (res: any) => {
        console.log(res), (this.item4 = res.data);
        console.log('data', this.item4);
        // this.mergeBoe();
        // this.mergeBOe1()
      },
      (err) => console.log(err)
    );

    if (this.id) {
      this.documentService.getPipo().subscribe(
        (res: any) => {
          console.log('Data fetched successfully', res);
          this.item = res.data;
          console.log(this.item);
          this.pipoDataService.setPipoData(res.data, 'import');
          this.pipoDataService.pipo$.subscribe((data) => {
            for (let value of data) {
              this.item1.push(value);
              this.mergeBoe();
            }
          });
        },
        (err) => console.log(err)
      );

      this.documentService.getPipoByPipoNo(this.pipo_id).subscribe(
        (data) => {
          let index = this.route.snapshot.params['index'];
          console.log('king123');
          console.log(data);
          console.log(data['data'][0]);
          this.getInvoices(data['data'][0], index);
        },
        (error) => {
          console.log('error');
        }
      );
    } else {
      // this.route.params.subscribe(params => {
      //   this.file = this.route.snapshot.params['id'];
      //   this.documentService.getPipo().subscribe(
      //     (res: any) => {
      //       console.log("HEre Response", res), (this.item1 = res.data);
      //     },
      //     (err) => console.log(err)
      //   );

      //   this.showInvoice = false;
      //   console.log("hello")
      // });
      this.documentService.getPipo().subscribe(
        (res: any) => {
          console.log('Data fetched successfully', res);
          this.item = res.data;
          console.log(this.item);
          this.pipoDataService.setPipoData(res.data, 'import');
          this.pipoDataService.pipo$.subscribe((data) => {
            for (let value of data) {
              this.item1.push(value);
              this.mergeBoe();
            }
          });
        },
        (err) => console.log(err)
      );

      this.userService.getBene(1).subscribe(
        (res: any) => {
          (this.benneDetail = res.data),
            console.log('Benne Detail', this.benneDetail);
        },
        (err) => console.log('Error', err)
      );
    }
  }

  mergeBoe() {
    let filterboedata = [];
    if (this.item4 && this.item4.length) {
      for (let pipo of this.item1) {
        for (let boedata of this.item4) {
          console.log('line 254', boedata);
          for (let i = 0; i <= boedata.pipo.length; i++) {
            if (pipo._id == boedata.pipo[i]) {
              const newVal = { ...pipo };
              console.log('Line no. 263', newVal);
              newVal['boeNumber'] = boedata.boeNumber;
              newVal['boeDate'] = boedata.boeDate;
              newVal['region'] = boedata.origin;
              newVal['invoiceAmount'] = boedata.invoiceAmount;
              newVal['dischargePort'] = boedata.dischargePort;
              newVal['freightAmount'] = boedata.freightAmount;
              console.log('Line no 271', newVal);
              filterboedata.push(newVal);
              console.log('Line no. 273', filterboedata);
            }
          }
        }
      }
      for (let pipo of this.item1) {
        if(!pipo.boe){
          let newVal = {...pipo}
          filterboedata.push(newVal)
        }
        }
    } else {
      console.log("Your are on Else part")
      for (let pipo of this.item1) {
        let newVal = { ...pipo };
        filterboedata.push(newVal);
      }
    }

    this.item3 = filterboedata;
  }

  lcFun(a) {
    console.log('s');
    this.lcNumber = a;
  }

  amountFun(a) {
    console.log('l');
    this.lcAmount = a;
  }

  currencyFun(a) {
    console.log('r');
    this.lcCurrency = a;
  }

  public loadFromLocalStorage() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    return this.authToken;
  }

  getTransactions(selectedRowValues) {
    this.documentService
      .getTask({ pi_poNo: selectedRowValues, file: 'advance' })
      .subscribe(
        (res: any) => {
          this.allTransactions = res.task;
          console.log('ALL TRANSACTIONS', this.allTransactions);
        },
        (err) => console.log(err)
      );
  }

  toggleClick(a) {
    this.toggle = true;
    this.toggle2 = true;
    console.log(a);

    if (a == 'PI') {
      if (this.pipoData.doc) {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipoData.doc
        );
      } else {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipourl11
        );
      }
    }
    if (a == 'PO') {
      if (this.pipoData.doc1) {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipoData.doc1
        );
      } else {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipourl11
        );
      }
    }
  }

  toggleClick2(a) {
    this.upfile = a;
    this.toggle = true;
    this.toggle1 = true;
    this.toggle3 = false;
  }

  initCourse() {
    console.log('hdhdhdh');
    return this.formBuilder.group({
      date: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(11)]],
      type: ['', [Validators.required]],
      amount: ['', Validators.required],
    });
  }

  getCourses(form) {
    return form.get('paymentTerm').controls;
  }

  clickBene(value) {
    console.log('hhddh');
    this.beneValue = value;
  }

  getInvoices(selectedRowValues, i) {
    console.log(selectedRowValues.pi_poNo);
    this.showInvoice = true;
    this.router.navigate([
      'home/pipo-doc',
      {
        id: selectedRowValues.pi_poNo,
        page: 'details',
        index: i,
        pipo_id: selectedRowValues._id
      },
    ]);
    console.log('SELECTED', selectedRowValues);
    console.log('INDEX', i);
    console.log(selectedRowValues.doc);
    this.pipoData = selectedRowValues;
    this.payTerm = this.pipoData.paymentTerm;
    console.log(this.pipoData, 'payment check');
    console.log(this.pipoData.paymentTerm);
    this.documentType = this.pipoData.document;
    this.lastIndex = i;
    this.pipoNo = selectedRowValues.pi_poNo;
    this.beneValue = this.pipoData.benneName;
    this.docTog = false;
    this.buttonToggle = false;
    this.buttonToggle1 = false;
    this.buyer = false;
    this.letterToggle = false;
    this.uploadIsurance = false;
    if (this.pipoData.document == 'PO') {
      this.pipourl1 = selectedRowValues.doc1;
    } else if (this.pipoData.document == 'PI') {
      this.pipourl1 = selectedRowValues.doc;
    }

    this.file1 = selectedRowValues.file;
    this.id = selectedRowValues._id;

    //this.docu = selectedRowValues.doc;
    this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
      selectedRowValues.doc
    );

    this.z = this.payTerm.length;
    console.log(this.z);
    if (this.payTerm.length > 1) {
      console.log('1');
      this.i = 1;
      for (let j = 1; j < this.payTerm.length; j++) {
        this.onAddCourse(1);
      }
    }
    return (
      (this.selectedRow = selectedRowValues),
      (this.showInvoice = true),
      (this.tableWidth = '30%'),
      (this.greaterAmount = parseInt(this.selectedRow.amount))
    );
  }

  pipoClick() {
    console.log('upload');
    this.router.navigate(['home/upload', { file: 'import', document: 'pipo' }]);
  }

  pipoClickCredit() {
    this.router.navigate([
      'home/upload',
      { file: 'import', document: 'creditNote' },
    ]);
  }

  pipoClickDebit() {
    this.router.navigate([
      'home/upload',
      { file: 'import', document: 'debitNote' },
    ]);
  }

  pipoClickInsurance() {
    this.router.navigate([
      'home/upload',
      { file: 'import', document: 'insuranceCopy' },
    ]);
  }

  pipoClickTri() {
    this.router.navigate([
      'home/upload',
      { file: 'import', document: 'tryPartyAgreement' },
    ]);
  }

  hide3() {
    this.showInvoice = false;
    // this.router.navigate(['/home/pipo-export']);
  }

  selectDoc(a) {
    if (a != 'Shipping Bill' && a != 'Bill of Entry') {
      this.docTog = true;
      this.pipoDoc = a;
      this.upfile = 'a';
    } else if (a == 'Shipping Bill') {
      this.router.navigate(['home/upload', { file: 'import', document: 'sb' }]);
    } else if (a == 'Bill of Entry') {
      this.router.navigate([
        'home/upload',
        {
          file: 'import',
          document: 'boe',
          pipo: this.pipoData.pi_poNo,
          pipo_id: this.pipoData._id,
          bene: this.pipoData.benneName,
        },
      ]);
    }
    else if (a == 'Bill of Entry') {
      this.router.navigate(['home/upload', { file: 'import', document: 'boe', pipo: this.pipoData.pi_poNo,pipo_id: this.pipoData._id, bene: this.pipoData.benneName }]);
    }

  }

  toggleStep1() {
    this.step1 = false;
    this.showPdf = false;
  }

  openDoc(a) {
    console.log(a);
    if (a == 'Advance Payment') {
      this.router.navigate([
        'home/advance-outward-remittance',
        {
          file: this.pipoData.pi_poNo,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
        },
      ]);
    } else if (a == 'Direct Import') {
      console.log('hello');
      this.router.navigate([
        'home/direct-import-payment',
        {
          file: this.pipoData.pi_poNo,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
        },
      ]);
    } else if (a == 'Collection Bill') {
      this.buttonToggle = !this.buttonToggle;
    } else if (a == 'Letter of Credit') {
      if (this.pipoData.lcIssuance && this.pipoData.lcIssuance1) {
        this.buttonToggle1 = !this.buttonToggle1;
        console.log('dhhh');
        // this.router.navigate(['home/bill-under-collection', {
        //   file: "nonlcUsance", pipo: this.pipoData.pi_poNo, bene: this.pipoData.benneName, amount: this.pipoData.amount
        // }]);
      } else if (this.pipoData.lcIssuance) {
        this.buttonToggle1 = !this.buttonToggle1;
        console.log('2232');
      } else if (this.pipoData.lcIssuance1 && !this.pipoData.lcIssuance) {
        this.uploadIsurance = !this.uploadIsurance;
        this.letterToggle = false;
      } else {
        this.letterToggle = !this.letterToggle;
        this.uploadIsurance = false;
      }
    }
  }

  changeCheckbox() {
    this.buyer = !this.buyer;
  }

  openSubDoc(a) {
    console.log(a);
    if (a == 'usance') {
      console.log(a);
      this.router.navigate([
        'home/bill-under-collection',
        {
          file: 'nonlcUsance',
          pipo: this.pipoData.pi_poNo,
          pipo_id: this.pipoData._id,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
        },
      ]);
    } else if (a == 'sight') {
      console.log(a);
      this.router.navigate([
        'home/bill-under-collection',
        {
          file: 'nonlcSight',
          pipo: this.pipoData.pi_poNo,
          pipo_id: this.pipoData._id,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
        },
      ]);
    }
  }

  openSubDoc1(a) {
    console.log(a);
    if (a == 'usance' && !this.buyer) {
      console.log(a);
      this.router.navigate([
        'home/bill-under-collection',
        {
          file: 'lcUsance',
          pipo: this.pipoData.pi_poNo,
          pipo_id: this.pipoData._id,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
          buyer: false,
        },
      ]);
    } else if (a == 'sight' && !this.buyer) {
      console.log(a);
      this.router.navigate([
        'home/bill-under-collection',
        {
          file: 'lcSight',
          pipo: this.pipoData.pi_poNo,
          pipo_id: this.pipoData._id,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
          buyer: false,
        },
      ]);
    } else if (a == 'usance' && this.buyer) {
      this.router.navigate([
        'home/bill-under-collection',
        {
          file: 'lcUsance',
          pipo: this.pipoData.pi_poNo,
          pipo_id: this.pipoData._id,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
          buyer: true,
        },
      ]);
    } else if (a == 'sight' && this.buyer) {
      this.router.navigate([
        'home/bill-under-collection',
        {
          file: 'lcSight',
          pipo: this.pipoData.pi_poNo,
          pipo_id: this.pipoData._id,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
          buyer: true,
        },
      ]);
    }
  }

  openSubLetter(a) {
    if (a == 'yes') {
      console.log(a);
      // this.router.navigate(['home/bill-under-collection', {
      //   file: "nonlcUsance", pipo: this.pipoData.pi_poNo,pipo_id: this.pipoData._id, bene: this.pipoData.benneName, amount: this.pipoData.amount
      // }]);
      this.uploadIsurance = !this.uploadIsurance;
      this.letterToggle = !this.letterToggle;
    } else if (a == 'no') {
      console.log(a);
      // this.router.navigate(['home/bill-under-collection', {
      //   file: "nonlcSight", pipo: this.pipoData.pi_poNo,pipo_id: this.pipoData._id, bene: this.pipoData.benneName, amount: this.pipoData.amount
      // }]);
      this.router.navigate([
        'home/lc-isurance',
        {
          file: 'import',
          pipo: this.pipoData.pi_poNo,
          pipo_id: this.pipoData._id,
          bene: this.pipoData.benneName,
          amount: this.pipoData.amount,
        },
      ]);
    }
  }

  // getTrasactions() {
  //   const data: any = this.documentService.getTask();
  //   this.allTransactions = data.task;
  // }

  onAddCourse(a) {
    console.log(a);
    if (a === 1) {
      console.log(a);
      let control = this.piPoForm.controls.paymentTerm as FormArray;
      control.push(this.initCourse());
      if (this.i >= this.payTerm.length) {
        this.payTerm.push([]);
      }
      this.i++;
    } else {
      console.log(a);

      // if (a.controls.bankDetails.invalid) {
      //   this.submitted1 = true
      //   this.toastr.error('You can add another bank after filling first one!');
      //   console.log("2")
      //   this.isDisabled = false;
      //   return;
      // }

      const control = this.piPoForm.get('paymentTerm') as FormArray;
      control.push(this.initCourse());
      this.payTerm.push([]);

      this.z++;
      this.i++;
    }
  }

  removeAddress(i) {
    // console.log(i)
    // //console.log(this.control)
    let control1 = this.piPoForm.controls.paymentTerm as FormArray;
    // console.log(control1)
    // console.log(control1.length)
    // console.log(this.bankName)
    // console.log(this.currencyName)
    control1.removeAt(i);
    this.payTerm.splice(i, 1);
    this.z = this.z - 1;
    // this.bankName.splice(i, 1)
    // this.currencyName.splice(i, 1)
    // console.log(this.bankName)
    // console.log(this.currencyName)
    // console.log(control1.length)
  }

  // viewTask(data) {
  //   console.log(data)
  //   if (!data.completed) {
  //     this.documentService.task = data
  //     this.documentService.draft = true;
  //     //data.pipoDetail["_id"] = data._id;
  //     this.documentService.pdfData = data.pipoDetail;
  //     if (parseInt(this.selectedRow.amount) < 200000) {
  //       this.documentService.pdfData = this.selectedRow;
  //       this.router.navigateByUrl(`/home/inward-remittance/${data.pi_poNo}`);
  //     } else {
  //       console.log(this.selectedDoc);
  //       this.router.navigateByUrl(`/home/fbg-wavier/${data.pi_poNo}`);

  //     }

  //   } else {
  //     this.router.navigateByUrl(`/home/completed-task/${data._id}`);
  //   }

  // }

  onSubmitPipo() {
    console.log(this.id);
    console.log(this.piPoForm.value);
    var temp:any = {
      ...this.piPoForm.value
    }
    temp.doc = this.pipourl1;
    temp.file = this.file1;
    temp.document = this.documentType;
    temp.benneName = this.beneValue;
    console.log(temp);
    this.userService.updatePipo(temp, this.id).subscribe(
      (data) => {
        console.log('king123');
        console.log(data['data']);
        this.toastr.success('PI/PO updated successfully.');
        this.toggle = false;
        this.toggle2 = false;
        // this.toastr.success('Company details updated successfully.');
        // this.router.navigate(['/home/dashboardTask']);
      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        // console.log("error")
      }
    );
  }

  viewClick(a) {
    if (a == 'lcIssuance') {
      console.log(this.pipoData[a].doc);
      console.log(this.pipoData[a]);
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.pipoData[a].doc
      );
      console.log(this.viewData);
    } else {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.pipoData[a]
      );
      console.log(this.viewData);
    }
  }

  onSubmitPipo1() {
    console.log(this.id);
    console.log(this.piPoForm.value);
    var temp:any = {
      ...this.piPoForm.value
    }
    temp.doc1 = this.pipourl1;
    temp.doc = this.pipourl11;
    temp.file = this.file1;
    temp.document = 'PI';
    temp.benneName = this.beneValue;
    console.log(temp);
    this.userService.updatePipo(temp, this.id).subscribe(
      (data) => {
        console.log('king123');
        console.log(data['data']);
        this.toastr.success('PI/PO updated successfully.');
        this.documentType = 'PI';
        this.toggle = false;
        this.toggle3 = false;
        this.toggle1 = false;

        // this.toastr.success('Company details updated successfully.');
        // this.router.navigate(['/home/dashboardTask']);
      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        // console.log("error")
      }
    );
  }

  cancel() {
    this.toggle = false;
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    //this.uploading = false;
    console.log('onUploadError:', args, args[1].message);
  }
  public onUploadSuccess(args: any): void {
    console.log(args);
    if (this.upfile == 'PI') {
      this.toggle3 = true;
      this.pipourl11 = args[1].data;
      this.piPoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        args[1].data
      );
    } else if (this.upfile == 'PO') {
      this.pipoData.doc1 = args[1].data;
      this.userService.updatePipo(this.pipoData, this.id).subscribe(
        (data) => {
          console.log('king123');
          console.log(data['data']);
          this.toastr.success('PI/PO updated successfully.');
          this.documentType = 'PI';
          this.toggle = false;
          this.toggle3 = false;
          this.toggle1 = false;

          // this.toastr.success('Company details updated successfully.');
          // this.router.navigate(['/home/dashboardTask']);
        },
        (error) => {
          // this.toastr.error('Invalid inputs, please check!');
          // console.log("error")
        }
      );
    } else if (this.upfile != 'PO' && this.upfile != 'PO') {
      if (this.uploadIsurance) {
        this.pipoDoc = 'lcIssuance';
        let data = {
          lcNumber: this.lcNumber,
          lcAmount: this.lcAmount,
          lcCurrency: this.lcCurrency,
          doc: args[1].data,
        };
        this.userService
          .updateSinglePipo(this.id, this.pipoDoc, data)
          .subscribe(
            (data) => {
              this.pipoData[`${this.pipoDoc}`] = args[1].data;
              console.log('king123');
              console.log(data['data']);
              this.toastr.success('PI/PO updated successfully.');
              this.docTog = false;
              this.toggle = false;
              this.toggle2 = false;
              this.uploadIsurance = false;
              // this.toastr.success('Company details updated successfully.');
              // this.router.navigate(['/home/dashboardTask']);
            },
            (error) => {
              // this.toastr.error('Invalid inputs, please check!');
              console.log('error');
            }
          );
      } else {
        console.log(args[1].data);
        this.userService
          .updateSinglePipo(this.id, this.pipoDoc, args[1].data)
          .subscribe(
            (data) => {
              this.pipoData[`${this.pipoDoc}`] = args[1].data;
              console.log('king123');
              console.log(data['data']);
              this.toastr.success('PI/PO updated successfully.');
              this.docTog = false;
              this.toggle = false;
              this.toggle2 = false;
              // this.toastr.success('Company details updated successfully.');
              // this.router.navigate(['/home/dashboardTask']);
            },
            (error) => {
              // this.toastr.error('Invalid inputs, please check!');
              // console.log("error")
            }
          );
      }
    }
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngAfterViewInit() {
    // window["sidebarInit"]();
    // if (isPlatformBrowser(this.platformId)) {
    //   this.filePreview();
    // }
  }

  toSave(data, index) {
    this.optionsVisibility[index] = false;
    console.log('555555555555550', data);
    this.userService.updatePipo(data, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('PI/PO updated successfully.'); // this.docTog = false
        // this.toggle = false
        // this.toggle2 = false
        // this.uploadIsurance = false
        // this.toastr.success('Company details updated successfully.');
        // this.router.navigate(['/home/dashboardTask']);
      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        console.log('error');
      }
    );
  }

  toEdit(index) {
    this.optionsVisibility[index] = true;
    this.toastr.warning('PI/PO Is In Edit Mode');
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(
      this.piposummery.nativeElement
    );
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Import -pipo.xlsx');
  }
}
