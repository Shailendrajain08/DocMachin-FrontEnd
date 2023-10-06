import {
  AfterViewInit,
  ChangeDetectorRef,
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
import { ActivatedRoute, Data, NavigationStart, Router } from '@angular/router';
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
import * as XLSX from 'xlsx';
import * as xlsx from 'xlsx';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { data } from 'jquery';
import { SharedDataService } from '../shared-Data-Servies/shared-data.service';
import { formatDate } from '@angular/common';
import _ from 'lodash';
import { filter } from 'rxjs-compat/operator/filter';
import { BehaviorSubject, Observable } from 'rxjs';
import { PipoDisplayListViewItem, PipoDisplayListView } from '../../../model/pipo.model';
@Component({
  selector: 'app-pipo-doc-export',
  templateUrl: './pipo-doc-export.component.html',
  styleUrls: [
    '../../../sass/application.scss',
    './pipo-doc-export.component.scss',
  ],
})
export class PipoDocExportComponent implements OnInit, AfterViewInit {

  @ViewChild(DropzoneDirective, { static: true })
  directiveRef?: DropzoneDirective;
  bsModalRef: BsModalRef;
  @ViewChild('piposummery', { static: false }) piposummery: ElementRef;
  @ViewChild('table', { static: false }) table: ElementRef;
  @ViewChild('inputName', { static: true }) public inputRef: ElementRef;
  public pipoArrayList: Array<PipoDisplayListViewItem> = [];
  public pipoDisplayListData: PipoDisplayListView;
  public pipoData: PipoDisplayListViewItem;
  public config: DropzoneConfigInterface;
  public config1: DropzoneConfigInterface;
  piPoForm = new FormGroup({
    pi_poNo: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    buyerName: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    incoterm: new FormControl('', Validators.required),
    lastDayShipment: new FormControl('', Validators.required),
    paymentTerm: new FormArray([this.initCourse()], Validators.required),
    pcRefNo: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });


  public type: string = 'directive';
  public otherDocData: any;
  public item19: any;
  public item23: any;
  public item;
  public item2;
  public item10: any;
  public item12: any;
  public item13 = [];
  public item21 = [];
  public user;
  public selectedRow;
  public showInvoice = false;
  public showInvoice1 = true;
  public tableWidth;
  public export = false;
  public import = false;
  public lastIndex;
  public showPdf = false;
  public greaterAmount = 0;
  public selectedDoc = '';
  public allTransactions: any = [];
  public optionsVisibility: any = [];
  public damagesUSD: any;
  public selectedrow;
  public currentindex;
  public pipoDetails: any = [];

  Ax1: boolean;
  Ax2: boolean;
  step1: any;
  url: any;
  file: any;
  doc: string;
  pipo: boolean;
  debitNote: boolean;
  commercial: boolean;
  destruction: boolean;
  otherDoc: boolean;
  packingList: boolean;
  blCopy: boolean;
  billOfExchange: boolean;
  boe: boolean;
  sb: boolean;
  docu: any;
  docu1: any;
  pipoNo: any;
  toggle: boolean = false;
  nameSearch: string = '';
  Comoval: any = 'Commodity';
  nameSearch1: string = '';
  Locaval: any = 'Location';
  creditdata: any = 'date';
  nameSearch2: string = '';
  startDate: any = '';
  endDate: any = '';
  authToken: string;
  headers: any;
  payTerm = [];
  benneDetail: any;
  documentType: any;
  beneValue: any;
  z: any;
  i: any;
  pipourl1: any;
  file1: any;
  id: any;
  pipourl11: any;
  piPoUrl: any;
  toggle1: boolean;
  toggle3: boolean;
  toggle2: boolean;
  upfile: any;
  docTog: boolean;
  pipoDoc: any = 'a';
  viewData: any;
  closeResult: string;
  buttonToggle: any = false;
  letterToggle: boolean;
  uploadIsurance: boolean;
  lcNumber: any;
  lcAmount: any;
  lcCurrency: any;
  buttonToggle1: any;
  buyer: boolean;
  api_base: any;
  invoiceArr: any = [];
  commodity: any;
  commoArray: any = [];
  location: any;
  loc: any;
  loc1: boolean;
  item4: any;
  viewData1: any;
  obj: any;
  item6: any;
  toggle4: boolean;
  toggle5: boolean;
  toggle6: boolean;
  toggle7: boolean;
  jstoday: any;
  today = new Date();
  agreement: any;

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
    private changeDetectorRef: ChangeDetectorRef,
    private modalService1: BsModalService,

    private sharedData: SharedDataService,
    private pipoDataService: PipoDataService,
  ) {
    this.api_base = appconfig.apiUrl;
    this.loadFromLocalStorage();
    console.log(this.authToken);
    this.headers = {
      Authorization: this.authToken,
    };
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    console.log(this.jstoday);

    if (isPlatformBrowser(this.platformId)) {
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
  openModalWithComponent(a) {
    this.invoiceArr = this.pipoData[a];
    console.log('pipoDataaaaaaa', this.pipoData[a]);

    const initialState = {
      list: this.invoiceArr,
    };
    this.bsModalRef = this.modalService1.show(ModalContentComponent1, {
      initialState,
      class: 'modal-lg',
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  viewsb(a) {
    this.viewData1 = this.sanitizer.bypassSecurityTrustResourceUrl(a['doc']);
  }

  open2(content3) {
    this.modalService
      .open(content3, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.currentindex = this.route.snapshot.params['index'];
    var pipo_id = this.route.snapshot.params['pipo_id'];
    console.log('index of detail page', this.currentindex);
    //Agreement Api
    this.documentService.getMasterService().subscribe(
      (res: any) => {
        console.log('HEre Response of master service agreement', res);
        this.item12 = res.data;
        console.log('second log agreement', this.item12);
        for (let value of this.item12) {
          if (value['file'] == 'export') {

            this.item13.push(value);
            // console.log('awwww', this.item11);
          }
        }
      },
      (err) => console.log(err)
    );
    if (this.id) {
      this.documentService.getPipo().subscribe(
        (res: any) => {
          console.log('HEre ResponseAmani####', res);
          this.item = res.data;
          this.pipoDisplayListData = this.pipoDataService.setPipoData(res.data, 'export');
          this.pipoDataService.pipo$.subscribe((data) => {
            // this.pipoArrayList = data;
            for (let value of data) {
              // if (value['file'] == 'export') {
                this.pipoArrayList.push(value);
              // }
            }
            // console.log('shailendra Jain #####################', this.item22);
          });
          this.getSinglePipo(pipo_id, 0);
        },
        (err) => console.log(err, '**********')
      );

      this.documentService.getPipo().subscribe(
        (res: any) => {
          console.log("HEre Response cheching for", res), (this.pipoDetails = res.data);
          let value1 = []
          for (let value of this.pipoDetails) {
            if (value.file == 'export') {
              value1.push(value)
            }
          }
          this.pipoDetails = value1
          console.log('Export Pipo', this.pipoDetails)
        },
        (err) => console.log(err)
      );
    } else {
      this.documentService.getPipo().subscribe(
        (res: any) => {
          console.log('HEre Response pipo data ########', res);
          this.item = res.data;
          this.pipoDisplayListData = this.pipoDataService.setPipoData(res.data, 'export');
          this.pipoDataService.pipo$.subscribe((data) => {
            for (let value of data) {
                this.pipoArrayList.push(value);
            }
          });
        },
        (err) => console.log(err)
      );

      this.documentService.getPipo().subscribe(
        (res: any) => {
          console.log("HEre Response cheching for", res), (this.pipoDetails = res.data);
          let value1 = []
          for (let value of this.pipoDetails) {
            if (value.file == 'export') {
              value1.push(value)
            }
          }
          this.pipoDetails = value1
          console.log('Export Pipo', this.pipoDetails)
        },
        (err) => console.log(err)
      );

    }
    this.userService.getBuyer(1).subscribe(
      (res: any) => {
        (this.benneDetail = res.data),
          console.log('Benne Detail', this.benneDetail);
      },
      (err) => console.log('Error', err)
    );

    this.userService.getTeam().subscribe(
      (data) => {
        console.log('llllllllllllllllllllllllllllllll');
        console.log(' checking for buyer name', data['data'][0]);
        this.location = data['data'][0]['location'];
        this.commodity = data['data'][0]['commodity'];
        console.log(this.location);
        console.log('jsadffhsjshd', this.commodity);

        //this.router.navigate(['/addMember'], { queryParams: { id: data['data']._id } })
      },
      (error) => {
        console.log('error');
      }
    );
  }

  getSinglePipo(id, i) {
    this.showInvoice = true;
    this.selectedrow = data;
    this.currentindex = i;
    this.documentService.getPipoByPipoNo(id).subscribe(
      (data) => {
        this.pipoDataService.setSinglePipoData(data['data'][0]);
        this.pipoDataService.pipoSingle$.subscribe((selectedPipo) => {
          this.pipoData = selectedPipo;
          console.log('calling get invoices', this.pipoData);
          this.getInvoices(selectedPipo, i);
        });
      },
      (error) => {
        console.log('error');
      }
    );
  }

  clickBuyer(value) {
    let commoArray = [];
    console.log('hhddh');
    this.Comoval = value;
  }
  clickloca(value) {
    this.Locaval = value;
  }

  fireEvent() {
    this.changeDetectorRef.detectChanges();

    console.log(this.table);
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // console.log(wb)
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // console.log(wb)
    // /* save to file */
    // XLSX.writeFile(wb, 'SheetJS.xlsx');
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

  public selectedshippingdata;
  toggleClick5(a, shippingData) {
    this.selectedshippingdata = shippingData;
    this.toggle = true;
    this.toggle4 = false;
    this.toggle5 = true;
    this.toggle2 = false;
    this.toggle3 = false;
    this.toggle6 = false;
    // console.log('*****************', this.item20);
    console.log('thihfdfsdfgdsfkjgsf', this.pipoData);

    let currentpipo = this.route.snapshot.params['id'];
    // for(let item of this.item20){
    //   if(item.sbno == this.pipoData.sbno){
    //     this.selectedshippingdata = item
    // }

    // }
    console.log(this.selectedshippingdata, 'this is conslo');

    if (a == 'sb') {
      if (this.pipoData[a]) {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipoData[a]
        );
        console.log(this.pipoData.doc1, 'hey***************#######');
      } else {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipourl11
        );
      }
    }
  }
  public irdata;
  toggleClick6(a, irAdvicecopy) {
    this.irdata = irAdvicecopy;
    this.toggle = true;
    this.toggle4 = false;
    this.toggle6 = true;
    this.toggle2 = false;
    this.toggle5 = false;
    this.toggle3 = false;
    this.toggle7 = false;

    // console.log('*****************', this.iradvicedata);
    console.log('thihfdfsdfgdsfkjgsf', this.pipoData);

    let currentpipo = this.route.snapshot.params['id'];
    // for(let item of this.iradvicedata){
    //   if(item.pipo == this.pipoData.pi_poNo){
    //     this.irdata= item
    // }

    // }
    console.log(this.irdata, 'this is conslo');

    if (a == 'irAdvice') {
      if (this.pipoData[a]) {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipoData[a]
        );
        console.log(this.pipoData.doc1, 'hey***************#######');
      } else {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipourl11
        );
      }
    }
  }
  toggleClick7(a) {
    this.toggle7 = true;
    this.toggle = true;
    this.toggle4 = false;
    this.toggle6 = false;
    this.toggle2 = false;
    this.toggle5 = false;
    this.toggle3 = false;
    if (a == 'billUnder') {
      if (this.pipoData[a]) {
        this.docu1 = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipoData[a]
        );
        console.log(this.pipoData.doc1, 'hey***************#######');
      } else {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipourl11
        );
      }
    }
    if (a == 'sb') {
      if (this.pipoData[a]) {
        this.docu1 = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipoData[a].sb
        );
        console.log(this.pipoData.doc1, 'hey***************#######');
      } else {
        this.docu1 = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipourl11
        );
      }
    }
  }
  toggleClick4(a) {
    this.toggle4 = true;
    this.toggle = true;
    this.toggle2 = false;
    this.toggle3 = false;
    this.toggle5 = false;
    this.toggle7 = false;
    console.log("this.pipoData[a]", this.pipoData.doc1)

    // if (a == 'advanceOutward') {
    //   if (this.pipoData.doc) {
    //     this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
    //       this.pipoData.doc
    //     );
    //     console.log(this.pipoData.doc1, 'hey***************#######');
    //   } else if (this.pipoData.doc1){
    //     this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
    //       this.pipoData.doc
    //     );
    //   }else {
    //     this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
    //       this.pipourl11
    //     );
    //   }
    // }
    if (a == 'advanceOutward') {
      if (this.pipoData[a]) {
        this.docu1 = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipoData[a]
        );
        console.log(this.pipoData.doc1, 'hey***************#######');
        if (this.pipoData.doc) {
          this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.pipoData.doc
          );
          console.log(this.pipoData.doc1, 'hey***************#######');
        } else if (this.pipoData.doc1){
          this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.pipoData.doc1
          );
        }else {
          this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.pipourl11
          );
        }
      } else {
        this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pipourl11
        );
      }
    }
  }

  toggleClick(a) {
    this.toggle = true;
    this.toggle2 = true;
    this.toggle4 = false;
    console.log(a);
    this.beneValue = this.pipoData.buyerName;
    console.log('chechingggggggggg', this.pipoData);

    this.commoArray = this.pipoData.commodity;
    console.log(this.commoArray);
    this.loc = this.pipoData.location;
    this.loc1 = true;
    console.log(this.loc);
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
        console.log(this.pipoData.doc1, 'hey***************#######');
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
    this.toggle4 = false;
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

  removeComo(i) {
    this.commoArray.splice(i, 1);
  }

  clickComo(value) {
    console.log('hhddh');
    let j = this.commoArray.indexOf(value);
    if (j == -1) {
      this.commoArray.push(value);
    }
  }

  getInvoices(selectedPipo, i) {
    console.log(selectedPipo.pi_poNo);
    this.showInvoice = true;
    this.router.navigate([
      'home/pipo-export',
      {
        id: selectedPipo.pi_poNo,
        page: 'details',
        index: i,
        pipo_id: selectedPipo._id,
      },
    ]);
    this.payTerm = this.pipoData.paymentTerm;
    this.documentType = this.pipoData.document;
    this.lastIndex = i;
    this.pipoNo = selectedPipo.pi_poNo;
    this.beneValue = this.pipoData.buyerName;
    this.docTog = false;
    this.buttonToggle = false;
    this.buttonToggle1 = false;
    this.buyer = false;
    this.letterToggle = false;
    this.uploadIsurance = false;
    if (this.pipoData.document == 'PO') {
      this.pipourl1 = selectedPipo.doc1;
    } else if (this.pipoData.document == 'PI') {
      this.pipourl1 = selectedPipo.doc;
    }

    this.file1 = selectedPipo.file;
    this.id = selectedPipo._id;

    //this.docu = selectedPipo.doc;
    this.docu = this.sanitizer.bypassSecurityTrustResourceUrl(
      selectedPipo.doc
    );
    console.log('payterm', this.payTerm);
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
      (this.selectedRow = selectedPipo),
      (this.tableWidth = '30%'),
      (this.greaterAmount = parseInt(this.selectedRow.amount))
    );
  }

  newCredit() {
    this.router.navigate([
      'home/upload',
      { file: 'export', document: 'creditNote' },
    ]);
  }
  newPipo() {
    console.log('upload');
    // let exportbtn = document.getElementById('export')
    // exportbtn.classList.add('nothing');

    // console.log(exportbtn,"export");

    this.router.navigate(['home/upload', { file: 'export', document: 'pipo' }]);
  }
  newShipping() {
    this.router.navigate([
      'home/upload',
      {
        file: 'export',
        document: 'sb',
        // pipo: this.pipoData.pi_poNo,
        // bene: this.pipoData.buyerName,
      },
    ]);
  }
  newDebit() {
    this.router.navigate([
      'home/upload',
      { file: 'export', document: 'debitNote' },
    ]);
  }
  newInsurance() {
    this.router.navigate([
      'home/upload',
      { file: 'export', document: 'insuranceCopy' },
    ]);
  }
  newLoc() {
    this.router.navigate([
      'home/upload',
      { file: 'export', document: 'lcCopy' },
    ]);
  }
  newtriparty() {
    this.router.navigate([
      '/home/upload',
      {
        file: 'export',
        document: 'tryPartyAgreement',
      },
    ]);
  }
  newopinoin() {
    this.router.navigate([
      '/home/upload',
      {
        file: 'export',
        document: 'opinionReport',
      },
    ]);
  }

  selectDoc(a) {
    if (a != 'Shipping Bill' && a != 'Bill of Entry') {
      this.docTog = true;
      this.pipoDoc = a;
      this.upfile = 'a';
    } else if (a == 'Shipping Bill') {
      this.router.navigate([
        'home/upload',
        {
          file: 'import',
          document: 'sb',
          pipo: this.pipoData.pi_poNo,
          bene: this.pipoData.buyerName,
        },
      ]);
    } else if (a == 'Bill of Entry') {
      this.router.navigate([
        'home/upload',
        {
          file: 'import',
          document: 'boe',
          pipo: this.pipoData.pi_poNo,
          bene: this.pipoData.buyerName,
        },
      ]);
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
        'home/export-home',
        {
          pipo: this.pipoData.pi_poNo,

          index: this.currentindex,
        },
      ]);
    }
    // else if (a == 'Direct Import') {
    //   console.log('hello')
    //   this.router.navigate(['home/direct-import-payment', {
    //     file: this.pipoData.pi_poNo, bene: this.pipoData.buyerName, amount: this.pipoData.amount
    //   }]);
    // }
    else if (a == 'Collection Bill') {
      this.router.navigate([
        'home/bill-lodgement',
        {
          pipo: this.pipoData.pi_poNo,

          index: this.currentindex,
        },
      ]);
    } else if (a == 'packing Credit Request') {
      this.router.navigate(['home/packing-credit-request']);
    } else if (a == 'Letter of Credit') {
      // if (this.pipoData.lcIssuance && this.pipoData.lcIssuance1) {
      //   this.buttonToggle1 = !this.buttonToggle1
      //   console.log('dhhh')
      this.router.navigate([
        '/home/upload',
        {
          file: 'export',
          document: 'lcCopy',
          pipo: this.pipoData.pi_poNo,
        },
      ]);
      // , {file: "nonlcUsance", pipo: this.pipoData.pi_poNo, bene: this.pipoData.buyerName, amount: this.pipoData.amount
      // }]);
    }
    //   else if (this.pipoData.lcIssuance) {
    //     this.buttonToggle1 = !this.buttonToggle1
    //     console.log('2232')
    //   }
    //   else if (this.pipoData.lcIssuance1 && !this.pipoData.lcIssuance) {
    //     this.uploadIsurance = !this.uploadIsurance
    //     this.letterToggle = false
    //   }
    //   else {
    //     this.letterToggle = !this.letterToggle
    //     this.uploadIsurance = false
    //   }

    // }
    // }
  }

  changeCheckbox() {
    this.buyer = !this.buyer;
  }
  navigate(file, document, pi_poNo, buyerName, pipo_id) {
    this.router.navigate([
      '/home/upload',
      {
        file: file,
        document: document,
        pipo: pi_poNo,
        pipo_id: pipo_id,
        bene: buyerName,
        index: this.currentindex
      },
    ])
  }
  //single page upload all documents
  openUploadWithType(type) {
    this.navigate('export', type, this.pipoData.pi_poNo, this.pipoData.buyerName, this.pipoData._id);
  }
  uploadInward() {
    this.router.navigate([
      'home/export-home',
      {
        pipo: this.pipoData.pi_poNo,
        pipo_id: this.pipoData._id,
        index: this.currentindex,
      },
    ]);
  }
  uploadCollectionBill() {
    this.router.navigate([
      'home/bill-lodgement',
      {
        pipo: this.pipoData.pi_poNo,
        pipo_id: this.pipoData._id,
        index: this.currentindex,
      },
    ]);
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
          bene: this.pipoData.buyerName,
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
          bene: this.pipoData.buyerName,
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
          bene: this.pipoData.buyerName,
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
          bene: this.pipoData.buyerName,
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
          bene: this.pipoData.buyerName,
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
          bene: this.pipoData.buyerName,
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
      //   file: "nonlcUsance", pipo: this.pipoData.pi_poNo, bene: this.pipoData.buyerName, amount: this.pipoData.amount
      // }]);
      this.uploadIsurance = !this.uploadIsurance;
      this.letterToggle = !this.letterToggle;
    } else if (a == 'no') {
      console.log(a);
      // this.router.navigate(['home/bill-under-collection', {
      //   file: "nonlcSight", pipo: this.pipoData.pi_poNo, bene: this.pipoData.buyerName, amount: this.pipoData.amount
      // }]);
      this.router.navigate([
        'home/lc-isurance',
        {
          file: 'import',
          pipo: this.pipoData.pi_poNo,
          bene: this.pipoData.buyerName,
          amount: this.pipoData.amount,
        },
      ]);
    }
  }

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

  hide3() {
    this.showInvoice = false;
    this.router.navigate(['/home/pipo-export']);
  }
  hide1() {
    this.showInvoice = true;
    this.toggle = false;
    this.toggle2 = false;
  }
  hide2() {
    this.showInvoice = true;
    this.toggle = false;
    this.toggle1 = false;
  }

  toSave(data, index) {
    this.optionsVisibility[index] = false;
    console.log('555555555555550', data);
    this.userService.updatePipo(data, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('PI/PO updated successfully.'); // this.docTog = false
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

  onSubmitPipo() {
    console.log(this.id);
    console.log(this.piPoForm.value);
    var temp: any = {
      ...this.piPoForm.value
    }
    temp.doc = this.pipourl1;
    temp.file = this.file1;
    temp.document = this.documentType;
    temp.buyerName = this.beneValue;
    console.log(this.piPoForm.value);
    this.userService.updatePipo(this.piPoForm.value, this.id).subscribe(
      (data) => {
        console.log('king123');
        console.log(data['data']);
        this.toastr.success('PI/PO updated successfully.');
        this.toggle = false;
        this.toggle2 = false;
      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
      }
    );
  }

  viewClick(a, currentData?: any) {
    if (a == 'lcIssuance') {
      console.log(this.pipoData[a].doc);
      console.log(this.pipoData[a]);
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.pipoData[a].doc
      );
      console.log(this.viewData);
    } else if (a == 'invoiceReduction') {
      console.log(this.pipoData[a]);
      this.invoiceArr = this.pipoData[a];
    } else if (a == 'swiftCopy') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'EBRC') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'swiftCopyRef') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'blcopyref') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'tryPartyAgreement') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'debitNote') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'creditNote') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'lcCopy') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'opinionReport') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
      console.log('viewdata', this.viewData);
    } else if (a == 'blCopy') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'billOfExchange') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'commercial') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.commercialDoc
      );
    } else if (a == 'destruction') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'otherDoc') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.doc
      );
    } else if (a == 'packingList') {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.packingDoc
      );
    }
    else if(a == 'airwayBlcopy'){
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        currentData.blCopyDoc
      );
    } else {
      this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.pipoData[a]
      );
    }
  }

  onSubmitPipo1() {
    console.log(this.id);
    console.log(this.piPoForm.value);
    var temp:any = {
      ...this.piPoForm.value,
    }
    temp.doc1 = this.pipourl1;
    temp.doc = this.pipourl11;
    temp.file = this.file1;
    temp.document = 'PI';
    temp.buyerName = this.beneValue;
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

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(
      this.piposummery.nativeElement
    );
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Pipo-Summary.xlsx');
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

  opensb(content3) {
    this.modalService
      .open(content3, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  open(content) {
    this.changeDetectorRef.detectChanges();

    console.log('this is table', this.table);
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

  open1(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
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
}

import {PipoDataService} from "../../service/homeservices/pipo.service";

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button
        type="button"
        class="close pull-right"
        aria-label="Close"
        (click)="bsModalRef.hide()"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <table #table>
      <tr style="border: 0.5px solid black;">
        <td style="border: 0.5px solid black;">SL NO</td>
        <td style="border: 0.5px solid black;">Invoice Date</td>
        <td style="border: 0.5px solid black;">Invoice No</td>
        <td style="border: 0.5px solid black;">Port Code</td>
        <td style="border: 0.5px solid black;">
          Shipping <br />
          Bill No
        </td>
        <td style="border: 0.5px solid black;">
          Shipping <br />
          Bill Date
        </td>
        <td style="border: 0.5px solid black;">Invoice Value</td>
        <td style="border: 0.5px solid black;">
          Damage <br />
          Deduction
        </td>
        <td style="border: 0.5px solid black;">
          Value to be <br />
          Realised
        </td>
        <td style="border: 0.5px solid black;">Forex Advice No</td>
      </tr>
      <tr
        *ngFor="let value of invoiceArray; let i = index"
        style="border: 0.5px solid black;"
      >
        <td style="border: 0.5px solid black;">
          {{ i + 1 }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.pipoValue.date }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.pipoValue.pi_poNo }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.portCode }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.sbno }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.sbdate }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.pipoValue.amount }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.pipoValue.damage }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.pipoValue.realized }}
        </td>
        <td style="border: 0.5px solid black;">
          {{ value.advance }}
        </td>
      </tr>
    </table>
    <button
      style="font-family: 'Nunito Sans', sans-serif !important; min-width: 160px; margin-top: 20px; padding: 6px; font-size: 12px; font-weight: 700; background-color: RGB(81, 174, 229); border-radius: 20px; border: none; outline: none; height: 35px; color: RGB(255, 255, 255);"
      type="button"
      class="btn btn-default"
      (click)="fireEvent()"
    >
      Download Invoice
    </button>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">
        {{ closeBtnName }}
      </button>
    </div>
  `,
})
export class ModalContentComponent1 implements OnInit {
  title: string;
  closeBtnName: string;
  invoiceArray = [];
  list: any[] = [];
  @ViewChild('table', { static: true }) table: ElementRef;
  epltable: any;
  static epltable: any;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    console.log(this.table);
    console.log(this.list);
    this.invoiceArray = this.list;
  }

  fireEvent() {
    console.log(this.table);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    console.log(wb);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    console.log(wb);
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}
function selectedRowValues(selectedRowValues: any, i: any) {
  throw new Error('Function not implemented.');
}

