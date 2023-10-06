import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/service/document.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edpms-recon-table',
  templateUrl: './edpms-recon-table.component.html',
  styleUrls: ['./edpms-recon-table.component.scss']
})
export class EdpmsReconTableComponent implements OnInit {

  masterTeam;
  bankAccounts = [];
  bankSelection = "";
  edpmsData;
  constructor(private userService: UserService, private documentService: DocumentService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getTeam()
      .subscribe((res: any) => {
        this.masterTeam = res?.data[0]?.bankDetails;
        this.masterTeam.forEach( acc => this.bankAccounts.push(acc?.bank));
        console.log('banks:', this.bankAccounts);
      }, err => {
        console.log(err);
       });

    this.documentService.getEDPMS().subscribe( (res: any) => {
      this.edpmsData = res?.data;
      console.log("Edpms Data", this.edpmsData)
    }, err => {
      console.log(err)
    });
  }

  chooseBank() {
    if(this.bankSelection && this.bankSelection !== "") {
      console.log(this.bankSelection, ' is selected');
    }
  }

  actionEvent(act, sbNo) {
    if(act === 'Upload Documents') {
      this.router.navigateByUrl('/home/upload;file=export;document=pipo');
    } else if (act === 'Create Documents') {
      this.router.navigate(['/home/bill-lodgement', {sbNo: sbNo}]);
    }
  }

  openNew(){
    this.router.navigateByUrl('/home/edpms-recon');
  }
}
