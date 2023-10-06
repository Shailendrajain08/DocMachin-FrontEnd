import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pipo',
  templateUrl: './view-pipo.component.html',
  styleUrls: ['./view-pipo.component.scss']
})
export class ViewPipoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
   //hiding info box
   filtervisible:boolean = false
   startDate: any = '';
   endDate: any = '';
  

  openDoc(a) {
    console.log(a);
    if (a == 'Advance Payment') {

    }
    // else if (a == 'Direct Import') {
    //   console.log('hello')
    //   this.router.navigate(['home/direct-import-payment', {
    //     file: this.pipoData.pi_poNo, bene: this.pipoData.benneName, amount: this.pipoData.amount
    //   }]);
    // }
    else if (a == 'Collection Bill') {

    } else if (a == 'packing Credit Request') {
      //this.router.navigate(['home/packingCreditRequest']);
    } else if (a == 'Letter of Credit') {
      // if (this.pipoData.lcIssuance && this.pipoData.lcIssuance1) {
      //   this.buttonToggle1 = !this.buttonToggle1
      //   console.log('dhhh')

     
    }

  }


}
