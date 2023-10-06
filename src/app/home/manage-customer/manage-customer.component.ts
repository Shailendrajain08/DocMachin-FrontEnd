import { UserService } from "./../../service/user.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentService } from "../../service/document.service";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-manage-customer",
  templateUrl: "./manage-customer.component.html",
  styleUrls: [
    "../../../sass/application.scss",
    "./manage-customer.component.scss",
  ],
})
export class ManageCustomerComponent implements OnInit {
  item2: any;
  loginForm: FormGroup;
  buyerForm: FormGroup;
  closeResult: string;
  file: any;

  constructor(
    private documentService: DocumentService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.file = this.route.snapshot.params['id'];
      if (this.file === "import") {
        this.userService.getBene(1).subscribe(
          (data) => {
            console.log("king123");
            console.log(data["data"]);
            this.item2 = data["data"];
            //this.router.navigate(['/login'], { queryParams: { registered: true }});
          },
          (error) => {
            console.log("errrrror");
          }
        );
      }
      else if (this.file === "export") {
        this.userService.getBuyer(1).subscribe(
          (data) => {
            console.log("king123");
            console.log(data["data"]);
            this.item2 = data["data"];
            //this.router.navigate(['/login'], { queryParams: { registered: true }});
          },
          (error) => {
            console.log("errrrror");
          }
        );
      }
    });
    this.loginForm = this.formBuilder.group({
      beneName: ['', Validators.required],
      beneAdrs: ['', Validators.required],
      beneBankName: ['', Validators.required],
      beneAccNo: ['', Validators.required],
      beneBankAdress: ['', Validators.required],
      beneBankSwiftCode: ['', Validators.required],
      sortCode: ['', Validators.required],
      iban: ['', Validators.required],
      interBankSwiftCode: ['', Validators.required],
      interBankName: ['', Validators.required],
    });

    this.buyerForm = this.formBuilder.group({
      buyerName: ['', Validators.required],
      buyerAdrs: ['', Validators.required],
    });

  }

  onSubmit() {
    this.userService.creatBene(this.loginForm.value)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data)
          this.userService.getBene(1).subscribe(
            (res: any) => {
              this.item2 = res["data"];
              this.modalService.dismissAll();
            },
            (err) => console.log("Error", err)
          );

        },
        error => {
          console.log("error")
        });
  }

  onSubmitBuyer() {
    this.userService.creatBuyer(this.buyerForm.value)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data)
          this.userService.getBuyer(1).subscribe(
            (res: any) => {
              this.item2 = res["data"];
              this.modalService.dismissAll();
            },
            (err) => console.log("Error", err)
          );

        },
        error => {
          console.log("error")
        });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open1(content1) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    console.log('ddhdhdhh')
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
