import { UserService } from "./../../../service/user.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { DocumentService } from "../../../service/document.service";
import { FormGroup, FormControl } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-inward-remittance-boe',
  templateUrl: './inward-remittance-boe.component.html',
  styleUrls: ["../../../../sass/application.scss", './inward-remittance-boe.component.scss']
})
export class InwardRemittanceBoeComponent implements OnInit, OnDestroy {
  item: any;
  item2: any = [];


  public data1;
  public data2;
  public data3;
  public contentDataURL1;
  public contentDataURL2;
  public contentDataURL3;
  public applicant: any = [];
  public benneDetail: any = [];
  public submitted = false;
  data5: any;
  data6: any;
  data4: any;
  id: any;
  doc: any;
  doc1: any;
  done: boolean;
  item3: any;
  amount: any;
  words: any;
  pipoValue: any = [];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private userService: UserService,
    private router: Router
  ) {
    router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === "popstate") {
        // Perform actions
        console.log("Pressed Back");
      }
    });
  }

  newTask = {
    boeNumber: "",
    boeDetails: [],
    beneDetail: [],
    completed: false,
    url1: "",
    doc: "",
    file: "boe",
    bank: "yesBank",
    ca: false
  };

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['boeNumber'];
    this.amount = this.route.snapshot.params['amount']
    console.log(this.route.snapshot.params['pipo'])
    this.words = this.route.snapshot.params['pipo']
    console.log(this.words)
    console.log(this.id)
    this.pipoValue = this.words.split(',')
    console.log(this.words[0])
    console.log(this.pipoValue)
    this.id = this.pipoValue[0]
    await this.getUserDetail();
    this.getPipoDetaile();
    console.log("DRAFT ", this.item2);
    console.log("DRAFT ", this.newTask);
    this.userService.getTeam()
      .subscribe(
        data => {
          console.log("king123")
          console.log(data['data'][0])
          this.item3 = data['data'][0]
          console.log(this.item3)
          //this.letterHead = data['data'][0].file[0]["Letter Head"]
          //this.router.navigate(['/addMember'], { queryParams: { id: data['data']._id } })

        },
        error => {
          console.log("error")
        });
  }

  getPipoDetaile() {
    this.documentService.getBoeByBoe(this.id)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data)
          console.log(data['data'])
          this.item2 = data['data']
          this.doc = data['data']['doc']
          this.doc1 = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.doc
          );
          this.getBeneDetaile()
          //this.router.navigate(['/login'], { queryParams: { registered: true }});
        },
        error => {
          console.log("error")
        });
    console.log("pipo", this.item2)
  }

  async getUserDetail() {
    const data: any = await this.userService.getUserDetail();
    this.applicant = data.result;
    console.log("applicant", this.applicant)
  }

  async getBeneDetaile() {
    console.log("inside")
    console.log(this.item2)
    const data: any = await this.userService.getBeneByName(
      this.item2.benneName
    );
    this.benneDetail = data.data;
    this.newTask.boeNumber = this.item2.boeNumber;
    this.newTask.boeDetails = this.item2;
    this.newTask.beneDetail = this.benneDetail;
    this.newTask.completed = false;
    this.newTask.doc = this.doc;
    console.log("bene", this.benneDetail)
  }

  public downloadPDF() {
    console.log("DATA", this.data4)
    const link: any = document.createElement("a");
    link.id = "dwnldLnk";
    link.style = "display:none;";
    document.body.appendChild(link);
    const dlnk: any = document.getElementById("dwnldLnk");
    dlnk.href = this.data4.file;
    console.log(dlnk)
    console.log(dlnk.href)
    dlnk.download = this.data4.filename;

    dlnk.click();
    //this.submitTask()
    // this.downloading = false;
    // this.backupClicked = false;
  }


  exportAsPDF(div_id) {
    const height =
      Math.round($("#mainId").outerHeight() * 0.0104166667 * 10) / 10;
    console.log($("#mainId").html());
    this.documentService
      .getPDF({
        data: $("#mainId").html(),
        filename: "Final Report",
        format: {
          paperWidth: 7,
          paperHeight: height + 5,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        template:
          "./app/modules/pdfGenerationModule/pdfTemplate/finalreport.ejs",
      })
      .subscribe((data) => {
        if (data && data.success) {
          console.log(data);
          this.data4 = data
          this.data5 = data.file.replace('application/octet-stream', 'application/pdf')
          console.log(this.data5)
          this.data6 = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.data5
          );
          this.newTask.url1 = this.data5;
          this.done = true;
          //this.downloadPDF(data);
        }
      });
  }

  edit() {
    this.done = false;
  }

  async submitTask() {
    this.newTask.completed = true;
    console.log(this.newTask);

    console.log("shshsh")
    if (this.documentService.draft === false) {
      console.log("shshsh")
      this.documentService.addTask(this.newTask).subscribe(
        (res) => {
          console.log("Transaction Saved");

          this.submitted = true;
          this.userService.updateManyPipo(this.pipoValue, 'directImport', this.newTask.url1)
            .subscribe(
              data => {
                console.log("king123")
                console.log(data)
                this.router.navigate(["/home/direct-import-payment"]);
              },
              error => {
                // this.toastr.error('Invalid inputs, please check!');
                console.log("error")
              });
          //this.router.navigate(["/home/direct-import-payment"]);
        },
        (err) => console.log("Error saving the transaction")
      );
    } else if (this.documentService.draft === true) {
      console.log("hhhh")
      this.documentService.completeTask({ _id: this.documentService.task._id, task: this.newTask }).subscribe(
        (res) => {
          console.log("COMPLETED")
          this.userService.updateManyPipo(this.pipoValue, 'directImport', this.newTask.url1)
            .subscribe(
              data => {
                console.log("king123")
                console.log(data)
                this.router.navigate(["/home/direct-import-payment"]);
              },
              error => {
                // this.toastr.error('Invalid inputs, please check!');
                console.log("error")
              });
          //this.router.navigate(["/home/direct-import-payment"])
        },
        (err) => console.log("ERROR")
      );
    }

  }

  ngOnDestroy() {
    console.log(this.newTask)
    console.log(this.documentService.draft)
    console.log(this.submitted)

    if (this.documentService.draft === false && this.submitted === false) {
      this.documentService.addTask(this.newTask).subscribe(
        (res) => {
          console.log("Saved as draft");
          //window.alert("Transcation Saved as draft");
        },
        (err) => console.log("Cant save as draft")
      );
    }


  }

}