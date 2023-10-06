import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {
  password = 'password';
  password1 = 'password';
  show = false;
  show1 = false;
  isDisabled: boolean = false;
  isVisible: boolean = false;
  submitted = false;
  registerForm: FormGroup;
  closeResult: string;
  checked: boolean = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private toastr: ToastrService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.password = 'password';
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });



  }
  get f() { return this.registerForm.controls; }


  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
    console.log(this.show,"hi------");
    console.log(this.show1,"hiiii1----");
  }
  onClick1() {
    if (this.password1 === 'password') {
      this.password1 = 'text';
      this.show1 = true;
    } else {
      this.password1 = 'password';
      this.show1 = false;
    }
  }
  onSubmit() {

    if(this.checked){
      this.submitted = true
      this.isDisabled = true;
      if (this.registerForm.invalid) {
        this.toastr.error('Invalid inputs, please check again!');
        this.isDisabled = false;
        return;
      }
      this.registerForm.value.role = 'manager'
      this.registerForm.value.verified = 'no'
      console.log(this.registerForm.value)
      this.userService.register(this.registerForm.value)
        .subscribe(
          data => {
            this.toastr.success('Registered Successfully!');
            this.userService.login({
              email: this.registerForm.value.email,
              password: this.registerForm.value.password,
            })
              .subscribe(
                data => {
                  this.userService.addLoginData(data);
                  this.userService.addToken(data['result'].token);
                  this.router.navigate(['/2FA'])
                });

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
    else{
      this.toastr.error("You Need To Agree For Terms And Condition");
    }

  }

  onLogin() {
    this.isVisible = true;
    this.router.navigate(['/login']);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    console.log('ddhdhdhh')
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onCheck(event){
    console.log(this.checked," not loged")
    this.checked =  !this.checked
    console.log(this.checked,"loged")
  }

}
