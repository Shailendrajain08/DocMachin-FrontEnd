import {UserService} from './../service/user.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ToastrService} from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  password;
  show = false;
  loginForm: FormGroup;
  isDisabled: boolean = false;
  isVisible: boolean = false;
  submitted: boolean = false;
  otp: boolean;
  value: any;
  data1: any;
  data: any;
  closeResult: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private toastr: ToastrService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.password = 'password';

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }


  get f() {
    return this.loginForm.controls;
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  loginError() {
    this.toastr.error('Login unsuccessful!, Please check the details');
    this.isDisabled = false;
  }

  onSubmit() {
    if (!this.value) {
      this.submitted = true
      this.isDisabled = true;
      if (this.loginForm.invalid) {
        this.toastr.error('Invalid inputs, please check again!');
        this.isDisabled = false;
        return;
      }
      this.userService.login(this.loginForm.value)
        .subscribe(
          data => {
            this.userService.addLoginData(data);
            this.data = data;
            if (data['result']) {
              this.userService.addToken(data['result'].token);
              if (data['result']['dataURL']) {
                this.router.navigate(['/2FA']);
              } else {
                this.otp = true;
                // if (data['result']) {
                //   this.userService.addToken(data['result'].token);
                this.userService.getUser().subscribe(
                  data1 => {
                    this.data1 = data1
                  },
                  error1 => {
                    this.loginError();
                  });
              }
            } else {
              this.loginError();
            }
          },
          error => {
            this.loginError();
          });
    } else {
      this.userService.verify(this.value)
        .subscribe(
          data => {
            if (this.data1['data'][0].emailId == 'docmachinetec@gmail.com' || this.data1['data'][0].emailId == 'tramsdocmachine@gmail.com' || this.data1['data'][0].emailId == 'fintech.innovations2021@gmail.com') {
              this.router.navigate(['/home/power-admin/pending'])
            } else {
              if (this.data1['data'][0]['emailIdVerified']) {
                if (this.data1['data'][0]['verified'] == 'yes') {
                  if (data['status'] == 200) {
                    this.toastr.success(data['message']);
                    if (this.data['result']['role'] == 'ca') {
                      this.userService.role = this.data['result']['role'];
                      this.router.navigate(['/home/caDocuments/all'])
                    } else {
                      this.userService.role = this.data['result']['role'];
                      if (this.data1['data'][0].companyId) {
                        this.router.navigate(['/home/dashboardTask'])
                      } else {
                        this.router.navigate(['createTeam']);
                      }
                    }
                  } else {
                    this.toastr.error(data['message']);
                  }
                } else {
                  this.router.navigate(['newUser'])
                }
              } else {
                this.router.navigate(['notVerified'])
              }
            }
          },
          error => {
            this.loginError();
          });
    }

  }

  inputFun(a: any) {
    this.submitted = false
    this.isDisabled = false;
    this.value = a
  }

  onSignup() {
    this.isVisible = true;
    this.router.navigate(['/signup'])

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
}
