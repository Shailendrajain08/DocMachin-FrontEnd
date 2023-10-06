import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-add-pipo',
  templateUrl: './add-pipo.component.html',
  styleUrls: ['./add-pipo.component.scss']
})
export class AddPipoComponent implements OnInit {
  buyerDetail:any= []
  commodity:any=[]
  constructor(
    private userService: UserService,
  ) { 
    this.getDropdownData()
  }

  ngOnInit(): void {
  }
   //hiding info box
   filtervisible:boolean = false
   startDate: any = '';
   endDate: any = '';
   
   getDropdownData ()
   {

    this.userService.getTeam()
    .subscribe(
      data => {
        this.commodity = data['data'][0]['commodity']
        console.log(this.commodity)

      },
      error => {
        console.log("error")
      });
    this.userService.getBuyer(1).subscribe(
      (res: any) => {
        (this.buyerDetail = res.data),
          console.log("Benne Detail111", this.buyerDetail);
      },
      (err) => console.log("Error", err)
    );
   }

}
