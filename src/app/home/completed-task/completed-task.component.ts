import { UserService } from "./../../service/user.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { DocumentService } from "../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['../../../sass/application.scss', './completed-task.component.scss']
})
export class CompletedTaskComponent implements OnInit {
  id: any;
  url: any;
  data4: any;
  durl: any;
  data5: any;
  pipoUrl: any;
  url1: any;
  url2: any;
  item: any;
  data3: any;
  durl1: any;
  value1: any;
  value2: any;
  buyer: boolean;
  caDone1 = 'no'
  caUrl: any;

  constructor(private route: ActivatedRoute, private documentService: DocumentService, private sanitizer: DomSanitizer, public router: Router,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.documentService.getOneTask({ id: this.id }).subscribe(
      (res: any) => {

        console.log("ALL TRANSACTIONS", res);
        console.log("PIPO NO", res['task'][0]);
        this.item = res['task'][0]
        this.data3 = res['task'][0]['url1']
        this.data4 = res['task'][0]['url2']
        if (res['task'][0]['ca'] == true) {
          this.caDone1 = 'yes';
          this.caUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            res['task'][0]['caUrl']
          );
        }

        this.url1 = this.sanitizer.bypassSecurityTrustResourceUrl(
          res['task'][0]['url1']
        );

        this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(
          res['task'][0]['url2']
        );
        this.value1 = res['task'][0]['boeDetails'];
        this.value2 = res['task'][0]['pipoDetail'];
        console.log(this.value1)
        console.log(this.value2)
        if (res['task'][0]['pipoDetail'] === undefined && res['task'][0]['boeDetails'] && res['task'][0]['sbDetails'] === undefined) {
          console.log("shhshshsh888")

          this.data5 = res['task'][0]['boeDetails']['doc']
        }

        else if (res['task'][0]['boeDetails'] === undefined && res['task'][0]['pipoDetail'] && res['task'][0]['sbDetails'] === undefined) {
          console.log("shhshshsh888")

          this.data5 = res['task'][0]['pipoDetail']['doc']
        }
        else if (res['task'][0]['boeDetails'] === undefined && res['task'][0]['pipoDetail'] === undefined && res['task'][0]['sbDetails']) {
          console.log("shhshshsh888")

          this.data5 = res['task'][0]['sbDetails']['doc']
        }

        else if (res['task'][0]['pipoDetail'] === undefined && res['task'][0]['pipoDetail'] === undefined) {
          this.buyer = true;
          this.data5 = undefined;
        }

        console.log(this.data5)
        this.pipoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.data5
        );
      },
      (err) => console.log(err)
    );

  }

  public downloadPDF() {
    if (!this.data4) {
      this.durl = this.data3.replace('application/pdf', 'application/octet-stream')
      console.log("DATA")
      const link: any = document.createElement("a");
      link.id = "dwnldLnk";
      link.style = "display:none;";
      document.body.appendChild(link);
      const dlnk: any = document.getElementById("dwnldLnk");
      dlnk.href = this.durl;
      console.log(dlnk)
      console.log(dlnk.href)
      dlnk.download = "finalReport.pdf";
      dlnk.click();
    }
    else {
      this.durl = this.data3.replace('application/pdf', 'application/octet-stream')
      console.log("DATA")
      const link: any = document.createElement("a");
      link.id = "dwnldLnk";
      link.style = "display:none;";
      document.body.appendChild(link);
      const dlnk: any = document.getElementById("dwnldLnk");
      dlnk.href = this.durl;
      console.log(dlnk)
      console.log(dlnk.href)
      dlnk.download = "fwb.pdf";
      dlnk.click();

      this.durl1 = this.data4.replace('application/pdf', 'application/octet-stream')
      console.log("DATA")
      const link1: any = document.createElement("a");
      link1.id = "dwnldLnk";
      link1.style = "display:none;";
      document.body.appendChild(link1);
      const dlnk1: any = document.getElementById("dwnldLnk");
      dlnk1.href = this.durl1;
      dlnk1.download = "advanceRemitance.pdf";
      dlnk1.click();

    }
  }


  public done() {
    if (this.item.boeNumber) {
      this.router.navigateByUrl("/home/direct-import-payment");
    }
    else if (this.item.pi_poNo) {
      console.log(this.item.file)
      if (this.item.file == "advance") {
        this.router.navigateByUrl("/home/advance-outward-remittance");
      }
      else if (this.item.file == "lcSight") {
        this.router.navigate(['home/bill-under-collection', this.item.file]);
      }
      else if (this.item.file == "lcUsance") {
        this.router.navigate(['home/bill-under-collection', this.item.file]);
      }
      else if (this.item.file == "nonlcSight") {
        this.router.navigate(['home/bill-under-collection', this.item.file]);
      }
      else if (this.item.file == "nonlcUsance") {
        this.router.navigate(['home/bill-under-collection', this.item.file]);
      }
      else if (this.item.file == "inland" || this.item.file == "import") {
        this.router.navigate(['home/lc-isurance', this.item.file]);
      }

      else if (this.item.file == "buyerCredit") {
        this.router.navigate(['home/buyer-credit']);
      }
      else if (this.item.file == "fbgBuyer") {
        this.router.navigate(['home/fbg-waiver']);
      }
      else if (this.item.file.startsWith("S0") || this.item.file.startsWith("S1")) {
        this.router.navigate(['home/outward-remitance']);
      }
      else if (this.item.file.startsWith("P0") || this.item.file.startsWith("P1")) {
        this.router.navigate(['home/inwardRemmitance']);
      }
    }
    if (this.item.sbno) {
      this.router.navigateByUrl("/home/inwardRemmitance");
    }
  }

}
