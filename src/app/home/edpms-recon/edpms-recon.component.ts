import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { timer } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConfig } from 'src/app/app.config';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edpms-recon',
  templateUrl: './edpms-recon.component.html',
  styleUrls: ['./edpms-recon.component.scss']
})
export class EdpmsReconComponent implements OnInit {

  public uploading = false;
  public uploaded = false;
  config3: DropzoneConfigInterface;
  authToken: string;
  headers: any;
  documentType = '';
  public benneDetail: any = [];
  public buyerDetail: any = [];
  api_base: any
  public size;
  width: any = 0;

  masterTeam;
  masterSB;
  masterIR;
  masterPIPO;
  masterExcelData;
  bankAccounts = [];
  bankSelection = "";
  disableUpload = true;
  applicant;
  blMaster;
  tasksMaster;

  constructor(
    private userService: UserService,
    public appconfig: AppConfig,
    public documentService: DocumentService,
    public router: Router
  ) {
    this.api_base = appconfig.apiUrl;
    this.loadFromLocalStorage();
    this.headers = {
      Authorization: this.authToken,
    };
    this.config3 = {
      url: `${this.api_base}/documents/uploadFile3`,
      method: `POST`,
      maxFiles: 1,
      maxFilesize: 5,
      addRemoveLinks: true,
      headers: this.headers,
      timeout: 820000,
      // autoProcessQueue: false,
      dictDefaultMessage: "Drag a document here",
      acceptedFiles:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      previewTemplate:
        '<div  class="dz-preview dz-file-preview" style="text-align: right; margin-right:3px;">\n <div class="dz-image" style="text-align: right; margin-right:3px;"> <img data-dz-thumbnail /></div>\n <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <i style="color: red; text-align: center;font-size: 30px;" class="fa fa-exclamation-circle"></i>\n  </div>\n</div>',
    };
  }

  public loadFromLocalStorage() {
    const token = localStorage.getItem("token");
    this.authToken = token;
    return this.authToken;
  }

  async getUserID() {
    const data: any = await this.userService.getUserDetail();
    this.applicant = data.result?.companyId;
  }

  ngOnInit(): void {
    this.userService.getTeam()
      .subscribe((res: any) => {
        this.masterTeam = res?.data[0]?.bankDetails;
        this.masterTeam.forEach( acc => this.bankAccounts.push(acc?.bank));
        console.log('banks:', this.bankAccounts);
      }, err => {
        console.log(err);
       });

    this.getUserID();
    this.documentService.getBlcopyref().subscribe( (res: any) => {
      this.blMaster = res?.data;
    }, err => {
      console.log(err)
    })

    this.documentService.getAllExport("hhh").subscribe(
      (res: any) => {
        this.tasksMaster = res?.data;
        console.log('tasksMaster:', this.tasksMaster);
      },
      (err) => console.log(err)
    );

    this.documentService.getMaster(1).subscribe(
      (res: any) => {
        this.masterSB = res?.data;
        // console.log('getMaster:', res);
        console.log("this.masterSB",this.masterSB)
      }, (err: any) => {
        console.log(err);
       });
    this.documentService.getPipo().subscribe(
      (res: any) => {
        this.masterPIPO = res?.data;
        console.log('getPipo:', res);
      }, err => {
        console.log(err);
       });
    this.documentService.getIrAdvice('').subscribe(
      (res: any) => {
        this.masterIR = res?.data;
        console.log('getIrAdvice:', res);
      }, err => {
        console.log(err);
      });
  }

  chooseBank() {
    if(this.bankSelection && this.bankSelection !== "") {
      this.disableUpload = false;
    } else {
      this.disableUpload = true;
    }
  }


  fileInputClick = (event) => {
    // Open file dialog
    if (this.disableUpload) {
      return true;
    }
    // Do not open file dialog
    else {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }

  saveData() {
    this.documentService.createEDPMS(this.preparePayload()).subscribe( (res: any) => {
      console.log('create edpms res: ', res);
      this.router.navigateByUrl('/home/edpms-recon-table');
    }, err => {
      console.log('create EDPMS error: ', err)
    })
  }


  preparePayload() {
    let payload = [];
    this.masterExcelData.forEach( (item:any) => {
      const tempObject = {
        userId: this.applicant,
        bank: this.bankSelection,
        sbNo: item['Shipping Bill No'],
        sbDate: new Date((item['Shipping Bill Date'] - 25569) * 24 * 60 * 60 * 1000),
        adCode: item['AD Code'],
        portCode: item['Port Code'],
        edpmsStatus: item['STATUS'],
        adRefNo: item['adBillNo'],
        sbAmount: item['sbAmount'],
        sbBalanceAmount: this.getSBbalanceAmount(item['pipo'], item['sbAmount']),
        sbCurrency: item['sbCurrency'],
        statusMeaning: this.getStatusMeaning(item['STATUS']),
        systemStatus: this.getSystemStatus(item['systemStatus'], item['pipo'], item['sbAmount'], item['Shipping Bill No']),
        docAvailable: item['systemStatus'] === 'Available' ? true : false,
        action: this.getAction(item['systemStatus']),
      };
      payload.push(tempObject);
    });
    return payload
  }

  getSystemStatus(status, pipo, sbAmount, sbNo) {
    if (!(status === 'Available')) {
      return 'DOC NOT AVAILABLE IN SYSTEM'
    } else if (this.getSBbalanceAmount(pipo, sbAmount) > 0) {
      return 'PARTIALLY REALISED'
    } else if(this.checkIfBLDone(pipo)) {
      return 'SUBMITTED & BANK REF NO. RECEIVED'
    } else if(this.checkifDownloaded(sbNo)) {
      return 'SUBMITTED BUT BANK REF NOT RECEIVED'
    } else {
      return 'NOT SUBMITTED TO BANK'
    }
  }

  checkifDownloaded(sbNo) {
    if(this.tasksMaster?.some((task: any) => task?.task?.some((t: any) => t?.sbNumbers?.contains(sbNo)))) {
      return true
    } else {
      return false
    }
  }

  checkIfBLDone(pipo) {
    if(this.blMaster.some((bl: any) => bl?.pipo?.contains(pipo))) {
      return true
    } else {
      return false
    }
  }

  getAction(status) {
    let actionStatus = [];
    if(!(status === 'Available')) {
      actionStatus.push('Upload Documents')
    } else {
      actionStatus.push('Create Documents', 'Netoff/Setoff', 'ETX/Writeoff')
    }
    return actionStatus
  }

  getSBbalanceAmount(pipo, total) {
    let paidAmount = 0;
    this.masterIR.forEach( (ir: any) => {
      if(pipo === ir?.pipo[0]) {
        paidAmount = paidAmount + parseInt(ir?.amount, 10)
      }
    });
    return parseInt(total, 10) - paidAmount
  }

  getStatusMeaning(status) {
    if (status === 'PARTIALLY_PAID') {
      return 'Lodgement done but partially realised'
    } else if (status === 'PENDING_AD_ACK') {
      return 'Lodgement not done'
    } else if (status === 'PENDING_PAYMENT') {
      return 'Lodgement done'
    } else {
      return 'EDPMS Status is not clear'
    }
  }

  public onUploadError(args: any): void {
    this.uploading = false;
    console.log("onUploadError:", args, args[1].message);
  }

  public onUploadInit(args: any): void {
    console.log("onUploadInit:", args);
  }

  public onUploadSuccess(args: any) {
    this.uploading = false;
    this.uploaded = true;
    console.log("onUploadSuccess ARGS", args);
    this.masterExcelData = args[1].data;
    console.log("onUploadSuccess DATA", this.masterExcelData);
  }

  compareEDPMS() {
    this.gatherSBdata();
    this.saveData();
  }

  gatherSBdata() {
    this.masterExcelData.forEach(( data, i ) => {
      var index = -1;
      for (let j =0; j< this.masterSB.length; j++) {
        if (this.masterSB[j] && this.masterSB[j].sbno && this.masterSB[j].sbno ==  data['Shipping Bill No']) {
          index = j;
          break;
        }
      }
      // const index = this.masterSB.findIndex( sb => sb?.sbno === data['Shipping Bill No']);
      console.log("index:", index);
      if(index !== -1) {
        this.masterExcelData[i]['systemStatus'] = 'Available';
        this.masterExcelData[i]['sbAmount'] = this.masterSB[index]?.fobValue;
        this.masterExcelData[i]['sbCurrency'] = this.masterSB[index]?.fobCurrency;
        this.masterExcelData[i]['adBillNo'] = this.masterSB[index]?.adBillNo;
        this.masterExcelData[i]['pipo'] = this.masterSB[index]?.pipo[0];
      } else {
        this.masterExcelData[i]['systemStatus'] = 'NOT_AVAILABLE';
      }
    });
    console.log('this.masterExcelData', this.masterExcelData);
  }

  public submit(args: any) {
      this.uploading = true;
      console.log('submit: ', args);
      this.size = this.formatBytes(args[0].size);
      //document.getElementById("uploadError").style.display = "none";
      this.runProgressBar(args[0].size);
  }

  public formatBytes(bytes) {
    if (bytes < 1024) {
      return bytes + " Bytes";
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(3) + " KB";
    } else if (bytes < 1073741824) {
      return (bytes / 1048576).toFixed(3) + " MB";
    } else {
      return (bytes / 1073741824).toFixed(3) + " GB";
    }
  }


  runProgressBar(value) {
    console.log(value / 1500);
    timer(0, value / 2500)
      .pipe(takeWhile(() => this.isWidthWithinLimit()))
      .subscribe(() => {
        this.width = this.width + 1;
      });

    this.userService.getBene(1).subscribe(
      (res: any) => {
        (this.benneDetail = res.data)
      },
      (err) => console.log("Error", err)
    );

    this.userService.getBuyer(1).subscribe(
      (res: any) => {
        (this.buyerDetail = res.data)
      },
      (err) => console.log("Error", err)
    );
  }


  isWidthWithinLimit() {
    if (this.width === 100) {
      return false;
    } else {
      return true;
    }
  }
}
