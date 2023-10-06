import { DocumentService } from "../../../service/document.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-completed-export',
  templateUrl: './completed-export.component.html',
  styleUrls: ['./completed-export.component.scss']
})
export class CompletedExportComponent implements OnInit {

  public item1;
  public item2;
  public user;
  public selectedRow;
  public showInvoice;
  public tableWidth;
  public export = false;
  public import = false;
  public lastIndex;
  public showPdf = false;
  public greaterAmount = 0;
  public selectedDoc = "";
  public allTransactions: any = [];
  Ax1: boolean;
  Ax2: boolean;
  step1: any;
  myRadio: any;
  url: any;
  file: any;
  pending: boolean;
  completed: boolean;
  all: boolean;

  data: any;
  id: any;
  taskArray: any;
  c: any;
  src: any;
  docArray1: any = [];
  docArray2: any = [];
  docArray3: any = [];
  pipoArray: any = [];
  tryArray: any = [];
  sbArray: any = [];
  constructor(
    public documentService: DocumentService, private route: ActivatedRoute, private router: Router,
    private sanitizer: DomSanitizer,) {


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.documentService.getOneExportTask({ id: this.id }).subscribe(
      (res: any) => {

        console.log("ALL TRANSACTIONS", res);
        this.data = res.data[0]
        this.taskArray = res.data[0].task
        console.log(this.data);
        console.log(this.taskArray)

        this.c = this.taskArray[0].purposeCode
        let i = 0
        for (let item of this.taskArray) {
          if (item.generateDoc1) {
            console.log('hshshsh')
            this.docArray1[i] = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.taskArray[i].generateDoc1.changingThisBreaksApplicationSecurity
            )
          }
          if (item.generateDoc2) {
            console.log('aaaa')
            this.docArray2[i] = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.taskArray[i].generateDoc2.changingThisBreaksApplicationSecurity
            )
          }
          if (item.generateDoc3) {
            console.log('aaaa')
            this.docArray3[i] = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.taskArray[i].generateDoc3.changingThisBreaksApplicationSecurity
            )
          }
          if (item.pipoUrls) {
            console.log('fff')
            let j = 0;
            let gene = []
            for (let value of item.pipoUrls) {
              gene.push(this.sanitizer.bypassSecurityTrustResourceUrl(
                value.changingThisBreaksApplicationSecurity
              ))
              j++
            }
            this.pipoArray[i] = gene
          }
          if (item.sbUrls) {
            let k = 0;
            let gene = []

            for (let value of item.sbUrls) {
              let r = value.changingThisBreaksApplicationSecurity
              gene.push(this.sanitizer.bypassSecurityTrustResourceUrl(r))
              k++
            }
            this.sbArray[i] = gene
          }
          if (item.tryUrls) {
            let h = 0;
            let gene = []
            for (let value of item.tryUrls) {
              gene.push(this.sanitizer.bypassSecurityTrustResourceUrl(
                value.changingThisBreaksApplicationSecurity
              ))
              h++
            }
            this.tryArray[i] = gene
          }
          i++
        }
        console.log(this.docArray1)
        console.log(this.docArray2)
      },
      (err) => console.log(err)
    );
  }

  tabClick(c, i) {
    this.c = c
  }



  clicked(data) {
    this.data = data
    console.log(data)
  }

  viewTask(data) {

  }


}