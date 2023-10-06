import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../service/user.service';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  resetForm: FormGroup;
  message: any;
  token: any;
  email: any;
  toggle: boolean;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.token = this.route.snapshot.params['id'];
    let val = jwt_decode.default(this.token);
    console.log(val)
    this.email = val['_id'];

  }
  onSubmit() {

    console.log(this.token)
    if (true) {
      this.userService.updateEmail('a', this.email)
        .subscribe(
          data => {
            console.log("king123")
            console.log(data)
            if (data) {
              this.toggle = true;
              this.toastr.success('Email Verification done');
            }
            //this.message = data['message']
            //
          },
          error => {
            console.log("error")
          });
    }

  }

}
