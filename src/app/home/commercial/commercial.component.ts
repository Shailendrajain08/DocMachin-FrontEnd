import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {SharedDataService} from "../shared-Data-Servies/shared-data.service";
import * as xlsx from 'xlsx';
import {Router} from '@angular/router';
import {DocumentService} from 'src/app/service/document.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from './../../service/user.service';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss']
})
export class CommercialComponent implements OnInit {
  @ViewChild('commercial', {static: false}) commercial: ElementRef;
  public item: any = [];
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
    this.documentService.getCommercial().subscribe(
      (res: any) => {
        console.log('HEre Responsesssssssss', res);
        for (let value of res.data) {
          if (value['file'] == 'export') {

            this.item.push(value);
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
      a['commercialDoc']
    );
  }

  toSave(data, index) {
    this.optionsVisibility[index] = false;
    console.log(data);
    this.documentService.updateCommercial(data, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('Commercial Document updated successfully.');

      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        console.log('error');
      }
    );
  }

  newDest() {
    this.sharedData.changeretunurl('home/commercial')
    this.router.navigate(['home/upload', {file: 'export', document: 'commercial'}]);
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.commercial.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Commercial.xlsx');
  }

  toEdit(index) {
    this.optionsVisibility[index] = true;
    this.toastr.warning('Commercial Document Is In Edit Mode');
  }

}
