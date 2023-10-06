import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-pipo',
  templateUrl: './edit-pipo.component.html',
  styleUrls: ['./edit-pipo.component.scss']
})


export class EditPipoComponent implements OnInit {
   //hiding info box
   filtervisible:boolean = false
   startDate: any = '';
   endDate: any = '';
  constructor() { }

  ngOnInit(): void {
  }

}
