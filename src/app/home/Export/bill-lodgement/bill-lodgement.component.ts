import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DocumentService } from '../../../service/document.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import * as data from '../../../inward.json';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../service/user.service';
import { ConfirmDialogService } from '../../../confirm-dialog/confirm-dialog.service';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as XLSX from 'xlsx';
import { saveAs as importedSaveAs } from 'file-saver';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import * as xlsx from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bill-lodgement',
  templateUrl: './bill-lodgement.component.html',
  styleUrls: ['./bill-lodgement.component.scss'],
})
export class BillLodgementComponent implements OnInit, OnDestroy {
  @ViewChild('table1') table: ElementRef;
  @ViewChild('billLodge', { static: false }) billLodge: ElementRef;
  closeResult: string;
  public item1 = [];
  public itemArray = [];
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
  public selectedDoc = '';
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
  public optionsVisibility: any = [];
  public generateIndex;
  public itemArray1 = [];
  public irBuyerName = [];
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
  selectPurpose = false;
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
  lcArray: any = [];
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
  randomArray: any = [];
  redirectid: any;
  redirectindex: any;
  redirectpage: any;
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
  mainDoc1: any = [];
  mainDoc2: any;
  mainDoc3: any;
  mainDoc4: any;
  mainDoc5: any;
  doc1: boolean;
  data8: any;
  data9: any = [];
  dataImport: any;
  dataImport2: any;
  sbPurposeDone1: any = [];
  item4 = [];
  item12: any;
  item13 = [];
  bankRef: any;
  newTask: any = [];
  Task: any = [];
  z: any;
  zToggle: any = [];
  isDone: boolean;
  isGenerate: boolean = false;
  isProceed: boolean = false;
  advanceRef: any = '';
  billOfCredit: any;
  lc: any;
  withDiscount: any;
  scrutiny: any;
  item5: any;
  arr: any = [];
  LcNumber: any = '';
  isDoneAll: boolean;
  bankArray: any = [];
  bankToggle: boolean;
  bankValue: any;
  bank: any = [];
  allBank: any = [];
  newBankArray: any = [];
  credit: any;
  charge: any;
  value: any;
  bgColor: boolean;
  newDone: boolean;
  arrayPipo: any = [];
  myArr: any = [];
  str: string;
  dateArray: any = [];
  buyerAds: any;
  buyerAddress2: any;
  buyerAddress3: any;
  buyerAddress4: any;
  teamName1: any = '';
  teamName2: any = [];
  teamName3: any = [];
  teamName4: any = [];
  completewords: any = '';
  devideContent: any = '';
  address1: any = '';
  address2: any = '';
  address3: any = '';
  team1: any = '';
  team2: any = '';
  team3: any = '';
  completewords2: any = '';
  devideContent2: any = '';
  addressLine1: any = '';
  addressLine2: any = [];
  addressLine3: any = [];
  addressLine4: any = [];
  completewords3: any = '';
  devideContent3: any = '';
  buyer1: any = '';
  buyer2: any = [];
  buyer3: any = [];
  buyName1: any = ' ';
  buyName2: any = ' ';
  completewords4: any = '';
  devideContent4: any = '';
  buyerAdd2: any = [];
  buyerAdd3: any = [];
  buyerAdd4: any = [];
  buyerAds1: any = ' ';
  buyerAds2: any = ' ';
  buyerAds3: any = ' ';
  amArr: any = [];
  pipo = false;
  ship = false;
  nameSearch: string = '';
  nameSearch1: string = '';
  nameSearch2: string = '';
  nameSearch3: string = '';
  nameSearch4: string = '';
  item6: any;
  item7: any;
  item = [];
  item8: any;
  item9: any;
  item10: any;
  item11 = [];
  public buyerDetail: any = [];
  startDate: any = '';
  endDate: any = '';
  model = { option: 'Bank options' };
  model1 = { option: 'Bank options' };
  sb: any;
  creditNote: any;
  debitNote: any;
  advanceOutward: any;
  ebrc: any;
  blcopyref: any;
  irAdvice: any;
  agreement: any;
  lcCopy: any;
  swiftCopy: any;
  opinionReport: any;
  tryPartyAgreement: any;
  airwayBlCopy: any;
  billOfExchange: any;
  commercial: any;
  destruction: any;
  insurance: any;
  otherDoc: any;
  packingList: any;
  selectedPdfs = [];
  advanceArray = [];
  currentSbForAdvance: any;
  buyerName = [];
  id: any;
  private genDoc: any;
  billLodgePdf: any;

  advanceForm = new FormGroup({
    advance: new FormArray([this.initCourse()], Validators.required),
  });
  sbDataArray: any[] = [];
  invoiceArr: any[];
  filterToggle = false;
  BytePdfDoc: any;
  formerge: string;
  selectedPdfs2: any[];
  generateChecked: boolean = true;
  forexSbDetail: any;

  constructor(
    public documentService: DocumentService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private httpClient: HttpClient
  ) {
    console.log('hello');
    // this.onAddCourse("e")
  }

  ngOnInit(): void {
    //window.location.reload();
    this.redirectid = this.route.snapshot.paramMap.get('pipo');
    this.redirectindex = this.route.snapshot.paramMap.get('index');
    this.redirectpage = this.route.snapshot.paramMap.get('page');
    console.log('pipoId', this.redirectid);

    console.log(data['default']);
    this.jsondata = data['default'];
    console.log(this.jsondata[0].purpose);
    this.dataJson = this.jsondata;

    //Shipping bill API
    // this.documentService.getMaster(1).subscribe(
    //   (res: any) => {
    //     console.log(res,"SHIPPING DATA"), (this.item2 = res.data);
    //     console.log("shipping bill",this.item2)
    //   },
    //   (err) => console.log(err)
    // );
    //PI/PO API
    this.documentService.getPipo().subscribe(
      (res: any) => {
        console.log('Data fetched successfully', res);
        for (let value of res.data) {
          if (value['file'] == 'export') {
            this.item.push(value);
            console.log('item of pipo', this.item);
          }
        }
      },
      (err) => console.log(err)
    );

    this.userService.getBuyer(1).subscribe(
      (res: any) => {
        (this.buyerDetail = res.data),
          console.log('Benne Detail4', this.buyerDetail);
      },
      (err) => console.log('Error', err)
    );

    // used details
    this.userService.getUserDetail().then((res: any) => {
      console.log('********USer Details', res);

      this.id = res.result.emailId;
      console.log('***********userId', this.id);
    });

    this.documentService.getIrAdvice(1).subscribe(
      (res: any) => {
        console.log(res), (this.item9 = res.data);
        console.log('line no. 324 data', this.item9);
        this.mergeIr();
        this.mergeIr2();
        this.item9.forEach((element, i) => {
          this.irBuyerName[i] = element.partyName;
        });
        this.irBuyerName = this.irBuyerName.filter(
          (value, index) => this.irBuyerName.indexOf(value) === index
        );
        console.log('line no. 329 data', this.irBuyerName);
      },
      (err) => console.log(err)
    );

    this.documentService.getLetterLC().subscribe(
      (res: any) => {
        console.log(res), (this.item8 = res.data);
        console.log('LC Data', this.item8);
      },
      (err) => console.log(err)
    );

    this.route.params.subscribe((params) => {
      this.file = this.route.snapshot.params['file'];
      this.showInvoice = false;
      console.log('hello');
    });
    this.documentService.getMaster(1).subscribe(
      (res: any) => {
        console.log(res), (this.item1 = res.data);
        console.log('Master Data ***********************', this.item1);
        this.mergeIr();
        this.mergeIr2();
        this.item1.forEach((element, i) => {
          this.buyerName[i] = element.buyerName;
        });
        this.buyerName = this.buyerName.filter(
          (value, index) => this.buyerName.indexOf(value) === index
        );
        // console.log(this.buyerName);
        console.log('line no. 367', this.buyerName);
      },
      (err) => console.log(err)
    );

    this.documentService.getMasterWithPipo(1).subscribe(
      (res: any) => {
        console.log('Merged sb with pipo', res);
      },
      (err) => console.log(err)
    );

    this.documentService.getThird().subscribe(
      (res: any) => {
        console.log('HEre Response Third', res);
        this.item12 = res.data;
        console.log('Try Party', this.item12);
        for (let value of this.item12) {
          if (value['file'] == 'export') {
            this.item4.push(value);
            console.log('awwww', this.item4);
          }
        }
      },
      (err) => console.log(err)
    );

    // credit note Api
    this.documentService.getCredit().subscribe(
      (res: any) => {
        console.log('HEre Responsesssssssss', res);
        this.item10 = res.data;
        // this.item6 =this.item3.data;
        console.log('credit data', this.item10);

        for (let value of this.item10) {
          if (value['file'] == 'export') {
            this.item11.push(value);
            console.log('awwww', this.item11);
          }
        }
      },
      (err) => console.log(err)
    );

    this.userService.getTeam().subscribe(
      (data) => {
        console.log('king123');
        console.log(data['data'][0]);
        this.item5 = data['data'][0];
        console.log('this is exporter addres', this.item5);
        this.arr = this.item5.gst.split('');
        console.log(this.arr);
        // console.log("*************************Shailendra", this.item5.teamName)

        this.teamName1 = this.item5.teamName;
        this.addressLine1 = this.item5.adress;

        this.completewords = this.teamName1.split(' ');
        this.devideContent = this.completewords.length;

        for (let i = 0; i < this.completewords.length; i++) {
          if (i < 6) {
            this.teamName2.push(this.completewords[i]);
          } else if (i > 5 && i <= 11) {
            this.teamName3.push(this.completewords[i]);
          }
          // else if(i>9){
          //     this.teamName4.push(this.completewords[i])
          // }
        }

        this.team1 = this.teamName2.join(' ');
        this.team2 = this.teamName3.join(' ');
        // this.team3=this.teamName4.join(" ")

        console.log('*************************Shailendra', this.team1);
        console.log('*************************ShailendraAddress', this.team2);

        this.completewords2 = this.addressLine1.split(' ');
        this.devideContent2 = this.completewords2.length;

        for (let i = 0; i < this.completewords2.length; i++) {
          if (i < 6) {
            this.addressLine2.push(this.completewords2[i]);
          } else if (i > 5 && i <= 11) {
            this.addressLine3.push(this.completewords2[i]);
          } else if (i > 11) {
            this.addressLine4.push(this.completewords2[i]);
          }
        }

        this.address1 = this.addressLine2.join(' ');
        this.address2 = this.addressLine3.join(' ');
        this.address3 = this.addressLine4.join(' ');
        // console.log("Shailendra Address1 ***********************",this.address1)
        // console.log("Shailendra Address2 ***********************",this.address2)
        // console.log("Shailendra Address3 ***********************",this.address3)

        this.bankArray = this.item5.bankDetails;
        for (let value of this.bankArray) {
          this.allBank.push(value.bank);
        }
        console.log(this.allBank);
        this.bank = this.allBank.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
        console.log(this.bank);
        //this.letterHead = data['data'][0].file[0]["Letter Head"]
        //this.router.navigate(['/addMember'], { queryParams: { id: data['data']._id } })
      },
      (error) => {
        console.log('error');
      }
    );
    console.log('this is me');
    console.log('main array*********', this.sbArray);
    if (this.documentService.draft) {
      this.generate = true;
      this.isGenerate = true;
      console.log(this.documentService.task);
      console.log(this.documentService.task.task[0]);
      if (this.documentService.task.task[0].ir == 'yes') {
        console.log('this is ir');
        this.Question5 == this.documentService.task.task[0].ir;
      } else if (this.documentService.task.task[0].ir == 'no') {
        this.Question5 == this.documentService.task.task[0].ir;
      }
      if (this.documentService.task.task[0].sbUrls) {
        console.log('this is sb');
        let k = 0;
        let gene = [];

        for (let value of this.documentService.task.task[0].sbUrls) {
          let r = value.changingThisBreaksApplicationSecurity;
          gene.push(this.sanitizer.bypassSecurityTrustResourceUrl(r));
          k++;
        }
        this.mainDoc1 = gene;
        this.sbArray = this.documentService.task.task[0].sbNumbers;
      }
      if (this.documentService.task.task[0].tryUrls) {
        let h = 0;
        let gene = [];
        for (let value of this.documentService.task.task[0].tryUrls) {
          gene.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(
              value.changingThisBreaksApplicationSecurity
            )
          );
          h++;
        }
        this.mainDoc3 = gene;
        this.tryArray =
          this.documentService.task.task[0].triPartyAgreementNumber;
      }
      if (this.documentService.task.task[0].lcUrls) {
        let h = 0;
        let gene = [];
        for (let value of this.documentService.task.task[0].lcUrls) {
          gene.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(
              value.changingThisBreaksApplicationSecurity
            )
          );
          h++;
        }
        this.mainDoc4 = gene;
        this.lcArray = this.documentService.task.task[0].letterOfCreditNumber;
      }
    } else {
      // this.Question5 = ''
      console.log('line no.505 question5 data', this.Question5);
    }
    setTimeout(()=>{                           // <<<---using ()=> syntax
      // this.merging();
  }, 1000);
  }

  searchData1(a) {
    console.log('hello', a);
    console.log(a.length);
    if (a.length > 0) {
      let arr = [];
      for (let value of this.item1) {
        console.log('value of buyername****', value);
        console.log('value of buyername', value.buyerName);
        if (value.buyerName.includes(a) || value.sbno.includes(a)) {
          console.log('shaile***************', value.buyerName);
          arr.push(value);
        }
      }
      this.itemArray = arr;
      this.filterToggle = true;
      // console.log("shaile***************", this.itemArray)
    } else {
      this.filterToggle = false;
      console.log('else');
    }

    // console.log("shailendra buyerName", a.buyerName)
  }

  fireEvent() {
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

  changeCheckbox1(a, data) {
    // let value = a + " - " +
    if (data.blCopyDoc) {
      if (data.commercialDoc) {
        if (data.packingDoc) {
          let j = this.sbArray.indexOf(a);
          if (j == -1) {
            this.sbArray.push(a);
          } else {
            this.sbArray.splice(j, 1);
          }

          console.log('Shailendra//////////--', this.sbArray);
        } else {
          console.log("You Don't have packingDoc Document");
        }
      } else {
        console.log("You Don't have Commercial Document");
      }
    } else {
      console.log("You Don't have BLCopy Document");
    }
    // randomArray = []
    // for(value of this.pipoArray){
    //   for(value1 of ){
    //     if(value.pi_poNo == value1){
    //       randomArray.push(value)
    //     }
    //   }
    // }
    // console.log("ALL Data",)
  }

  hello() {
    // for (let value of this.sbArray) {
    //   this.onAddCourse(value)
    // }
    for (var i = 1; i < this.sbArray.length; i++) {
      //binary += String.fromCharCode(bytes[i]);
      this.onAddCourse(i);
    }
    console.log();
    console.log('ssjskskssk');
  }

  changeCheckbox2(value) {
    let j = this.tryArray.indexOf(value);
    if (j == -1) {
      this.tryArray.push(value);
    } else {
      this.tryArray.splice(j, 1);
    }

    console.log(this.tryArray);
  }

  changeCheckbox3(value) {
    let j = this.lcArray.indexOf(value);
    if (j == -1) {
      this.lcArray.push(value);
    } else {
      this.lcArray.splice(j, 1);
    }

    console.log(this.lcArray);
  }

  initCourse() {
    return this.formBuilder.group({
      value: new FormArray([this.initCourse1()], Validators.required),
    });
  }

  initCourse1() {
    return this.formBuilder.group({
      valueInternal: ['', Validators.required],
      sb: ['', Validators.required],
    });
  }

  getCourses(form) {
    return form.get('advance').controls;
  }

  getForexInfo(sbno: number) {
    return this.shippingMap.get(sbno);
  }

  onAddCourse(e) {
    // if (e.controls.bankDetails.invalid) {
    //   //this.submitted1 = true
    //   this.toastr.error('You can add another bank after filling first one!');
    //   console.log("2")
    //   //this.isDisabled = false;
    //   return;
    // }
    console.log('fffff');
    // this.currencyName.push('')
    // this.bankName.push('')
    const control = this.advanceForm.controls.advance as FormArray;
    control.push(this.initCourse());
    //this.isDisabled = false;
  }

  onAddCourse1(e) {
    // if (e.controls.bankDetails.invalid) {
    //   //this.submitted1 = true
    //   this.toastr.error('You can add another bank after filling first one!');
    //   console.log("2")
    //   //this.isDisabled = false;
    //   return;
    // }
    console.log('fffff');
    console.log(e);
    // this.currencyName.push('')
    // this.bankName.push('') .controls.contacts
    console.log(
      this.advanceForm.controls.advance['controls'][e].controls.value
    );
    // console.log(this.advanceForm.controls.advance[e].controls.value)
    // console.log(this.advanceForm.controls.advance[e])
    const control = this.advanceForm.controls.advance['controls'][e].controls
      .value as FormArray;
    control.push(this.initCourse1());
    //this.isDisabled = false;
  }

  removeAddress(i) {
    // console.log(i)
    // //console.log(this.control)
    let control1 = this.advanceForm.controls.advance as FormArray;
    // console.log(control1)
    // console.log(control1.length)
    // console.log(this.bankName)
    // console.log(this.currencyName)
    control1.removeAt(i);
    // this.bankName.splice(i, 1)
    // this.currencyName.splice(i, 1)
    // console.log(this.bankName)
    // console.log(this.currencyName)
    // console.log(control1.length)
  }

  onSubmit() {
    console.log('Testing *******************', this.advanceForm.value);
  }

  async generateDoc1() {
    //console.log(code, j)
    this.generate = true;
    this.isGenerate = true;

    let generateDoc2: any = [];
    let pipoValue;
    let value;
    let buyerValue;
    let newVal = {};
    for (let item of this.itemArray) {
      for (let sb of this.sbArray) {
        if (item.sbno === sb) {
          pipoValue = item;
          value = item.pipo;
          buyerValue = item.buyerName;
          this.dateArray.push(item.sbdate);
          this.sbDataArray.push(item);
          console.log('value', value);
          // console.log("Line no. 715", item)
          // newVal['sbno'] = item.sbno;
          // newVal['doc'] = item.doc
          // console.log("line no. 718", newVal)
          generateDoc2.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(item.doc)
          );
        }
      }
    }

    console.log(pipoValue, 'pipovalue*****************************');
    for (value of this.item) {
      for (let value1 of pipoValue.pipo) {
        if (value.pi_poNo == value1.pi_poNo) {
          this.randomArray.push(value);
        }
      }
    }
    console.log('random Array', this.randomArray);
    console.log('random Array', this.randomArray[0].creditNote);

    this.sb = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['sb']
    );

    this.creditNote = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['creditNote']
    );
    console.log('////*********************Credit Note', this.creditNote);

    this.debitNote = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['debitNote']
    );
    console.log('////*********************debit Note', this.debitNote);

    this.advanceOutward = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['advanceOutward']
    );
    console.log('////*********************advanceOutward', this.advanceOutward);

    this.ebrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['EBRC']
    );
    console.log('////*********************Ebrc', this.ebrc);

    this.blcopyref = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['blcopyref']
    );

    this.irAdvice = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['irAdvice']
    );

    this.agreement = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['agreement']
    );

    this.lcCopy = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['lcCopy']
    );
    console.log('****************Lc Copy', this.lcCopy);

    this.swiftCopy = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['swiftCopy']
    );

    this.tryPartyAgreement = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['tryPartyAgreement']
    );
    console.log('tryPartyAgreement', this.tryPartyAgreement);

    this.opinionReport = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['opinionReport']
    );

    this.airwayBlCopy = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['airwayBlcopy']
    );

    this.billOfExchange = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['billOfExchange']
    );

    this.commercial = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['commercial']
    );

    this.destruction = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['destruction']
    );

    this.insurance = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['insuranceCopy']
    );
    console.log('this.insurance', this.insurance);
    this.packingList = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.randomArray[0]['packingList']
    );

    console.log('Random Array', this.randomArray);
    console.log(
      'Airway Docs****************--------------------------------',
      this.airwayBlCopy
    );

    console.log('ALL Data');

    let mainArr = [];

    let invoicearray = [];
    // this.Question5 = 'no';
    console.log('line no.796 question5 data', this.Question5);
    this.sbDataArray.forEach((value, index) => {
      for (let a of value.pipo) {
        this.arrayPipo.push(a);
      }
    });
    if (this.Question6 == 'yes') {
      let adArr = [];
      console.log('Shipping Map For', this.shippingMap);
      this.shippingMap.forEach((value) => {
        console.log('Shipping Map For loop', value);
        adArr = adArr.concat(value);
      });

      // let adArr = [];
      // for (let x of this.advanceForm.value.advance) {
      //   for (let z of x.value) {
      //     adArr.push(z);
      //   }
      // }
      console.log('advArr', adArr);

      console.log('sbDataArray', this.sbDataArray);

      forkJoin(
        this.sbDataArray.map((value) => {
          let piponumbers = [];
          for (let i in value.pipo) {
            piponumbers.push(value.pipo[i].pi_poNo);
          }
          return this.userService.getManyPipo(piponumbers);
        })
      ).subscribe((resp: any[]) => {
        console.log('Fork join resp', resp);
        resp.forEach((data, i) => {
          for (let item of data['data']) {
            console.log(item);
            const newVal = { ...this.sbDataArray[i] };
            newVal['pipoValue'] = item;
            mainArr.push(newVal);
            console.log('fggfgfgf', mainArr);
          }
        });

        // Invoice Reductionn logic
        console.log('sjjssjjsjsjsjsjsjsjsjsjsjssjsjjsjsjsjsjsjs');

        console.log(this.advanceForm.value);

        mainArr.forEach((value1, index) => {
          console.log('shshsh');
          console.log(this.advanceForm.value.advance);
          for (let a of adArr) {
            if (a.sb == value1.sbno) {
              const newVal = { ...value1 };
              newVal['advance'] = a.valueInternal;
              newVal['irAdviceId'] = a.irDataItem._id;
              invoicearray.push(newVal);
            }
          }
          console.log('aajsjss');
        });
        let amountArr = [];
        for (let item of invoicearray) {
          amountArr.push(item.pipoValue.amount);
        }
        console.log(amountArr);
        this.amArr = amountArr;
        console.log(
          '111111111111111111111111111111111111111111111111111111111111111'
        );
        console.log('t', invoicearray);
        this.invoiceArr = invoicearray;

        console.log('hello line 884', this.invoiceArr);

        // this.Question5 = 'yes';
        console.log('line no.866 question5 data', this.Question5);

        // Logic Ends
      });

      // this.sbDataArray.forEach((value, index) => {
      //   this.userService.getManyPipo(value.pipo).subscribe(
      //     (data) => {
      //       console.log('king123');
      //       console.log(data);
      //       for (let item of data['data']) {
      //         console.log(item);
      //         const newVal = { ...value };
      //         newVal['pipoValue'] = item;
      //         mainArr.push(newVal);
      //         console.log('fggfgfgf', mainArr);
      //       }

      //       //this.getBeneDetaile()
      //       //this.router.navigate(['/login'], { queryParams: { registered: true }});
      //     },
      //     (error) => {
      //       console.log('error');
      //     }
      //   );
      // });
      // setTimeout(() => {
      //   console.log('sjjssjjsjsjsjsjsjsjsjsjsjssjsjjsjsjsjsjsjs');
      //   console.log("mainArr");
      //   console.log(this.advanceForm.value);

      //   mainArr.forEach((value1, index) => {
      //     console.log('shshsh');
      //     console.log(this.advanceForm.value.advance);
      //     for (let a of adArr) {
      //       if (a.sb == value1.sbno) {
      //         const newVal = {...value1};
      //         newVal['advance'] = a.valueInternal;
      //         invoicearray.push(newVal);
      //       }
      //     }
      //     console.log('aajsjss');
      //   });
      //   let amountArr = [];
      //   for (let item of invoicearray) {
      //     amountArr.push(item.pipoValue.amount);
      //   }
      //   console.log(amountArr);
      //   this.amArr = amountArr;
      //   console.log(
      //     '111111111111111111111111111111111111111111111111111111111111111'
      //   );
      //   console.log('t', invoicearray);
      //   this.invoiceArr = invoicearray;

      //   this.Question5 = 'yes';
      // }, 8000);
    }

    console.log('Rajuuuuu', pipoValue);
    //this.arrayPipo = value
    this.mainDoc1 = generateDoc2;
    console.log(this.mainDoc1);
    console.log('950', generateDoc2);
    let generateDoc3: any = [];
    if (this.Question2 == 'yes') {
      for (let item of this.item4) {
        for (let sb of this.tryArray) {
          if (item.triPartyAgreementNumber === sb) {
            generateDoc3.push(
              this.sanitizer.bypassSecurityTrustResourceUrl(item.doc)
            );
          }
        }
      }
    }

    let generateDoc4: any = [];
    if (this.Question7 == 'yes') {
      for (let item of this.item8) {
        for (let sb of this.lcArray) {
          if (item.letterOfCreditNumber === sb) {
            generateDoc4.push(
              this.sanitizer.bypassSecurityTrustResourceUrl(item.doc)
            );
          }
        }
      }
    }
    console.log(buyerValue);
    const data: any = await this.userService.getBuyerByName(buyerValue);
    console.log('shshhss', data.data);
    this.buyerAds = data.data.buyerAdrs;

    this.completewords4 = this.buyerAds.split(' ');
    this.devideContent4 = this.completewords4.length;

    for (let i = 0; i < this.completewords4.length; i++) {
      if (i < 6) {
        this.buyerAdd2.push(this.completewords4[i]);
      } else if (i > 5 && i <= 11) {
        this.buyerAdd3.push(this.completewords4[i]);
      } else if (i > 11) {
        this.buyerAdd4.push(this.completewords4[i]);
      }
    }

    this.buyerAds1 = this.buyerAdd2.join(' ');
    this.buyerAds2 = this.buyerAdd3.join(' ');
    this.buyerAds3 = this.buyerAdd4.join(' ');

    console.log('Shailendra Buyer Address*************', this.buyerAds1);
    console.log('Shailendra Buyer Address*************', this.buyerAds2);

    console.log('89999999999999999999999999999', this.buyerAds);
    this.mainDoc3 = generateDoc3;
    this.mainDoc4 = generateDoc4;
    this.newTask[0] = {
      sbNumbers: this.sbArray,
      sbUrls: this.mainDoc1,
      triPartyAgreementNumber: this.tryArray,
      tryUrls: this.mainDoc3,
      purposeCode: '',
      isLc: this.lc,
      letterOfCreditNumber: this.lcArray,
      lcUrls: this.mainDoc4,
      withScrutiny: this.scrutiny,
      withDiscount: this.withDiscount,
      bankRef: '',
      advanceRef: this.advanceRef,
      ir: this.Question5,
    };

    //let date = ['31-JAN-21', '29-AUG-21', '01-FEB-20'];
    // const myArray = date[0].split('-');
    // console.log(myArray);
    // let str = '';
    for (let value of this.dateArray) {
      this.getProper(value);
    }
    this.myArr.sort(function (a, b) {
      a = a.split('-').reverse().join('');
      b = b.split('-').reverse().join('');
      return a > b ? 1 : a < b ? -1 : 0;

      // return a.localeCompare(b);         // <-- alternative
    });
    console.log('Datesss', this.myArr);
    console.log(this.myArr[0]);
    console.log(this.myArr[this.myArr.length - 1]);

    console.log(this.generate1);
    console.log(this.c);
    this.fillForm(pipoValue);
    this.newTask[0] = {
      sbNumbers: this.sbArray,
      sbUrls: this.mainDoc1,
      triPartyAgreementNumber: this.tryArray,
      tryUrls: this.mainDoc3,
      purposeCode: '',
      isLc: this.lc,
      letterOfCreditNumber: this.lcArray,
      lcUrls: this.mainDoc4,
      withScrutiny: this.scrutiny,
      withDiscount: this.withDiscount,
      bankRef: '',
      advanceRef: this.advanceRef,
      ir: this.Question5,
    };
  }

  getProper(a) {
    const myArray = a.split('-');
    myArray.forEach((value, index) => {
      if (index == 0) {
        this.str = value + '.';
      } else if (index == 1) {
        if (value.toUpperCase() == 'JAN') {
          this.str = this.str + '01.';
        } else if (value.toUpperCase() == 'FEB') {
          this.str = this.str + '02.';
        } else if (value.toUpperCase() == 'MAR') {
          this.str = this.str + '03.';
        } else if (value.toUpperCase() == 'APR') {
          this.str = this.str + '04.';
        } else if (value.toUpperCase() == 'MAY') {
          this.str = this.str + '05.';
        } else if (value.toUpperCase() == 'JUN') {
          this.str = this.str + '06.';
        } else if (value.toUpperCase() == 'JUL') {
          this.str = this.str + '07.';
        } else if (value.toUpperCase() == 'AUG') {
          this.str = this.str + '08.';
        } else if (value.toUpperCase() == 'SEP') {
          this.str = this.str + '09.';
        } else if (value.toUpperCase() == 'OCT') {
          this.str = this.str + '10.';
        } else if (value.toUpperCase() == 'NOV') {
          this.str = this.str + '11.';
        } else if (value.toUpperCase() == 'DEC') {
          this.str = this.str + '12.';
        }
      } else if (index == 2) {
        this.str = this.str + '20' + value;
      }
    });
    this.myArr.push(this.str);
    this.str = '';
    console.log(this.str);
  }

  searchData(a, i) {
    console.log(i);
    console.log(a);
    var reg = /^\d+$/;
    let x = reg.test(a);
    console.log(x);
    if (x) {
      this.amArr[i] = this.amArr[i] - a;
      this.invoiceArr[i].pipoValue['damage'] = a;

      this.invoiceArr[i].pipoValue['realized'] = this.amArr[i];
    }
    console.log('this is invice array', this.invoiceArr);

    console.log(a);
    console.log(this.amArr);
  }

  toEdit(index) {
    console.log(
      'this is damage value',
      this.invoiceArr[index].pipoValue['damage']
    );
    this.optionsVisibility[index] = true;
    this.toastr.warning('table Is In Edit Mode');
  }

  toSave(index) {
    this.optionsVisibility[index] = false;
    this.toastr.success('table updated successfully.');
  }

  updaterisevalue(i) {
    this.invoiceArr[i].pipoValue.realized =
      this.invoiceArr[i].pipoValue.amount - this.invoiceArr[i].pipoValue.damage;
    console.log('this is rised', this.invoiceArr[i].pipoValue.realized);
  }

  async fillForm(a) {
    console.log('Shailendra *************', a.buyerName);

    this.buyer1 = a.buyerName;
    this.completewords3 = this.buyer1.split(' ');
    this.devideContent3 = this.completewords3.length;

    for (let i = 0; i < this.completewords3.length; i++) {
      if (i < 6) {
        this.buyer2.push(this.completewords3[i]);
      } else if (i > 5 && i <= 11) {
        this.buyer3.push(this.completewords3[i]);
      }
    }

    this.buyName1 = this.buyer2.join(' ');
    this.buyName2 = this.buyer3.join(' ');

    console.log('Shailendra *************', this.buyName1);
    console.log('Shailendra *************', this.buyName2);

    const formUrl = './../../assets/billUnder.pdf';

    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);

    const form = pdfDoc.getForm();
    const pages = pdfDoc.getPages();
    const firstpage = pages[0];

    const text1 = form.createTextField('favorite0');
    text1.setText('');
    text1.addToPage(firstpage, {
      x: 156,
      y: 752,
      width: 250,
      height: 12,
      borderWidth: 0,
      //backgroundColor: rgb(255, 255, 255)
    });

    const text2 = form.createTextField('favorite1');
    text2.setText('');
    text2.addToPage(firstpage, {
      x: 482,
      y: 752,
      width: 20,
      height: 13,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const textf3 = form.createTextField('favorite2');
    textf3.setText('');
    textf3.addToPage(firstpage, {
      x: 510,
      y: 752,
      width: 20,
      height: 13,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text4 = form.createTextField('favorite3');
    text4.setText('');
    text4.addToPage(firstpage, {
      x: 539,
      y: 752,
      width: 15,
      height: 13,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text5 = form.createTextField('favorite4');
    text5.setText('');
    text5.addToPage(firstpage, {
      x: 570,
      y: 752,
      width: 12,
      height: 13,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //exporter

    const text6 = form.createTextField('favorite5');
    text6.setText(this.team1);
    text6.addToPage(firstpage, {
      x: 18,
      y: 684,
      width: 295,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text7 = form.createTextField('favorite6');
    // if(this.team2.length > 0){
    text7.setText(this.team2);
    text7.addToPage(firstpage, {
      x: 18,
      y: 665,
      width: 295,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });
    // }
    // else{
    //   text7.setText(this.item5.adress)
    //   text7.addToPage(firstpage, {

    //     x: 18,
    //     y: 665,
    //     width: 295,
    //     height: 14,
    //     borderWidth: 0,
    //     // backgroundColor: rgb(255, 255, 255)
    //   })
    // }

    const text8 = form.createTextField('favorite7');
    // if(this.team2.length > 0 && this.team3.length == 0){
    text8.setText(this.address1);
    text8.addToPage(firstpage, {
      x: 18,
      y: 646,
      width: 295,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });
    // }
    // else{
    //   text8.setText(this.team3)
    //   text8.addToPage(firstpage, {
    //     x: 18,
    //     y: 646,
    //     width: 295,
    //     height: 14,
    //     borderWidth: 0,
    //     // backgroundColor: rgb(255, 255, 255)

    //   })
    // }

    const text9 = form.createTextField('favorite8');
    //  if(this.team2.length > 0 && this.team3.length > 0){
    text9.setText(this.address2);
    text9.addToPage(firstpage, {
      x: 18,
      y: 628,
      width: 295,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });
    // }

    const text10 = form.createTextField('favorite9');
    text10.setText(this.address3);
    text10.addToPage(firstpage, {
      x: 18,
      y: 612,
      width: 295,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text11 = form.createTextField('favorite10');
    text11.setText('');
    text11.addToPage(firstpage, {
      x: 18,
      y: 594,
      width: 295,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //buyer

    const text12 = form.createTextField('favorite11');
    text12.setText(this.buyName1);
    text12.addToPage(firstpage, {
      x: 320,
      y: 684,
      width: 255,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text13 = form.createTextField('favorite12');
    text13.setText(this.buyName2);
    text13.addToPage(firstpage, {
      x: 320,
      y: 665,
      width: 255,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text14 = form.createTextField('favorite13');
    text14.setText(this.buyerAds1);
    text14.addToPage(firstpage, {
      x: 320,
      y: 646,
      width: 255,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text15 = form.createTextField('favorite14');
    text15.setText(this.buyerAds2);
    text15.addToPage(firstpage, {
      x: 320,
      y: 628,
      width: 255,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text16 = form.createTextField('favorite15');
    text16.setText(this.buyerAds3);
    text16.addToPage(firstpage, {
      x: 320,
      y: 612,
      width: 255,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text17 = form.createTextField('favorite16');
    text17.setText('');
    text17.addToPage(firstpage, {
      x: 320,
      y: 594,
      width: 255,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //checkbox

    const checkbox1 = form.createCheckBox('check1');
    checkbox1.addToPage(firstpage, {
      x: 150,
      y: 575,
      width: 8,
      height: 8,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const checkbox2 = form.createCheckBox('check2');
    checkbox2.addToPage(firstpage, {
      x: 369,
      y: 575,
      width: 8,
      height: 8,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const checkbox3 = form.createCheckBox('check3');
    checkbox3.addToPage(firstpage, {
      x: 570,
      y: 575,
      width: 8,
      height: 8,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //draw bank details

    const text18 = form.createTextField('favorite17');
    text18.setText('');
    text18.addToPage(firstpage, {
      x: 219,
      y: 553,
      width: 360,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text19 = form.createTextField('favorite18');
    text19.setText('');
    text19.addToPage(firstpage, {
      x: 219,
      y: 538,
      width: 360,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text20 = form.createTextField('favorite19');
    text20.setText('');
    text20.addToPage(firstpage, {
      x: 219,
      y: 521,
      width: 360,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text21 = form.createTextField('favorite20');
    text21.setText('');
    text21.addToPage(firstpage, {
      x: 219,
      y: 506,
      width: 360,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text22 = form.createTextField('favorite21');
    text22.setText('');
    text22.addToPage(firstpage, {
      x: 219,
      y: 491,
      width: 360,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text23 = form.createTextField('favorite22');
    text23.setText('');
    text23.addToPage(firstpage, {
      x: 219,
      y: 478,
      width: 360,
      height: 10,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //checkbox

    const checkbox4 = form.createCheckBox('check4');
    checkbox4.addToPage(firstpage, {
      x: 245,
      y: 456,
      width: 5,
      height: 5,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const checkbox5 = form.createCheckBox('check5');
    checkbox5.addToPage(firstpage, {
      x: 453,
      y: 463,
      width: 5,
      height: 5,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //text

    const text24 = form.createTextField('favorite23');
    text24.setText('');
    text24.addToPage(firstpage, {
      x: 219,
      y: 412,
      width: 360,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text25 = form.createTextField('favorite24');
    text25.setText('');
    text25.addToPage(firstpage, {
      x: 219,
      y: 390,
      width: 360,
      height: 16,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //checkbox

    const checkbox6 = form.createCheckBox('check6');
    checkbox6.addToPage(firstpage, {
      x: 389,
      y: 375,
      width: 8,
      height: 8,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const checkbox7 = form.createCheckBox('check7');
    checkbox7.addToPage(firstpage, {
      x: 550,
      y: 375,
      width: 8,
      height: 8,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    // firx

    const text26 = form.createTextField('favorite25');
    text26.setText('');
    text26.addToPage(firstpage, {
      x: 128,
      y: 348,
      width: 187,
      height: 20,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text27 = form.createTextField('favorite26');
    text27.setText('');
    text27.addToPage(firstpage, {
      x: 128,
      y: 324,
      width: 187,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text28 = form.createTextField('favorite27');
    text28.setText('');
    text28.addToPage(firstpage, {
      x: 421,
      y: 348,
      width: 160,
      height: 20,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text29 = form.createTextField('favorite28');
    text29.setText('');
    text29.addToPage(firstpage, {
      x: 421,
      y: 324,
      width: 160,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //bill details

    const text30 = form.createTextField('favorite29');
    text30.setText('');
    text30.addToPage(firstpage, {
      x: 128,
      y: 287,
      width: 140,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text31 = form.createTextField('favorite30');
    text31.setText('');
    text31.addToPage(firstpage, {
      x: 128,
      y: 266,
      width: 140,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text32 = form.createTextField('favorite31');
    text32.setText('');
    text32.addToPage(firstpage, {
      x: 388,
      y: 287,
      width: 188,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text33 = form.createTextField('favorite32');
    text33.setText('');
    text33.addToPage(firstpage, {
      x: 388,
      y: 266,
      width: 188,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //checkbox

    const checkbox8 = form.createCheckBox('check8');
    checkbox8.addToPage(firstpage, {
      x: 141,
      y: 251,
      width: 5,
      height: 5,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const checkbox9 = form.createCheckBox('check9');
    checkbox9.addToPage(firstpage, {
      x: 288,
      y: 251,
      width: 5,
      height: 5,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text01 = form.createTextField('favorite01');
    text01.setText('');
    text01.addToPage(firstpage, {
      x: 393,
      y: 253,
      width: 30,
      height: 10,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text02 = form.createTextField('favorite02');
    text02.setText('');
    text02.addToPage(firstpage, {
      x: 453,
      y: 242,
      width: 60,
      height: 10,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    // description of goods

    const text34 = form.createTextField('favorite33');
    text34.setText('');
    text34.addToPage(firstpage, {
      x: 128,
      y: 211,
      width: 250,
      height: 20,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text35 = form.createTextField('favorite34');
    text35.setText('');
    text35.addToPage(firstpage, {
      x: 128,
      y: 190,
      width: 140,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text36 = form.createTextField('favorite35');
    text36.setText('');
    text36.addToPage(firstpage, {
      x: 448,
      y: 211,
      width: 132,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text37 = form.createTextField('favorite36');
    text37.setText('');
    text37.addToPage(firstpage, {
      x: 388,
      y: 190,
      width: 188,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text38 = form.createTextField('favorite37');
    text38.setText('');
    text38.addToPage(firstpage, {
      x: 275,
      y: 170,
      width: 300,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text39 = form.createTextField('favorite38');
    text39.setText('');
    text39.addToPage(firstpage, {
      x: 275,
      y: 146,
      width: 300,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text40 = form.createTextField('favorite39');
    text40.setText('');
    text40.addToPage(firstpage, {
      x: 128,
      y: 126,
      width: 140,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text41 = form.createTextField('favorite40');
    text41.setText(
      `${this.myArr[0]}  to  ${this.myArr[this.myArr.length - 1]}`
    );
    // console.log(this.myArr[0])
    // console.log(this.myArr[this.myArr.length - 1])
    text41.addToPage(firstpage, {
      x: 388,
      y: 126,
      width: 188,
      height: 18,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    // const texta41 = form.createTextField('favorite404')
    // texta41.setText(`${this.myArr.length}`)
    // // console.log(this.myArr[0])
    // // console.log(this.myArr[this.myArr.length - 1])
    // texta41.addToPage(firstpage, {
    //   x: 266,
    //   y: 106,
    //   width: 188,
    //   height: 18,
    //   borderWidth: 0,
    //   // backgroundColor: rgb(255, 255, 255)
    // })

    //table1
    const text421 = form.createTextField('favorite411');
    text421.setText(`${this.myArr.length}`);
    text421.addToPage(firstpage, {
      x: 228,
      y: 108,
      width: 10,
      height: 16,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text42 = form.createTextField('favorite41');
    text42.setText('');
    text42.addToPage(firstpage, {
      x: 97,
      y: 62,
      width: 45,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text43 = form.createTextField('favorite42');
    text43.setText('');
    text43.addToPage(firstpage, {
      x: 148,
      y: 62,
      width: 50,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text44 = form.createTextField('favorite43');
    text44.setText('');
    text44.addToPage(firstpage, {
      x: 206,
      y: 62,
      width: 65,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text45 = form.createTextField('favorite44');
    text45.setText('');
    text45.addToPage(firstpage, {
      x: 276,
      y: 62,
      width: 41,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text46 = form.createTextField('favorite45');
    text46.setText('');
    text46.addToPage(firstpage, {
      x: 320,
      y: 62,
      width: 45,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text47 = form.createTextField('favorite46');
    text47.setText('');
    text47.addToPage(firstpage, {
      x: 370,
      y: 62,
      width: 33,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text48 = form.createTextField('favorite47');
    text48.setText('');
    text48.addToPage(firstpage, {
      x: 408,
      y: 62,
      width: 80,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text49 = form.createTextField('favorite48');
    text49.setText('');
    text49.addToPage(firstpage, {
      x: 492,
      y: 62,
      width: 50,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text50 = form.createTextField('favorite49');
    text50.setText('');
    text50.addToPage(firstpage, {
      x: 547,
      y: 62,
      width: 33,
      height: 14,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text51 = form.createTextField('favorite50');
    text51.setText('');
    text51.addToPage(firstpage, {
      x: 97,
      y: 51,
      width: 45,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text52 = form.createTextField('favorite51');
    text52.setText('');
    text52.addToPage(firstpage, {
      x: 148,
      y: 51,
      width: 50,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text53 = form.createTextField('favorite52');
    text53.setText('');
    text53.addToPage(firstpage, {
      x: 206,
      y: 51,
      width: 65,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text54 = form.createTextField('favorite53');
    text54.setText('');
    text54.addToPage(firstpage, {
      x: 276,
      y: 51,
      width: 41,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text55 = form.createTextField('favorite54');
    text55.setText('');
    text55.addToPage(firstpage, {
      x: 320,
      y: 51,
      width: 45,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text56 = form.createTextField('favorite55');
    text56.setText('');
    text56.addToPage(firstpage, {
      x: 370,
      y: 51,
      width: 33,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text57 = form.createTextField('favorite56');
    text57.setText('');
    text57.addToPage(firstpage, {
      x: 408,
      y: 51,
      width: 80,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text58 = form.createTextField('favorite57');
    text58.setText('');
    text58.addToPage(firstpage, {
      x: 492,
      y: 51,
      width: 50,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text59 = form.createTextField('favorite58');
    text59.setText('');
    text59.addToPage(firstpage, {
      x: 547,
      y: 51,
      width: 33,
      height: 9,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    //table2

    const text60 = form.createTextField('favorite59');
    text60.setText(this.charge[0]);
    text60.addToPage(firstpage, {
      x: 135,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text61 = form.createTextField('favorite60');
    text61.setText(this.charge[1]);
    text61.addToPage(firstpage, {
      x: 167,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text62 = form.createTextField('favorite61');
    text62.setText(this.charge[2]);
    text62.addToPage(firstpage, {
      x: 201,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text63 = form.createTextField('favorite62');
    text63.setText(this.charge[3]);
    text63.addToPage(firstpage, {
      x: 235,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text64 = form.createTextField('favorite63');
    text64.setText(this.charge[4]);
    text64.addToPage(firstpage, {
      x: 266,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text65 = form.createTextField('favorite64');
    text65.setText(this.charge[5]);
    text65.addToPage(firstpage, {
      x: 300,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text66 = form.createTextField('favorite65');
    text66.setText(this.charge[6]);
    text66.addToPage(firstpage, {
      x: 331,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text67 = form.createTextField('favorite66');
    text67.setText(this.charge[7]);
    text67.addToPage(firstpage, {
      x: 363,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text68 = form.createTextField('favorite67');
    text68.setText(this.charge[8]);
    text68.addToPage(firstpage, {
      x: 397,
      y: 10,
      width: 34,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text69 = form.createTextField('favorite68');
    text69.setText(this.charge[9]);
    text69.addToPage(firstpage, {
      x: 434,
      y: 10,
      width: 30,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text70 = form.createTextField('favorite69');
    text70.setText(this.charge[10]);
    text70.addToPage(firstpage, {
      x: 469,
      y: 10,
      width: 27,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text71 = form.createTextField('favorite70');
    text71.setText(this.charge[11]);
    text71.addToPage(firstpage, {
      x: 501,
      y: 10,
      width: 28,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text72 = form.createTextField('favorite71');
    text72.setText(this.charge[12]);
    text72.addToPage(firstpage, {
      x: 534,
      y: 10,
      width: 28,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const text73 = form.createTextField('favorite72');
    text73.setText(this.charge[13]);
    text73.addToPage(firstpage, {
      x: 565,
      y: 10,
      width: 15,
      height: 25,
      borderWidth: 0,
      // backgroundColor: rgb(255, 255, 255)
    });

    const pdfBytes = await pdfDoc.save();
    console.log(pdfBytes, 'pdf');
    console.log(pdfBytes, 'pdf');
    var base64String = this._arrayBufferToBase64(pdfBytes);

    console.log(base64String);
    const x = 'data:application/pdf;base64,' + base64String;
    const base64 = base64String;
    // console.log("pdfName", x)
    const pdfName = 'billLodgement.pdf';
    // console.log("pdfName", pdfName)
    const pdfBlob = this.dataURItoBlob(base64);
    console.log('pdfName', pdfBlob);
    const pdfFile = new File([pdfBlob], pdfName, { type: 'application/pdf' });
    console.log('my pdf file', pdfFile);

    this.uploadFile(pdfFile);

    console.log(x);
    this.formerge = x;
    this.value = this.sanitizer.bypassSecurityTrustResourceUrl(x);
    // this.newTask[0].generateDoc1 = pdfFile;
    // console.log("Task of the day", this.newTask[0])
    // const link: any = document.createElement("a");
    // link.id = "dwnldLnk";
    // link.style = "display:none;";
    // document.body.appendChild(link);
    // const dlnk: any = document.getElementById("dwnldLnk");
    // dlnk.href = x;
    // dlnk.download = 'file.pdf';
    // dlnk.click();
  }
  // : Observable<any>
  uploadFile(file) {
    console.log('my file in upload', file);

    const formData = new FormData();

    formData.append('file', file);

    console.log('formData', formData);

    this.documentService.uploadImage(formData).subscribe((data) => {
      console.log('my data', data);
      this.billLodgePdf = data;
      // this.value = this.sanitizer.bypassSecurityTrustResourceUrl(this.billLodgePdf.data);
      console.log('bill lodge', this.billLodgePdf.data);
      // this.formerge = this.billLodgePdf.data;
      this.newTask[0].generateDoc1 = this.billLodgePdf.data;
      console.log('Task of the day', this.newTask[0].generateDoc1);
      console.log('Task of the day', this.newTask[0]);
    });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    return blob;
  }

  _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  onBack() {
    this.isGenerate = false;
    this.sbArray = [];
    this.tryArray = [];
    this.lcArray = [];
  }

  doneDox(genDoc) {
    this.doneToDox();
    console.log('genDoc', genDoc);
    console.log(this.newTask);
    console.log(this.invoiceArr);
    if (this.documentService.draft) {
      this.documentService
        .updateExportTask(
          {
            task: this.newTask,
            completed: 'yes',
            fileType: 'BL',
          },
          this.documentService.task._id
        )
        .subscribe(
          (data) => {
            console.log('king123');
            console.log(data);
            this.documentService.draft = false;
            this.documentService.task.id = '';
            this.isDoneAll = true;
            this.userService
              .updateManyPipo(this.arrayPipo[0].pi_poNo, 'billUnder', genDoc)
              .subscribe(
                (data) => {
                  console.log('king123');
                  console.log(data);
                  if (this.Question5 == 'yes') {
                    this.userService
                      .updateManyPipo(
                        this.arrayPipo,
                        'invoiceReduction',
                        this.invoiceArr
                      )
                      .subscribe(
                        (data1) => {
                          console.log('king123');
                          console.log(data1);
                          this.toastr.success(
                            'Task saved as completed successfully!'
                          );
                          if (this.redirectid) {
                            // this.router.navigate([
                            //   'home/pipo-export',
                            //   {
                            //     id: this.redirectid,
                            //     page: this.redirectpage,
                            //     index: this.redirectindex,
                            //   },
                            // ]);
                          } else {
                            window.location.reload();
                          }
                          //this.router.navigate(["/home/advance-outward-remittance"]);
                        },
                        (error) => {
                          // this.toastr.error('Invalid inputs, please check!');
                          console.log('error');
                        }
                      );
                  } else {
                    this.toastr.success(
                      'Task saved as completed successfully!'
                    );
                    // this.router.navigate(["/home/dashboardTask"]);
                  }
                },
                (error) => {
                  console.log('error');
                }
              );
          },
          (error) => {
            console.log('error');
          }
        );
    } else {
      this.documentService
        .addExportTask({
          task: this.newTask,
          completed: 'yes',
          fileType: 'BL',
        })
        .subscribe(
          (res) => {
            this.isDoneAll = true;
            //this.toastr.success('Task saved successfully!');
            console.log('Transaction Saved');
            this.userService
              .updateManyPipo(this.arrayPipo[0].pi_poNo, 'billUnder', genDoc)
              .subscribe(
                (data) => {
                  console.log('king123');
                  console.log(data);
                  if (this.Question5 == 'yes') {
                    this.userService
                      .updateManyPipo(
                        this.arrayPipo,
                        'invoiceReduction',
                        this.invoiceArr
                      )
                      .subscribe(
                        (data1) => {
                          console.log('king123');
                          console.log(data1);
                          this.toastr.success(
                            'Task saved as completed successfully!'
                          );
                          if (this.redirectid) {
                            // this.router.navigate([
                            //   'home/pipo-export',
                            //   {
                            //     id: this.redirectid,
                            //     page: this.redirectpage,
                            //     index: this.redirectindex,
                            //   },
                            // ]);
                          } else {
                            // window.location.reload();
                          }
                          //this.router.navigate(["/home/advance-outward-remittance"]);
                        },
                        (error) => {
                          // this.toastr.error('Invalid inputs, please check!');
                          console.log('error');
                        }
                      );
                  } else {
                    this.toastr.success(
                      'Task saved as completed successfully!'
                    );
                    // this.router.navigate(["/home/dashboardTask"]);
                  }
                  //this.router.navigate(["/home/advance-outward-remittance"]);
                },
                (error) => {
                  // this.toastr.error('Invalid inputs, please check!');
                  console.log('error');
                }
              );
            //this.router.navigate(["/home/dashboardTask"]);
          },
          (err) => {
            this.toastr.error('Error!');
            console.log('Error saving the transaction');
          }
        );
    }
  }

  exportAsPDF1() {
    if (this.Question7 == 'yes') {
      this.lc = 'lc';
    } else if (this.Question7 == 'no') {
      this.lc = 'nonLc';
    }

    this.scrutiny = this.Question8;
    this.withDiscount = this.Question9;

    const height =
      Math.round($('#mainId').outerHeight() * 0.0104166667 * 10) / 10;
    console.log($('#mainId').html());
    this.documentService
      .getPDF({
        data: $('#mainId').html(),
        filename: 'Final Report',
        format: {
          paperWidth: 7,
          paperHeight: height + 5,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        template:
          './app/modules/pdfGenerationModule/pdfTemplate/finalreport.ejs',
      })
      .subscribe((data) => {
        if (data && data.success) {
          console.log(data);
          this.data4 = data;
          this.data5 = data.file.replace(
            'application/octet-stream',
            'application/pdf'
          );
          console.log(this.data5);
          this.data6 = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.data5
          );
          console.log(this.data6);
          this.data8 = this.data6;
          //this.newTask.url1 = this.data5;
          this.done = true;
          const height =
            Math.round($('#mainId').outerHeight() * 0.0104166667 * 10) / 10;
          console.log($('#mainId').html());
          this.documentService
            .getPDF({
              data: $('#mainId2').html(),
              filename: 'Final Report',
              format: {
                paperWidth: 7,
                paperHeight: 15,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
              },
              template:
                './app/modules/pdfGenerationModule/pdfTemplate/finalreport.ejs',
            })
            .subscribe((data) => {
              if (data && data.success) {
                console.log(data);
                this.data4 = data;
                this.data5 = data.file.replace(
                  'application/octet-stream',
                  'application/pdf'
                );
                console.log(this.data5);
                this.data6 = this.sanitizer.bypassSecurityTrustResourceUrl(
                  this.data5
                );
                this.billOfCredit = this.data6;

                if (this.Question5 == 'yes') {
                  const height1 =
                    Math.round(
                      $('#mainId1').outerHeight() * 0.0104166667 * 10
                    ) / 10;
                  console.log($('#mainId1').html());
                  this.documentService
                    .getPDF({
                      data: $('#mainId1').html(),
                      filename: 'Final Report',
                      format: {
                        paperWidth: 7,
                        paperHeight: height1 + 5,
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                      },
                      template:
                        './app/modules/pdfGenerationModule/pdfTemplate/finalreport.ejs',
                    })
                    .subscribe((data) => {
                      if (data && data.success) {
                        console.log(data);
                        this.data4 = data;
                        this.data5 = data.file.replace(
                          'application/octet-stream',
                          'application/pdf'
                        );
                        console.log(this.data5);
                        this.data6 =
                          this.sanitizer.bypassSecurityTrustResourceUrl(
                            this.data5
                          );

                        console.log(this.data6);
                        this.dataImport = this.data6;
                        this.dataImport2 = this.data6;
                        //this.newTask.url1 = this.data5;
                        this.done = true;
                        this.newTask[0] = {
                          sbNumbers: this.sbArray,
                          sbUrls: this.mainDoc1,
                          triPartyAgreementNumber: this.tryArray,
                          tryUrls: this.mainDoc3,
                          purposeCode: '',
                          isLc: this.lc,
                          letterOfCreditNumber: this.lcArray,
                          lcUrls: this.mainDoc4,
                          withScrutiny: this.scrutiny,
                          withDiscount: this.withDiscount,
                          bankRef: '',
                          advanceRef: this.advanceRef,
                          generateDoc1: this.data8,
                          generateDoc2: this.billOfCredit,
                          generateDoc3: this.dataImport,
                          generateDoc4: this.dataImport2,
                          ir: this.Question5,
                        };
                        //this.downloadPDF(data);
                      }
                    });

                  this.isProceed = true;
                } else {
                  this.isProceed = true;
                  this.newTask[0] = {
                    sbNumbers: this.sbArray,
                    sbUrls: this.mainDoc1,
                    triPartyAgreementNumber: this.tryArray,
                    tryUrls: this.mainDoc3,
                    purposeCode: '',
                    isLc: this.lc,
                    letterOfCreditNumber: this.lcArray,
                    lcUrls: this.mainDoc4,
                    withScrutiny: this.scrutiny,
                    withDiscount: this.withDiscount,
                    advanceRef: this.advanceRef,
                    generateDoc1: this.data8,
                    generateDoc2: this.billOfCredit,
                    bankRef: '',
                    ir: this.Question5,
                  };
                }
              }
            });

          //this.zToggle[i] = true;

          // let allTrue = true;
          // for (let value of this.zToggle) {
          //   allTrue = allTrue && value;
          // }
          // if (allTrue) {
          //   this.isDone = true;
          // }

          //this.downloadPDF(data);
        }
      });
  }

  change(e) {
    console.log(e.target.value);
    this.advanceRef = e.target.value;
  }

  change1(e) {
    console.log(e.target.value);
    this.LcNumber = e.target.value;
  }

  edit() {}

  // showDialog(): any {
  //   console.log('hhhhhh')
  //   this.confirmDialogService.confirmThis('Are you sure to delete ?', () => {
  //     alert('Yes clicked');
  //   }, () => {
  //     alert('No clicked');
  //   });
  // }

  downloadPDF() {
    console.log(JSON.stringify(this.creditNote));
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    let data = {
      headers: headers,
      url: this.creditNote['changingThisBreaksApplicationSecurity'],
    };

    this.documentService.downloadDocuments(data).subscribe((d) => {
      console.log('sub', d);
      importedSaveAs(new Blob([d], { type: 'application/pdf' }), 'CreditNote');
    });

    // console.log(this.mainDoc1.changingThisBreaksApplicationSecurity)
    // console.log("hello",this.creditNote.changingThisBreaksApplicationSecurity)
    // window.location.href = this.creditNote
    // let pdfName= this.creditNote.changingThisBreaksApplicationSecurity.substring(this.creditNote.changingThisBreaksApplicationSecurity.lastIndexOf('/')+1);
    // console.log(pdfName)
    // const link = document.createElement('a');
    // // link.id = "dwnldLnk";
    // document.body.appendChild(link);
    // // const dlnk: any = document.getElementById("dwnldLnk");
    // // dlnk.href =
    // // dlnk.download = this.creditNote.changingThisBreaksApplicationSecurity;
    // // dlnk.click();
    // link.setAttribute('target', '_blank');
    // link.setAttribute('href', this.creditNote.changingThisBreaksApplicationSecurity);
    // link.setAttribute('download', pdfName);
    // link.download = pdfName;

    // link.click();
    // link.remove();

    // this.durl = this.data3.replace('application/pdf', 'application/octet-stream')
    //   console.log("DATA")
    //   const link: any = document.createElement("a");
    //   link.id = "dwnldLnk";
    //   link.style = "display:none;";
    //   document.body.appendChild(link);
    //   const dlnk: any = document.getElementById("dwnldLnk");
    //   dlnk.href = this.durl;
    //   console.log(dlnk)
    //   console.log(dlnk.href)
    //   dlnk.download = "finalReport.pdf";
    //   dlnk.click();

    //     let link = document.createElement('a');
    // link.setAttribute('type', 'hidden');
    // link.href = 'abc.net/files/test.ino';
    // link.download = 'https://storage.googleapis.com/doc-machine-bucket1/BOE-2.pdf';
    // document.body.appendChild(link);
    // link.click();
    // link.remove();

    // const link = document.createElement('a');
    //     link.setAttribute('target', '_blank');
    //     link.setAttribute('href', 'https://storage.googleapis.com/doc-machine-bucket1/BOE-2.pdf');
    //     link.setAttribute('download', `products.pdf`);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
  }

  ngOnDestroy() {
    console.log('Inside draft');
    // if (!this.isDoneAll && this.generate) {
    //   this.confirmDialogService.confirmThis('Do you want to save this task?', () => {
    //     if (this.isProceed) {
    //       this.documentService.addExportTask({ task: this.newTask, completed: 'yes', fileType: 'BL' }).subscribe(
    //         (res) => {
    //           this.toastr.success('Saved the transaction as completed');
    //           console.log("Transaction Saved");
    //           //this.router.navigate(["/home/dashboardTask"]);

    //         },
    //         (err) => {
    //           this.toastr.error('Error!');
    //           console.log("Error saving the transaction")
    //         }
    //       );
    //     }
    //     else {
    //       this.documentService.addExportTask({ task: this.newTask, completed: 'no', fileType: 'BL' }).subscribe(
    //         (res) => {
    //           this.toastr.success('Saved the transaction in draft');
    //           console.log("Transaction Saved");
    //           //this.router.navigate(["/home/dashboardTask"]);

    //         },
    //         (err) => {
    //           this.toastr.error('Error!');
    //           console.log("Error saving the transaction")
    //         }
    //       );
    //     }

    //   }, () => {
    //     console.log("no");
    //   });
    // }
  }

  setradio(a) {
    console.log(a);
    this.bankToggle = true;
    this.bankValue = a;

    this.newBankArray = [];
    this.bankArray.forEach((value, index) => {
      console.log('shshsh');
      if (value.bank == a) {
        this.newBankArray.push(value);
      }
    });
  }

  creditTo(a) {
    var n = a.accNumber;
    this.credit = n.split('');
    console.log(this.credit);
  }

  chargesTo(a) {
    var n = a.accNumber;
    this.charge = n.split('');
    console.log(this.charge);
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

  open1(content1) {
    this.modalService
      .open(content1, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  refSbNo: number;

  open2(content2, sbno) {
    this.currentSbForAdvance = sbno;
    this.refSbNo = sbno;
    this.modalService
      .open(content2, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  showPreview() {
    console.log('All Details', this.invoiceArr);
    // {_id:ObjectId('626a527df13ff52fd4871243')}
    this.bgColor = true;
    this.newDone = true;
  }

  hidePreview() {
    this.bgColor = false;
    this.newDone = false;
  }

  removepipo(i) {
    this.itemArray1.splice(i, 1);
  }

  removeshipping(i) {
    this.itemArray.splice(i, 1);
    console.log('this is remove');
  }

  addTofilter(event, id) {
    let removeArray = [];
    this.pipo = true;
    this.ship = false;
    this.itemArray1 = [];
    if (event.target.checked) {
      for (let element of this.item) {
        if (element._id == id) {
          this.itemArray.push(element);
        }
      }
    } else {
      if (this.itemArray.length) {
        this.itemArray.forEach((element) => {
          if (element._id != id) {
            removeArray.push(element);
          }
        });
        this.itemArray = removeArray;
      }
    }
    console.log('test', this.itemArray);
  }

  addTofilter1(event, id, data) {
    // this.itemArray = [];
    if (data.blCopyDoc) {
      if (data.commercialDoc) {
        if (data.packingDoc) {
          let removeArray = [];
          this.ship = true;
          this.pipo = false;
          if (event.target.checked) {
            for (let element of this.item1) {
              if (element._id == id) {
                this.itemArray.push(element);
              }
            }
          } else {
            if (this.itemArray.length) {
              this.itemArray.forEach((element) => {
                if (element._id != id) {
                  removeArray.push(element);
                }
              });
              this.itemArray = removeArray;
            }
          }
          console.log('test2', this.itemArray);
        } else {
          event.target.checked = false;
          this.toastr.error(
            "You Don't Have Any Packing List Documnet Linkend with this Shipping Bill"
          );
        }
      } else {
        event.target.checked = false;
        this.toastr.error(
          "You Don't Have Any Commercial Documnet Linkend with this Shipping Bill"
        );
      }
    } else {
      event.target.checked = false;
      this.toastr.error(
        "You Don't Have Any AirWay / BLCopy Documnet Linkend with this Shipping Bill"
      );
    }
  }

  shippingMap: Map<number, any[]> = new Map<number, any[]>();

  addToSbArray(irDataItem: any, e) {
    if (e.target.checked) {
      console.log('Checked');
      let advance = this.advanceArray.some(
        (item) => item.valueInternal === irDataItem.billNo
      );
      if (!advance) {
        console.log('Adding');
        let details = {
          valueInternal: irDataItem.billNo,
          irDataItem: irDataItem,
          sb: this.currentSbForAdvance,
        };
        this.advanceArray.push(details);
      }
    } else {
      console.log('removing, uncheked');
      this.advanceArray = this.advanceArray.filter(
        (item) => item.valueInternal !== irDataItem.billNo
      );
    }
    this.shippingMap.set(
      this.refSbNo,
      JSON.parse(JSON.stringify(this.advanceArray))
    );
    console.log(this.advanceArray, 'Hello0*************************');
  }

  clearData() {
    this.advanceArray = [];
    console.log('Shippoinhg', this.shippingMap);
  }

  goBack() {
    this.isGenerate = false;

    window.location.reload();
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(
      this.billLodge.nativeElement
    );
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    if (this.Question5 == 'yes') {
      xlsx.writeFile(wb, 'Invoice Reduction.xlsx');
    } else if (this.Question5 == 'no') {
      xlsx.writeFile(wb, 'Shipping Details.xlsx');
    }
  }

  public currentDownloadPdf;
  openToPdf(content3, pipo) {
    this.generateChecked = true;
    this.currentDownloadPdf = pipo;
    this.selectedPdfs = [];
    this.selectedPdfs2 = [];
    console.log('this insurnce', this.insurance);
    console.log('selectedPdfs in line no 2958', this.selectedPdfs);
    console.log('selectedPdfs in line no 2959', this.selectedPdfs2);

    if (this.currentDownloadPdf.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.currentDownloadPdf.changingThisBreaksApplicationSecurity
      );
    }
    if (this.creditNote.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.creditNote.changingThisBreaksApplicationSecurity
      );
    }
    if (this.debitNote.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.debitNote.changingThisBreaksApplicationSecurity
      );
    }
    if (this.insurance.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.insurance.changingThisBreaksApplicationSecurity
      );
    }
    if (this.ebrc.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(this.ebrc.changingThisBreaksApplicationSecurity);
    }
    if (this.blcopyref.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.blcopyref.changingThisBreaksApplicationSecurity
      );
    }
    if (this.irAdvice.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.irAdvice.changingThisBreaksApplicationSecurity
      );
    }

    if (this.agreement.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.agreement.changingThisBreaksApplicationSecurity
      );
    }

    if (this.swiftCopy.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.swiftCopy.changingThisBreaksApplicationSecurity
      );
    }
    if (this.tryPartyAgreement.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.tryPartyAgreement.changingThisBreaksApplicationSecurity
      );
    }
    if (this.airwayBlCopy.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.airwayBlCopy.changingThisBreaksApplicationSecurity
      );
    }
    if (this.billOfExchange.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.billOfExchange.changingThisBreaksApplicationSecurity
      );
    }
    if (this.destruction.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.destruction.changingThisBreaksApplicationSecurity
      );
    }
    if (this.commercial.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.commercial.changingThisBreaksApplicationSecurity
      );
    }
    if (this.packingList.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(
        this.packingList.changingThisBreaksApplicationSecurity
      );
    }
    if (this.lcCopy.changingThisBreaksApplicationSecurity) {
      this.selectedPdfs.push(this.lcCopy.changingThisBreaksApplicationSecurity);
    }

    console.log('selectedPDFs', this.selectedPdfs);

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

  addPdfToSelectedPdf(value, e) {
    if (e.target.checked) {
      if (
        this.selectedPdfs.includes(
          value.changingThisBreaksApplicationSecurity
        ) === false
      ) {
        this.selectedPdfs.push(value.changingThisBreaksApplicationSecurity);
      }
    } else if (!e.target.checked) {
      this.selectedPdfs = this.selectedPdfs.filter(
        (item) => item !== value.changingThisBreaksApplicationSecurity
      );
    }

    console.log('this.selectedPdfs', this.selectedPdfs);
  }

  addPdfToSelectedPdf2(value, e) {
    if (e.target.checked) {
      this.generateChecked = true;
    } else {
      this.generateChecked = false;
    }
  }

  // Code For PDF Download Thank you........

  downloadAsSingleFile = async (pdfDoc: any) => {
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
    //const byteCharacters = atob(data_pdf);
    if (this.generateChecked == true) {
      var merge = 'data:application/pdf;base64,' + data_pdf; //this.value

      const mergedPdf = await PDFDocument.create();
      const pdfA = await PDFDocument.load(this.formerge);
      const pdfB = await PDFDocument.load(merge);
      const copiedPagesA = await mergedPdf.copyPages(
        pdfA,
        pdfA.getPageIndices()
      );
      copiedPagesA.forEach((page) => mergedPdf.addPage(page));

      const copiedPagesB = await mergedPdf.copyPages(
        pdfB,
        pdfB.getPageIndices()
      );
      copiedPagesB.forEach((page) => mergedPdf.addPage(page));
      const mergedPdfFile = await mergedPdf.save();
      var base64String = this._arrayBufferToBase64(mergedPdfFile);
      console.log('merge doc', base64String);
      var genDoc = base64String;
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
        // console.log("bytenumbers", byteNumbers[i])
      }
      this.uploadFile2(genDoc);
      // this.doneDox(genDoc);
      const byteArray = new Uint8Array(byteNumbers);
      importedSaveAs(
        new Blob([byteArray], { type: 'application/pdf' }),
        'BankAttachment'
      );
    } else {
      const byteCharacters1 = atob(data_pdf);
      const byteNumbers1 = new Array(byteCharacters1.length);
      for (let i = 0; i < byteCharacters1.length; i++) {
        byteNumbers1[i] = byteCharacters1.charCodeAt(i);
        // console.log("bytenumbers", byteNumbers[i])
      }
      this.uploadFile2(genDoc);
      // this.doneDox(genDoc);
      const byteArray1 = new Uint8Array(byteNumbers1);
      importedSaveAs(
        new Blob([byteArray1], { type: 'application/pdf' }),
        'BankAttachment'
      );
    }
  };

  uploadFile2(file) {
    const pdfName = 'bankAttachment.pdf';
    // console.log("pdfName", pdfName)
    const pdfBlob = this.dataURItoBlob(file);
    console.log('pdfName', pdfBlob);
    const pdfFile = new File([pdfBlob], pdfName, { type: 'application/pdf' });
    console.log('my pdf file', pdfFile);
    const formData = new FormData();

    formData.append('file', pdfFile);
    console.log('formData', formData);

    this.documentService.uploadImage(formData).subscribe((data) => {
      console.log('my data Link', data);
      this.genDoc = data;
      this.doneDox(this.genDoc.data);
      //     this.billLodgePdf = data;
      //     // this.value = this.sanitizer.bypassSecurityTrustResourceUrl(this.billLodgePdf.data);
      //     console.log("bill lodge", this.billLodgePdf.data);
      //     // this.formerge = this.billLodgePdf.data;
      //     this.newTask[0].generateDoc1 = this.billLodgePdf.data;
      //     console.log("Task of the day", this.newTask[0].generateDoc1)
      //     console.log("Task of the day", this.newTask[0])
    });
  }

  sendMail = async (pdfDoc: any) => {
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    console.log('5417****', pdfDataUri);
    var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
    const byteCharacters = atob(data_pdf);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
      // console.log("bytenumbers", byteNumbers[i])
    }
    const byteArray = new Uint8Array(byteNumbers);
    // this.BytePdfDoc = byteArray.toString();

    // console.log("**BytePdfDoc",this.BytePdfDoc)
    console.log('**user id', this.id);
    console.log('99999999999999999999999', data_pdf);

    if (this.generateChecked == true) {
      var merge = 'data:application/pdf;base64,' + data_pdf; //this.value

      const mergedPdf = await PDFDocument.create();
      console.log('xx');
      const pdfA = await PDFDocument.load(this.formerge);
      console.log('a');
      const pdfB = await PDFDocument.load(merge);
      console.log('b');
      const copiedPagesA = await mergedPdf.copyPages(
        pdfA,
        pdfA.getPageIndices()
      );
      copiedPagesA.forEach((page) => mergedPdf.addPage(page));

      const copiedPagesB = await mergedPdf.copyPages(
        pdfB,
        pdfB.getPageIndices()
      );
      copiedPagesB.forEach((page) => mergedPdf.addPage(page));
      const mergedPdfFile = await mergedPdf.save();
      var base64String = this._arrayBufferToBase64(mergedPdfFile);
      var genDoc = base64String;
      // console.log("line no. 3328", this.genDoc)

      // this.doneDox(genDoc);
      this.uploadFile2(genDoc);

      this.userService.documentSend(this.id, base64String).subscribe(
        (data) => {
          console.log('king123');
          console.log(data);
          // this.message = data['message']
          // this.no = false;
          //
        },
        (error) => {
          // this.no = true;
          // this.message = null;
          console.log('error');
        }
      );
    } else {
      this.userService.documentSend(this.id, data_pdf).subscribe(
        (data) => {
          console.log('king123');
          console.log(data);
          // this.message = data['message']
          // this.no = false;
          //
        },
        (error) => {
          // this.no = true;
          // this.message = null;
          console.log('error');
        }
      );
    }
  };

  mergeAllPDFs = async (type: String) => {
    let urls = this.selectedPdfs;
    const numDocs = urls.length;
    const pdfDoc = await PDFDocument.create();

    // download the single file to local.
    // Append each pdfs to a single file
    var appendEachPage = async (donorPdfDoc, currentpage, docLength) => {
      if (currentpage < docLength) {
        console.log('Inside Page', currentpage, 'total pages', docLength);
        const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [currentpage]);
        pdfDoc.addPage(donorPage);
        await appendEachPage(donorPdfDoc, currentpage + 1, docLength);
      }
    };
    var appendEachFile = async (bytes) => {
      const donorPdfDoc = await PDFDocument.load(bytes);
      const docLength = donorPdfDoc.getPageCount();
      console.log('donorPdfDoc', donorPdfDoc, 'docLength', docLength);
      await appendEachPage(donorPdfDoc, 0, docLength);
    };
    var appendAllFiles = async (pdflist, currentfile) => {
      if (currentfile < numDocs) {
        await appendEachFile(pdflist[currentfile]);
        console.log('Inside file', currentfile);
        await appendAllFiles(pdflist, currentfile + 1);
      } else {
        if (type == 'download') {
          this.downloadAsSingleFile(pdfDoc);
        } else {
          this.sendMail(pdfDoc);
        }
      }
    };

    // download single file;
    let downloadEachFile = (filename) => {
      return new Promise((resolve, reject) => {
        this.userService.mergePdf(filename).subscribe(
          (res: any) => {
            console.log('res', res);
            resolve(res.arrayBuffer());
          },
          (err) => reject('Failed to fetch the pdf')
        );
      });
    };
    // download all the pdfs
    let downloadAllFiles = () => {
      var promises = [];
      for (var i = 0; i < numDocs; i++) {
        let filename = urls[i].substring(urls[i].lastIndexOf('/') + 1);
        promises.push(downloadEachFile(filename));
      }
      Promise.all(promises).then(
        (pdfList) => {
          appendAllFiles(pdfList, 0);
          console.log('pdfList2', pdfList);
        },
        (error) => {
          // write code to send error to user
          // res.send({"error": "failed to fetch the document try again later/ contact administrator"})''
        }
      );
    };
    downloadAllFiles();
  };

  downloadFile2 = (blob, fileName) => {
    const link = document.createElement('a');
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  };

  // downloadFile(new Blob(['random data']), "myfile.txt");

  downloadAll = async (type: String) => {
    // this.downloadALL = [];

    var proceedtoDownloadPdf = async (download, sbno) => {
      console.log('line 3377', download);
      let urls = download;
      const numDocs = urls.length;
      const pdfDoc = await PDFDocument.create();

      var appendEachPage = async (donorPdfDoc, currentpage, docLength) => {
        console.log('line 3383', currentpage);
        if (currentpage < docLength) {
          console.log('Inside Page', currentpage, 'total pages', docLength);
          const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [
            currentpage,
          ]);
          pdfDoc.addPage(donorPage);
          await appendEachPage(donorPdfDoc, currentpage + 1, docLength);
        }
      };
      var appendEachFile = async (bytes) => {
        const donorPdfDoc = await PDFDocument.load(bytes);
        const docLength = donorPdfDoc.getPageCount();
        console.log('donorPdfDoc', donorPdfDoc, 'docLength', docLength);
        await appendEachPage(donorPdfDoc, 0, docLength);
      };
      var appendAllFiles = async (pdflist, currentfile) => {
        if (currentfile < numDocs) {
          await appendEachFile(pdflist[currentfile]);
          console.log('Inside file', currentfile);
          await appendAllFiles(pdflist, currentfile + 1);
        } else {
          if (type == 'download') {
            console.log(pdfDoc);
            await this.BulkDOwnload(pdfDoc, sbno);
          }
          //   // else {
          //   //   this.sendMail(pdfDoc);
          //   // }
        }
      };

      // download single file;
      let downloadEachFile = (filename) => {
        return new Promise((resolve, reject) => {
          this.userService.mergePdf(filename).subscribe(
            (res: any) => {
              console.log('res', res);
              resolve(res.arrayBuffer());
            },
            (err) => reject('Failed to fetch the pdf')
          );
        });
      };
      // download all the pdfs
      let downloadAllFiles = () => {
        var promises = [];
        for (var i = 0; i < numDocs; i++) {
          let filename = urls[i].substring(urls[i].lastIndexOf('/') + 1);
          promises.push(downloadEachFile(filename));
        }
        Promise.all(promises).then(
          (pdfList) => {
            appendAllFiles(pdfList, 0);
            console.log('pdfList2', pdfList);
          },
          (error) => {
            // write code to send error to user
            // res.send({"error": "failed to fetch the document try again later/ contact administrator"})''
          }
        );
      };
      downloadAllFiles();
    };

    var bulkDownloadSingle = async (mainDoc1, index) => {
      if (mainDoc1[index]) {
        let sb = mainDoc1[index];
        var downloadALL = [];
        downloadALL.push(sb.changingThisBreaksApplicationSecurity);
        if (this.creditNote.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.creditNote.changingThisBreaksApplicationSecurity
          );
        }
        if (this.debitNote.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.debitNote.changingThisBreaksApplicationSecurity
          );
        }
        if (this.ebrc.changingThisBreaksApplicationSecurity) {
          downloadALL.push(this.ebrc.changingThisBreaksApplicationSecurity);
        }
        if (this.blcopyref.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.blcopyref.changingThisBreaksApplicationSecurity
          );
        }
        if (this.irAdvice.changingThisBreaksApplicationSecurity) {
          downloadALL.push(this.irAdvice.changingThisBreaksApplicationSecurity);
        }
        if (this.swiftCopy.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.swiftCopy.changingThisBreaksApplicationSecurity
          );
        }
        if (this.tryPartyAgreement.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.tryPartyAgreement.changingThisBreaksApplicationSecurity
          );
        }
        if (this.airwayBlCopy.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.airwayBlCopy.changingThisBreaksApplicationSecurity
          );
        }
        if (this.billOfExchange.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.billOfExchange.changingThisBreaksApplicationSecurity
          );
        }
        if (this.destruction.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.destruction.changingThisBreaksApplicationSecurity
          );
        }
        if (this.commercial.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.commercial.changingThisBreaksApplicationSecurity
          );
        }
        if (this.packingList.changingThisBreaksApplicationSecurity) {
          downloadALL.push(
            this.packingList.changingThisBreaksApplicationSecurity
          );
        }
        if (this.lcCopy.changingThisBreaksApplicationSecurity) {
          downloadALL.push(this.lcCopy.changingThisBreaksApplicationSecurity);
        }

        for (let lc of this.mainDoc4) {
          downloadALL.push(lc.changingThisBreaksApplicationSecurity);
        }

        for (let tri of this.mainDoc3) {
          downloadALL.push(tri.changingThisBreaksApplicationSecurity);
        }
        console.log('line 3448', downloadALL);

        await proceedtoDownloadPdf(downloadALL, this.sbArray[index]);
        await bulkDownloadSingle(mainDoc1, index + 1);
        // this.downloadALL.push(sb.changingThisBreaksApplicationSecurity)
      }
    };

    await bulkDownloadSingle(this.mainDoc1, 0);
    // console.log("3530", thi)

    // if (this.currentDownloadPdf.changingThisBreaksApplicationSecurity) {
    //   this.downloadALL.push(
    //     this.currentDownloadPdf.changingThisBreaksApplicationSecurity
    //   );
    // }
  };

  BulkDOwnload = async (pdfDoc: any, sbno: string) => {
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
    var merge = 'data:application/pdf;base64,' + data_pdf; //this.value

    const mergedPdf = await PDFDocument.create();
    const pdfA = await PDFDocument.load(this.formerge);
    const pdfB = await PDFDocument.load(merge);
    const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
    copiedPagesA.forEach((page) => mergedPdf.addPage(page));

    const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
    copiedPagesB.forEach((page) => mergedPdf.addPage(page));
    const mergedPdfFile = await mergedPdf.save();
    var base64String = this._arrayBufferToBase64(mergedPdfFile);
    console.log('mergeDoc', base64String);
    var genDoc = base64String;
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
      // console.log("bytenumbers", byteNumbers[i])
    }
    this.uploadFile2(genDoc);
    // this.doneDox(genDoc);
    let filenameforDoc = sbno && sbno.length ? sbno : 'BankAttachment';
    const byteArray = new Uint8Array(byteNumbers);
    importedSaveAs(
      new Blob([byteArray], { type: 'application/pdf' }),
      filenameforDoc
    );
  };

  public mergeIr() {
    let filterSBdata = [];
    let completedsb = [];
    let sbindex = 0;
    for (let sbNum of this.item1) {
      let totalForex = 0;
      // item1 have pipo details
      let currentpipo = this.item1[sbindex];
      console.log('Line no. 3658', currentpipo);
      console.log('Line no. 3659', sbNum);
      for (let irData of this.item9) {
        console.log('line 3661', irData);
        for (let sb of irData.sbNo) {
          console.log('a');
          if (sbNum._id == sb._id) {
            let irAmount = parseFloat(irData.amount);
            totalForex = totalForex + irAmount;
            console.log('145', totalForex);
          } else {
            filterSBdata.push(this.item1);
          }
        }
      }

      const newVal = { ...sbNum };
      let sbAmount = newVal.fobValue;

      newVal['balanceAvai'] = (sbAmount - totalForex).toFixed(2);
      console.log('hello sj', newVal);

      filterSBdata.push(newVal);

      if (completedsb.indexOf(sbindex) == -1) {
        completedsb.push(sbindex);
      }
      sbindex = sbindex + 1;
    }
    for (let i = completedsb.length - 1; i >= 0; i--) {
      this.item1.splice(completedsb[i], 1);
    }
    for (let sb of filterSBdata) {
      console.log('data of pipo', sb);
      if (sb.balanceAvai > 0) {
        this.item1.push(sb);
      }
    }
  }

  public mergeIr2() {
    let filterIrdata = [];
    if (this.item1 && this.item1.length) {
      for (let irData of this.item9) {
        // item9 have forex details
        console.log('Line no. 3700', irData);
        // if(irData.sbNo.length){
        for (let sbNum of this.item1) {
          console.log('line 3701', sbNum);
          for (let i = 0; i <= irData.sbNo.length; i++) {
            console.log('a');
            if (sbNum.sbno == irData.sbNo[i]) {
              const newVal = { ...irData };
              console.log('Line no. 3706', newVal);
              let sbBalance = sbNum.fobValue;
              let irAmount = parseFloat(irData.amount);
              let availableBalance = irAmount - sbBalance;

              if (availableBalance <= 0) {
                newVal['BalanceAvail'] = 0;
              } else {
                newVal['BalanceAvail'] = availableBalance;
              }

              if (newVal.BalanceAvail > 0) {
                console.log('BalanceAvailable', newVal.BalanceAvail);
                filterIrdata.push(newVal);
              }
              console.log('Line no. 3723', filterIrdata);
            }
            // else {
            //   for (let sb of filterIrdata) {
            //     if (sb.sbno !== sbNum.sbno) {
            //       console.log('itemAvailable');
            //       // itemavailable = true;
            //       const newVal = { ...irData };
            //       let availableBal = parseFloat(
            //         irData.amount
            //       );
            //       newVal['BalanceAvail'] = availableBal.toFixed(2);
            //       filterIrdata.push(newVal);
            //       console.log('My Data', newVal);
            //     }
            //   }
            // }
          }
        }
      }
      for (let irData of this.item9) {
        if (irData.sbNo.length == 0) {
          const newVal = { ...irData };
          let availableBal = irData.amount;
          // .replace(/,/g, ''));
          newVal['BalanceAvail'] = availableBal;
          filterIrdata.push(newVal);
          console.log('235', filterIrdata);
        }
      }
    } else {
      for (let ir of this.item9) {
        const newVal = { ...ir };
        let availableBal = ir.amount;
        // parseFloat(

        // .replace(/,/g, ''));
        newVal['BalanceAvail'] = availableBal.toFixed(2);
        filterIrdata.push(newVal);
      }
    }
    console.log('filterForex', filterIrdata);
    this.item13 = filterIrdata;
  }

  doneToDox() {
    if (this.Question6 == 'yes') {
      console.log('All Details', this.invoiceArr);

      let iradvice = {};
      let irdetails = [];
      let sbNO = {};
      function checkIfSbExist(list, checker) {
        for (let i in list) {
          if (list[i] == checker) {
            return true;
          }
        }
        return false;
      }

      for (let i in this.invoiceArr) {
        console.log('2758', this.invoiceArr[i].irAdviceId);
        if (iradvice[this.invoiceArr[i].advance] == undefined) {
          iradvice[this.invoiceArr[i].advance] = {
            sbNo: [this.invoiceArr[i]._id],
            billNo: this.invoiceArr[i].advance,
            // irRef: this.invoiceArr[i].irAdviceId,
          };
          irdetails.push(this.invoiceArr[i].irAdviceId);

          sbNO[this.invoiceArr[i].sbno] = {
            // sbNo: [this.invoiceArr[i]._id],
            irRef: irdetails,
          };
        } else {
          if (
            !checkIfSbExist(
              iradvice[this.invoiceArr[i].advance].sbNo,
              this.invoiceArr[i]._id
            )
          ) {
            iradvice[this.invoiceArr[i].advance].sbNo.push(
              this.invoiceArr[i]._id
            );
          }
        }
      }

      console.log('My details', iradvice);
      console.log('My sbDetails', sbNO);
      console.log('this.invoiceArr[i].irAdviceId', irdetails);
      for (let ir in iradvice) {
        this.documentService
          .updateByIr(iradvice[ir], iradvice[ir].billNo)
          .subscribe((data) => {
            console.log('my ir', ir);
            console.log(
              'IrAdvice and sb connected successfully',
              iradvice[ir].billNo
            );
              });
            console.log('2759', iradvice[ir]);
            console.log('line no. 2760', data);

      }
      for (let sb in sbNO) {
        console.log("3734", sbNO[sb]);
          this.documentService
            .updateIrInSb(sbNO[sb], sb)
            .subscribe((res: any) => {
              console.log(res);
        });
      }
    }
  }
}
