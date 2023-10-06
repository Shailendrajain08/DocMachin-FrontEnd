import { Component, OnInit } from "@angular/core";
import { UserService } from "../../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-buyer',
  templateUrl: './edit-buyer.component.html',
  styleUrls: ["../../../sass/application.scss", './edit-buyer.component.scss']
})
export class EditBuyerComponent implements OnInit {
  item: any;
  item1: any;
  id: any;
  is: any;
  shippingForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    this.userService.getSingleBuyer(this.id).subscribe(
      (data) => {
        console.log("king123");
        console.log(data["data"]);
        this.item1 = data["data"];
        this.item = this.item1[0];
        this.is = true;
        //this.router.navigate(['/login'], { queryParams: { registered: true }});
      },
      (error) => {
        console.log("error");
      }
    );
  }
  onSubmit(values) {
    console.log("FORM VALUE", values.form.value);
    this.userService.updateBuyer(this.id, values.form.value).subscribe(
      (data) => {
        console.log("king123");
        console.log(data["data"]);
        this.item1 = data["data"];
        this.item = this.item1[0];
        this.is = true;
        this.router.navigate(["/home/manage-customer/export"], {
          queryParams: { registered: true },
        });
      },
      (error) => {
        console.log("error");
      }
    );
  }
}
