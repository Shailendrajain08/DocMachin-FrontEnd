import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {DocumentService} from 'src/app/service/document.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from './../../service/user.service'
import * as xlsx from 'xlsx';
import {Router} from '@angular/router';
import {SharedDataService} from "../shared-Data-Servies/shared-data.service";
import * as _ from 'lodash';
@Component({
  selector: 'app-try-party-agreements',
  templateUrl: './try-party-agreements.component.html',
  styleUrls: ['./try-party-agreements.component.scss']
})
export class TryPartyAgreementsComponent implements OnInit {

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
    this.documentService.getThird().subscribe(
      (res: any) => {
        console.log('Data fetched successfully', res);
        this.item = res.data;
        for (let value of this.item) {
          if (value['file'] == 'export') {
            this.item1.push(value);
          }
        }
      },
      (err) => console.log(err)
    );

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

  getPipoNumbers(data) {
    return data.pipo.map((x) => {
      return x.pi_poNo;
    });
  }

  viewLC(a) {

    this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
      a['doc']
    );
  }

  toSave(data, index) {
    this.optionsVisibility[index] = false;
    let document:any = {
      ..._.cloneDeep(data)
    };
    delete document.pipo;
    this.documentService.updateThird(document, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('Tri-Party Agreement Row Is Updated Successfully.');

      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        console.log('error');
      }
    );


  }

  triParty() {
    this.sharedData.changeretunurl('home/try-party')
    this.router.navigate(['home/upload', {file: 'export', document: 'tryPartyAgreement'}]);

  }

  toEdit(index) {
    this.optionsVisibility[index] = true;
    this.toastr.warning('Tri-Party Agreement Row Is In Edit Mode');
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Tri-Party.xlsx');
  }
}
