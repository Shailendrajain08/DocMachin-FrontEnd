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
import * as xlsx from 'xlsx';
import {DocumentService} from 'src/app/service/document.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from './../../service/user.service';
import {SharedDataService} from "../shared-Data-Servies/shared-data.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-insurance-document',
  templateUrl: './insurance-document.component.html',
  styleUrls: ['./insurance-document.component.scss']
})
export class InsuranceDocumentComponent implements OnInit {
  @ViewChild('insurance', {static: false}) insurance: ElementRef;
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
    this.documentService.getInsurance().subscribe(
      (res: any) => {
        console.log('Data fetched successfully', res);
        this.item = res.data;
        for (let value of this.item) {
          if (value['file'] == 'export') {

            this.item1.push(value);
            console.log("awwww", this.item1);
          }

        }
      },
      (err) => console.log(err)
    );
  }

  openInsuranceDoc(content) {
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

  viewID(a) {

    this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
      a['doc']
    );
  }

  toSave(data, index) {
    this.optionsVisibility[index] = false;
    console.log(data);
    this.documentService.updateInsurance(data, data._id).subscribe(
      (data) => {
        console.log('king123');
        this.toastr.success('Insurance Document Row Is Updated Successfully.');
        console.log(data)
      },
      (error) => {
        // this.toastr.error('Invalid inputs, please check!');
        console.log('error');
      }
    );


  }

  newInsurance() {
    console.log('upload');
    this.sharedData.changeretunurl('home/insurance-document')
    this.router.navigate(['home/upload', {file: 'export', document: 'insuranceCopy'}]);
  }

  toEdit(index) {
    this.optionsVisibility[index] = true;
    this.toastr.warning('Insurance Document Row Is In Edit Mode');
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.insurance.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'importInsurance.xlsx');
  }

}
