import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {DocumentService} from 'src/app/service/document.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from './../../service/user.service';
import * as xlsx from 'xlsx';
import {Router} from '@angular/router';
import {SharedDataService} from "../shared-Data-Servies/shared-data.service";

@Component({
  selector: 'app-letter-of-credit-export-lc',
  templateUrl: './letter-of-credit-export-lc.component.html',
  styleUrls: ['./letter-of-credit-export-lc.component.scss']
})
export class LetterOfCreditExportLCComponent implements OnInit {

  @ViewChild('epltable', {static: false}) epltable: ElementRef;
  public item: any;
  public item1 = [];
  public viewData: any;
  public closeResult: string;
  public optionsVisibility: any = [];
  public pipoData: any;
  public id: any;

  constructor(
    private documentService: DocumentService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private sharedData: SharedDataService
  ) {
  }

  ngOnInit(): void {
    this.documentService.getLetterLC().subscribe(
      (res: any) => {
        console.log('Data fetched successfully', res);
        this.item = res.data;
        for (let value of this.item) {
          if (value['file'] == 'export') {
            this.item1.push(value);
            console.log("awwww", this.item1)
            // for(let value1 of this.item2){
            //   const newVal = { ...this.item2 };
            //   newVal['pipo1'] = value1
            //   this.item1.push(newVal)

          }

        }
        // for (let value of this.item) {
        //   for(let value1 of value.pipo){
        //     const newVal = { ...value };
        //         newVal['pipo1'] = value1
        //         this.item1.push(newVal)
        //       }
        // }
      },
      (err) => console.log(err)
    );

  }

  getPipoNumbers(data) {
    return data.pipo.map((x) => {
      return x.pi_poNo;
    });
  }

  openLetterOfCredit(content) {
    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
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

  viewLC(a) {

    this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
      a['doc']
    );
  }

  letterOfCredit() {
    console.log('upload');
    this.sharedData.changeretunurl('home/letterofcredit-lc')
    this.router.navigate(['home/upload', {file: 'export', document: 'lcCopy'}]);
  }

  toSave(data, index) {
    this.optionsVisibility[index] = false;
    console.log(data);
    this.documentService.updateLetterLC(data, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('LetterLC Row Is Updated Successfully.');

      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        console.log('error');
      }
    );


  }

  toEdit(index) {
    this.optionsVisibility[index] = true;
    this.toastr.warning('LetterLC Row Is In Edit Mode');
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'LetterOfCredit.xlsx');
  }
}
