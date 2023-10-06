import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {DocumentService} from 'src/app/service/document.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from './../../service/user.service';
import * as xlsx from 'xlsx';
import {SharedDataService} from "../shared-Data-Servies/shared-data.service";
import {ActivatedRoute, Data, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-imports-credit-note',
  templateUrl: './imports-credit-note.component.html',
  styleUrls: ['./imports-credit-note.component.scss']
})
export class ImportsCreditNoteComponent implements OnInit {
  @ViewChild('creditnotes', {static: false}) creditnotes: ElementRef;
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
    private router: Router,
    private userService: UserService,
    private sharedData: SharedDataService
  ) {
  }

  ngOnInit(): void {
    this.documentService.getCredit().subscribe(
      (res: any) => {
        console.log('HEre Responsesssssssss', res);
        this.item = res.data;
        for (let value of this.item) {
          if (value['file'] == 'import') {

            this.item1.push(value);
            console.log("awwww", this.item1)
          }
        }
      },
      (err) => console.log(err)
    );
  }

  openCreditNote(content) {
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

  viewCN(a) {

    this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
      a['doc']
    );
  }

  toSave(data, index) {
    this.optionsVisibility[index] = false;
    console.log(data);
    this.documentService.updateCredit(data, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('PI/PO updated successfully.');

      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        console.log('error');
      }
    );


  }

  newCredit() {
    this.sharedData.changeretunurl('home/importCredit')
    this.router.navigate(['home/upload', {file: 'import', document: 'creditNote'}]);
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(this.creditnotes.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'creditnotes.xlsx');
  }

  toEdit(i) {
    this.optionsVisibility[i] = true;
    this.toastr.warning('PI/PO Is In Edit Mode');
  }
}
