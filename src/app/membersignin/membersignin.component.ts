import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../service/user.service';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-membersignin',
  templateUrl: './membersignin.component.html',
  styleUrls: ['./membersignin.component.scss']
})
export class MembersigninComponent implements OnInit {
  resetForm: FormGroup;
  message: any;
  token: any;
  email: any;
  toggle: boolean;
  submitted: boolean;
  isDisabled: boolean;
  fullName: any;
  companyId: any;
  companyName: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.token = this.route.snapshot.params['id'];
    let val = jwt_decode.default(this.token);
    console.log(val)
    this.email = val['email'];
    this.fullName = val['name'];
    this.companyId = val['companyId'];
    this.companyName = val['companyName'];
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.resetForm.controls; }
  onSubmit() {
    this.submitted = true
    this.isDisabled = true;
    if (this.resetForm.invalid) {
      this.toastr.error('Invalid inputs, please check again!');
      this.isDisabled = false;
      return;
    }
    this.resetForm.value.role = 'member'
    this.resetForm.value.fullName = this.fullName
    this.resetForm.value.email = this.email
    this.resetForm.value.companyId = this.companyId
    this.resetForm.value.companyName = this.companyName
    this.resetForm.value.verified = 'yes'
    console.log(this.resetForm.value)
    this.userService.register(this.resetForm.value)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data)
          this.toastr.success('User Created Successful!');
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error => {
          this.isDisabled = false;
          console.log(error)
          if (error.error == 'Both password should be same') {
            this.toastr.error('Registration unsuccessful!, Both password should be same');
          }
          else if (error.error == 'Email ID already exist') {
            this.toastr.error('Registration unsuccessful!, Email already exist');
          }
          else {
            this.toastr.error('Registration unsuccessful!, please check the details');
          }

          console.log("error")
        });
  }

}
