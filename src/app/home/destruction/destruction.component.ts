import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedDataService } from "../shared-Data-Servies/shared-data.service";
import * as xlsx from 'xlsx';
import {Router}from '@angular/router';
import { DocumentService } from 'src/app/service/document.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'app-destruction',
  templateUrl: './destruction.component.html',
  styleUrls: ['./destruction.component.scss']
})
export class DestructionComponent implements OnInit {

  @ViewChild('destruction', { static: false }) destruction: ElementRef;
  public item = [];
  public viewData : any;
  public closeResult: string;
  public optionsVisibility: any = [];
  public pipoData: any;
  public id: any;

  constructor(
    private documentService : DocumentService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private sharedData : SharedDataService
  ) { }

  ngOnInit(): void {
    this.documentService.getDestruction().subscribe(
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

  openCreditNote(content){
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
  getPipoNumbers(data) {
    return data.pipo.map((x) => {return x.pi_poNo;});
  }
viewCN(a){

this.viewData = this.sanitizer.bypassSecurityTrustResourceUrl(
  a['doc']
);
}

toSave(data, index){
this.optionsVisibility[index] = false;
console.log(data);
this.documentService.updateDestruction(data, data._id ).subscribe(
  (data) => {
    console.log('king123');
    this.toastr.success('Destruction Certificate updated successfully.');

  },
  (error) => {
    // this.toastr.error('Invalid inputs, please check!');
    console.log('error');
  }
);
}

newDest(){
this.sharedData.changeretunurl('home/destruction')
this.router.navigate(['home/upload', { file: 'export', document: 'destruction' }]);
}

exportToExcel() {
const ws: xlsx.WorkSheet =
xlsx.utils.table_to_sheet(this.destruction.nativeElement);
const wb: xlsx.WorkBook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
xlsx.writeFile(wb, 'Destruction.xlsx');
}

toEdit(index){
this.optionsVisibility[index] = true;
this.toastr.warning('Destruction Certificate Is In Edit Mode');
}

}
