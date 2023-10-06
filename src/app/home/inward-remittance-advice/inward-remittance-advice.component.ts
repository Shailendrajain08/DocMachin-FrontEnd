import {
  Component,
  ElementRef,
  OnInit,
  resolveForwardRef,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from 'src/app/service/document.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-Data-Servies/shared-data.service';
import * as xlsx from 'xlsx';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-inward-remittance-advice',
  templateUrl: './inward-remittance-advice.component.html',
  styleUrls: ['./inward-remittance-advice.component.scss'],
})
export class InwardRemittanceAdviceComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  public optionsVisibility: any = [];
  // public optionsVisibility : boolean = false;
  test;
  public item: any;
  public item1 = [];
  item4: any;
  location;
  commodity;
  recievedAmount;
  amount;
  commision;
  Comoval: any = 'Commodity';
  Locval: any = 'Location';
  nameSearch: string = 'Commodity';
  origin: any = [];
  item5: any;
  Originval: any = 'origin';
  item3: any;
  pipoValue: any = 'Select PI/PO';
  public item6 = [];
  public closeResult: string;
  public viewData: any;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private documentService: DocumentService,
    private router: Router,
    private sharedData: SharedDataService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.documentService.getIrAdvice(1).subscribe(
      (res: any) => {
        console.log(res), (this.item = res.data);
        console.log('king', this.item);
        // console.log(res), (this.item1 = res.data);
        // console.log('shshsh', this.item1[0].amount);
        for (let value of this.item) {
          if (value['file'] == 'export') {
            console.log('avvvvvvvvvv', value);
            // console.log()
            this.item1.push(value);

            // for(let value1 of this.item2){
            //   const newVal = { ...this.item2 };
            //   newVal['pipo1'] = value1
            // this.merging();
            //   this.item1.push(newVal)
          }
        }
        this.item1.forEach((element, i) => {
          let amount = element.amount
          // .replace(/,/g, '');
          let commision = parseFloat(element.commision)
          // .replace(/,/g, '');
          let exchangeRate = parseFloat(element.exchangeRate)
          // .replace(/,/g, '');
          this.item1[i].recUSD = (amount - commision).toFixed(2);
          let cv = (
            parseFloat(this.item1[i].recUSD) * exchangeRate
          ).toFixed(2);
          this.item1[i].convertedAmount = cv != "NaN" ? cv: null;
        });
        console.log('sjsjs', this.item1);
      },
      (err) => console.log(err)
    );

    // this.documentService.getIrAdvice(user).subscribe(
    //   (res: any) => {
    //     console.log('Data fetched successfully', res);
    //     this.item = res.data;
    //     for (let value of this.item) {
    //       for(let value1 of value.pipo){
    //         const newVal = { ...value };
    //             newVal['pipo1'] = value1
    //             this.item1.push(newVal)
    //           }
    //     }
    //   },
    //   (err) => console.log(err)
    //   );

    this.userService.getTeam().subscribe(
      (data) => {
        console.log('llllllllllllllllllllllllllllllll');
        console.log(data['data'][0]);
        this.location = data['data'][0]['location'];
        this.commodity = data['data'][0]['commodity'];
        console.log(this.location);
        console.log('jsadffhsjshd', this.commodity);
        console.log('team data', data);
        this.location = this.location.filter(
          (value, index) => this.location.indexOf(value) === index
        );
        this.commodity = this.commodity.filter(
          (value, index) => this.commodity.indexOf(value) === index
        );
        //this.router.navigate(['/addMember'], { queryParams: { id: data['data']._id } })
      },
      (error) => {
        console.log('error');
      }
    );

    this.documentService.getMaster(1).subscribe(
      (res: any) => {
        console.log('Master Data File', res);
        // this.origin = res['data'][0]['countryOfFinaldestination']
        // console.log("jainshailendra",this.origin);
        this.item5 = res.data;

        this.item5.forEach((element, i) => {
          this.origin[i] = element.countryOfFinaldestination;
        });
        this.origin = this.origin.filter(
          (value, index) => this.origin.indexOf(value) === index
        );

        console.log('Master Country', this.origin);

        // this.merging();
        // this.origin.forEach((element, i)=>{
        //   this.origin[i].ori = element[i]
        // })
        // console.log("Master Country2", this.origin)
      },
      (err) => console.log(err)
    );

    this.documentService.getPipo().subscribe(
      (res: any) => {
        console.log('Data fetched successfully', res), (this.item3 = res.data);
      },
      (err) => console.log(err)
    );

    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.merging();
  }, 1000);
  }

  getPipoNumbers(data) {
    return data.pipo.map((x) => {
      return x.pi_poNo;
    });
  }
  toSave(data, index) {
    this.optionsVisibility[index] = false;
    console.log('Shailendra', data);
    this.documentService.updateIrAdvice(data, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('Forex Advice Row Is Updated Successfully.');
      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        console.log('error');
      }
    );
  }

  toEdit(index) {
    this.optionsVisibility[index] = true;
    this.toastr.warning('Forex Advice Row Is In Edit Mode');
  }

  newIrAdvice() {
    console.log('upload');
    this.sharedData.changeretunurl('home/inward-remittance-advice');
    this.router.navigate([
      'home/upload',
      { file: 'export', document: 'irAdvice' },
    ]);
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(
      this.epltable.nativeElement
    );
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Forex Advice.xlsx');
  }

  merging() {

    let filterForexData = [];
    if (this.item5 && this.item5.length) {
      for (let irData of this.item1) {
        console.log('irdata', irData);
        for (let shippingdata of this.item5) {
          console.log('shipping', shippingdata);
          for (let i = 0; i <= irData.sbNo.length; i++) {
            console.log('index of shipping Bill', irData.sbNo[i]);
            if (irData.sbNo[i] && irData.sbNo[i].sbno == shippingdata.sbno) {
              const newVal = { ...irData };
              console.log('Line no. 211', newVal);
              console.log("47599", shippingdata.sbno)
              let sbBalance = shippingdata.fobValue;
              let irAmount = irData.amount
              // .replace(/,/g, ''));
                newVal['sbno'] = shippingdata.sbno
              let availableBalance = irAmount - sbBalance;
              if (availableBalance <= 0) {
                newVal['BalanceAvail'] = 0;
              } else {
                newVal['BalanceAvail'] = availableBalance.toFixed(2);
              }

              console.log('Forex data Value', newVal);
              filterForexData.push(newVal);
            }
          }
        }
      }
      for (let irData of this.item1) {
        console.log("229",irData.sbNo.length)
        if(irData.sbNo.length == 0){
          const newVal = { ...irData };
          let availableBal = irData.amount
            // .replace(/,/g, ''));
          newVal['BalanceAvail'] = availableBal.toFixed(2);
          filterForexData.push(newVal);
          console.log('235', filterForexData);
        }
      }

    } else {
      for (let ir of this.item1) {
        const newVal = { ...ir };
        let availableBal = ir.amount
          // .replace(/,/g, ''));
        newVal['BalanceAvail'] = availableBal.toFixed(2);
        filterForexData.push(newVal);
        console.log('245', filterForexData);
      }
    }
    this.item6 = filterForexData
    console.log("Full data", this.item6)
  }

  // mergingSb() {
  //   let pipoindex = 0;
  //   let completedpipo = [];
  //   let filterForexData = [];
  //   if (this.item5 && this.item5.length) {
  //     //   // let completedpipo1 = [];
  //     console.log('Forex Data', this.item1);
  //     for (let irData of this.item1) {
  //       // item1 have irdata details
  //       console.log('irData length', irData.sbNo.length);
  //       let currentpipo = this.item1[pipoindex];
  //       console.log('Line no. 802', currentpipo);
  //       // this.item1[pipoindex].shippingdata = [];

  //       for (let shippingdata of this.item5) {
  //         //       // item20 have shipping bill details
  //         console.log('shipping bill data', this.item5);
  //         for (let i = 0; i <= irData.sbNo.length; i++) {
  //           if (irData.sbNo[i] == shippingdata.sbno) {
  //             const newVal = { ...irData };
  //             console.log('Line no. 807', newVal);
  //             let sbBalance = shippingdata.fobValue;
  //             let irAmount = parseFloat(irData.amount);
  //             let availableBalance = irAmount - sbBalance;

  //             if (availableBalance <= 0) {
  //               newVal['BalanceAvail'] = 0;
  //             } else {
  //               newVal['BalanceAvail'] = availableBalance.toFixed(2);
  //             }

  //             //         console.log('Line no 814', newVal);
  //             filterForexData.push(newVal);
  //             console.log('Line no. 816', filterForexData);
  //             console.log('Line no. 816', this.item1[pipoindex]);
  //             if (completedpipo.indexOf(pipoindex) == -1) {
  //               completedpipo.push(pipoindex);
  //             }
  //             //         console.log('line no. 773 completedpipo',completedpipo)
  //             //         console.log('cheching shipping data', currentpipo);
  //           } else {
  //             for (let sb of filterForexData) {
  //               if (sb.sbno !== shippingdata.sbno) {
  //                 console.log('itemAvailable');
  //                 // itemavailable = true;
  //                 const newVal = { ...irData };
  //                 let availableBal = parseFloat(
  //                   irData.amount
  //                 );
  //                 newVal['BalanceAvail'] = availableBal.toFixed(2);
  //                 filterForexData.push(newVal);
  //                 console.log('My Data', newVal);
  //               }
  //             }
  //           }
  //           pipoindex = pipoindex + 1;
  //         }
  //       }

  //       //   console.log('filtershiping data', filtershippingdata);
  //       //   console.log('completed pipo data', completedpipo);

  //       for (let i = completedpipo.length - 1; i >= 0; i--) {
  //         console.log('233', completedpipo);
  //         this.item1.splice(completedpipo[i], 1);
  //       }
  //       // for (let pipo of filterForexData) {
  //       //   console.log('data of pipo', pipo);
  //       //   this.item6.push(pipo);
  //       // }
  //       this.item6 = filterForexData;
  //       console.log(
  //         '****************** line no. 241 with sb details ',
  //         this.item6
  //       );
  //     }
  //   } else {
  //     for (let ir of this.item1) {
  //       const newVal = { ...ir };
  //       let availableBal = parseFloat(ir.amount);
  //       newVal['BalanceAvail'] = availableBal.toFixed(2);
  //       filterForexData.push(newVal);
  //     }
  //     for (let sb of filterForexData) {X
  //       console.log('data of pipo', sb);
  //       this.item1.push(sb);
  //     }
  //   }
  // }

  openIradvice(content) {
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

  viewIr(a) {
    ;
    this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(a['doc']);
  }
}
