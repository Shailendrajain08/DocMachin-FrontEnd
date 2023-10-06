import { UserService } from "./../../service/user.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentService } from "../../service/document.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-power-admin',
  templateUrl: './power-admin.component.html',
  styleUrls: ['../../../sass/application.scss', './power-admin.component.scss']
})
export class PowerAdminComponent implements OnInit {
  item2: any;
  val: Object;
  value: any = [];
  file: any;
  approved: boolean;
  pending: boolean;
  declined: boolean;

  constructor(
    private documentService: DocumentService,
    public router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.val = await this.userService.getAllUser();
    console.log(this.val);


    this.route.params.subscribe(async params => {
      this.val = await this.userService.getAllUser();
      console.log(this.val);
      this.file = this.route.snapshot.params['file'];
      console.log("hello")
      if (this.file === 'approved') {
        console.log("hello1")
        this.approved = true;
        this.pending = false;
        this.declined = false
        let x: any = [];
        for (let value of this.val['data']) {
          if (value['emailId'] != 'tramsdocmachine@gmail.com' && value['emailId'] != 'docmachinetec@gmail.com' && value['emailId'] != 'fintech.innovations2021@gmail.com') {
            if (value['verified'] == 'yes') {
              x.push(value)
            }
          }
        }
        this.value = x

      }
      else if (this.file === 'pending') {
        this.approved = false;
        this.pending = true;
        this.declined = false
        console.log("hello2")
        let x: any = [];
        for (let value of this.val['data']) {
          if (value['emailId'] != 'tramsdocmachine@gmail.com' && value['emailId'] != 'docmachinetec@gmail.com' && value['emailId'] != 'fintech.innovations2021@gmail.com') {
            if (value['verified'] == 'no') {
              x.push(value)
            }
          }
        }
        console.log(this.value)
        this.value = x
      }
      else if (this.file === 'declined') {
        this.approved = false;
        this.pending = false;
        this.declined = true
        console.log("hello2")
        let x: any = [];
        for (let value of this.val['data']) {
          if (value['emailId'] != 'tramsdocmachine@gmail.com' && value['emailId'] != 'docmachinetec@gmail.com' && value['emailId'] != 'fintech.innovations2021@gmail.com') {
            if (value['verified'] == 'declined') {
              x.push(value)
            }
          }
        }
        console.log(this.value)
        this.value = x
      }

    });

    for (let value of this.val['data']) {
      if (value['emailId'] != 'tramsdocmachine@gmail.com' && value['emailId'] != 'docmachinetec@gmail.com' && value['emailId'] != 'fintech.innovations2021@gmail.com') {
        if (value['verified'] == 'no') {
          this.value.push(value)
        }
      }
    }
  }
  submit(id, i, emailId) {
    console.log(id)
    let x;
    if (this.approved) {
      x = 'no'
    }
    else if (this.pending) {
      x = 'yes'
    }
    else if (this.declined) {
      x = 'yes'
    }
    this.userService.updateOneUser(id, x, emailId)
      .subscribe(
        async data => {
          console.log("king123")
          console.log(data)
          this.value.splice(i, 1)
          //this.message = data['message']
          if (this.approved) {
            this.toastr.success('Revoked Successfully');
          }
          else if (this.pending || this.declined) {
            this.toastr.success('Approved Successfully');
          }

        },
        error => {
          console.log("error")
        });
  }

  decline(id, i, emailId) {
    console.log(id)

    this.userService.updateOneUser(id, "declined", emailId)
      .subscribe(
        async data => {
          console.log("king123")
          console.log(data)
          this.value.splice(i, 1)
          //this.message = data['message']
          this.toastr.success('Account declined successfully');

        },
        error => {
          console.log("error")
        });
  }

  delete(id, i) {
    console.log(id)

    this.userService.deleteUser(id)
      .subscribe(
        async data => {
          console.log("king123")
          console.log(data)
          this.value.splice(i, 1)
          //this.message = data['message']
          this.toastr.success('Account Deleted');

        },
        error => {
          console.log("error")
        });
  }
}