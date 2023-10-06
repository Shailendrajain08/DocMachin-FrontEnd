import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})


export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  message: any;
  no: boolean;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router,) { }
  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });
  }
  onSubmit() {
    console.log(this.resetForm.value)
    this.userService.forgotpsw(this.resetForm.value)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data)
          this.message = data['message']
          this.no = false;
          // 
        },
        error => {
          this.no = true;
          this.message = null;
          console.log("error")
        });
  }

}