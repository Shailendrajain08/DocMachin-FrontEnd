import {DocumentService} from 'src/app/service/document.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from './../../service/user.service'
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import * as xlsx from 'xlsx';
import {Router} from '@angular/router';
import {SharedDataService} from "../shared-Data-Servies/shared-data.service";


@Component({
  selector: 'app-debit-note',
  templateUrl: './debit-note.component.html',
  styleUrls: ['./debit-note.component.scss']
})
export class DebitNoteComponent implements OnInit {
  @ViewChild('debitnotes', {static: false}) debitnotes: ElementRef;
  public item: any;
  public item1 = [];
  public viewData: any;
  public closeResult: string;
  public optionsVisibility: any = [];
  public pipoData: any;
  public id: any;
  public item2: any;


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
    this.documentService.getDebit().subscribe(
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
      },
      (err) => console.log(err)
    );

  }

  getPipoNumbers(data) {
    return data.pipo.map((x) => {
      return x.pi_poNo;
    });
  }

  openDebitNote(content) {
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

  viewDN(a) {

    this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
      a['doc']
    );
  }

  toSave(data, index) {
    this.optionsVisibility[index] = false;
    console.log(data);
    this.documentService.updateDebit(data, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('Debit Note Row Is Updated Successfully.');

      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        console.log('error');
      }
    );


  }

  toEdit(index) {
    this.optionsVisibility[index] = true;
    this.toastr.warning('Debit Note Row Is In Edit Mode');
  }

  newDebit() {
    console.log('upload');
    this.sharedData.changeretunurl('home/debit-note')
    this.router.navigate(['home/upload', {file: 'export', document: 'debitNote'}]);
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.debitnotes.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'debitnotes.xlsx');
  }
}
