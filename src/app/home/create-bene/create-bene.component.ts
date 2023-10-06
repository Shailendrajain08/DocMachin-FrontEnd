import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-bene',
  templateUrl: './create-bene.component.html',
  styleUrls: ['../../../sass/application.scss', './create-bene.component.scss']
})
export class CreateBeneComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router,) { }

  ngOnInit(): void {
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
  }

  onSubmit() {
    this.userService.creatBene(this.loginForm.value)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data)
          this.router.navigate(['/home/manage-customer']);

        },
        error => {
          console.log("error")
        });
  }

}
