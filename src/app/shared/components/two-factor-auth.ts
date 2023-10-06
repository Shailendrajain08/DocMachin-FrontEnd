import {UserService} from '../../service/user.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'two-auth',
  template: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div style="padding-right: 0 !important; overflow: hidden" class="container-fluid">
      <div style="display: flex; width: 100%" class="no-gutter">
        <!-- The image half -->

        <!-- The content half -->
        <div class="bg-dark mainClass">
          <div *ngIf="!tfa.secret" style="margin-top: 50px;">

                <span *ngIf="!!tfa.tempSecret">

                    <p style="text-align: center;">Scan the QR code and enter the secret key Using Google Authenticator
                        Application</p>
                    <img [src]="tfa.dataURL" alt="" class="img-thumbnail" style="display:block;margin:auto">

                    <p style="text-align: center;">Auth Type - Time Based - OTP</p>

                    <form class="form-group" (ngSubmit)="confirm()" #otpForm="ngForm"
                          style="text-align: -webkit-center;">
                        <input name="authcode" #iauthcode="ngModel"
                               class="form-control rounded-pill border-0 shadow-sm px-4 password1" maxlength="6"
                               placeholder="Enter the Auth Code" id="authcode" autocomplete="off" [(ngModel)]="authcode"
                               required>
                        <br>
                        <button type="Submit" class="btn btn-lg btn-primary btn-block btn-signin"
                                [disabled]="iauthcode?.errors?.required">Submit</button>
                    </form>
                </span>
          </div>
        </div>

        <!-- End -->
        <div class="parent" style="
          width: 42%;
          display: flex;
          justify-content: center;
          align-items: center;
        ">
          <img style="width: 100%" class="image1" src="./assets/Image.png"/>
          <img class="image2" src="./assets/LogoFinal.png"/>
        </div>
      </div>
    </div>
    `,
  styles: [`    /*
*
* ==========================================
* CUSTOM UTIL CLASSES
* ==========================================
*
*/

  * {
    font-family: "Poppins", sans-serif;
  }

  .login,
  .image {
    cursor: pointer;
  }

  .parent {
    position: relative;
    top: 0;
    left: 0;
  }

  .image1 {
    position: relative;
    top: 0;
    left: 0;
    height: 100vh;
  }

  .image2 {
    position: absolute;
    width: 299px;
    height: 92px
  }

  .display-5 {
    font-weight: 400;
    color: #606670;
    font-size: 32px;
    margin-bottom: 12px;

  }

  .bottom-text {
    font-size: 12px;
    font-weight: 400;
    color: #606670;
    width: 422px;
    margin-left: 20px;
  }

  a {
    text-decoration: none;
    font-size: 12px;
    font-weight: 700;
    color: #606670;
  }

  .text-sm {
    text-decoration: none;
    color: #444343 !important;
    font-size: 12px;
    font-weight: 500;
  }

  ::placeholder {
    font-size: 12px;
    color: #a5aab3 !important;
  }

  .text-ui {
    font-size: 16px;
    font-weight: 400;
    color: #606670;
    margin-bottom: 40px !important;
  }

  .bg-dark {
    background-color: rgb(255, 255, 255) !important;
    float: left;
    width: 58%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  input.email {
    padding-left: 50px !important;
    background-image: url("../../../assets/email.png");
    background-repeat: no-repeat;
    background-size: 17px 11px;
    background-position: 20px center;
    padding-top: 0px;
  }

  input.password {
    padding-left: 50px !important;
    background-image: url("../../../assets/Suche.png");
    background-repeat: no-repeat;
    background-size: 17.5px 12px;
    background-position: 20px center, 95% center;
    padding-top: 0px;
  }
  .eye{

    margin-top: -30px;
    margin-bottom: 30px;
    margin-left: 393px;
    width: 20px;
    height: 20px;
  }

  .fa{
    color: #dfe2e6;
  }

  input.fullName {
    padding-left: 50px !important;
    background-image: url("../../../assets/ic_mail-2.png");
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: 20px center;
    padding-top: 0px;
  }

  .reg-sm {
    height: 40px;
    font-weight: 700;
    font-size: 18px;
    color: #606670;
  }

  input {
    box-shadow: none !important;
    border: 1px solid #dedede !important;
    width: 432px;
    height: 40px;
  }

  label {
    font-size: 14px;
    font-weight: 400;
    color: #606670;
    margin-left: 8px;
  }

  .btn {
    width: 160px;
    height: 40px;
    border-radius: 20px;
    box-shadow: #51aee5 -2px 21px 20px -15px;
    background-color: #43adeb;
    font-size: 12px;
    color: #ffffff;
    font-weight: 500;
  }

  .leftl {
    border: none;
  // font-size: 18px;
  // font-weight: 600;
    margin-top: 10px;
    margin-bottom: 50px;
    cursor: pointer;

  }

  .btn1 {
    min-width: 100px;
    height: 40px;
  // border-radius: 20px;
    background-color: white;
    font-size: 18px;
    font-weight: 600(semibold);
    color: #606670;
    outline: none;
  }

  .disable {
    background-color: #6cc9ff;
  }

  .mainClass {
    float: left;
    width: 58%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .image2 {
    position: absolute;
    width: 299px;
    height: 92px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .bg-dark {
      float: none;
      height: 100%;
      width: 100%;
      padding-left: 10px;
      margin-top: -10px;
      margin-left: 50px;
    }
    .image1 {
      width: 100%;
      display: none;
    }
    .image2 {
      margin-top: -500px;
      z-index: 1;
      margin-left: 160px;
    }
    .display-5 {
      font-weight: 500;
      color: #606670;
      font-size: 32px;
      margin-bottom: 12px;
    // margin-top: 10px;
    }
    input {
      box-shadow: none !important;
      border: 1px solid #dedede !important;
      width: 452px;
      height: 40px;
    }
    form {
      margin-top: -20px;
    }
    .btn {
      width: 200px;
      height: 40px;
      border-radius: 20px;
      background-color: #51aee5;
      font-size: 15px;
      color: #ffffff;
    }
    .bottom-text {
      font-size: 12px;
      font-weight: 400;
      color: #606670;
      width: 390px;
    }
    .mainClass {
      width: 90%;
    }
  }

  @media (min-width: 481px) and (max-width: 767px) {
    .bg-dark {
      float: none;
      height: 100%;
      width: 100%;
      margin-top: 10px;
      margin-left: 25px;
    }
    .image1 {
    // width: 100%;
      display: none;
    }
    .image2 {
      margin-top: -560px;
      z-index: 1;
      margin-left: 200px;
      width: 270px;
      height: 88px;
    // margin-bottom: 50px;
    }
    .display-5 {
      font-weight: 500;
      color: #606670;
      font-size: 32px;
      margin-bottom: 12px;
      margin-top: 40px;
    }
    input {
      box-shadow: none !important;
      border: 1px solid #dedede !important;
      width: 410px;
      height: 40px;
    }
  // form {
     //     margin-top: 10px;
     // }
    .btn {
      width: 200px;
      height: 40px;
      border-radius: 20px;
      background-color: #51aee5;
      font-size: 15px;
      color: #ffffff;
    }
    .bottom-text {
      font-size: 12px;
      font-weight: 400;
      color: #606670;
      width: 360px;
    }
    .mainClass {
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .bg-dark {
      float: none;
      height: 100%;
      width: 100%;
      margin-top: -50px;
      margin-left: 15px;
    }
    .image1 {
    // width: 100%;
      display: none;
    }
    .image2 {
      margin-top: -500px;
      z-index: 1;
      margin-left: 101px;
      width: 191px;
      height: 70px;
    }
    .display-5 {
      font-weight: 500;
      color: #606670;
      font-size: 24px;
      margin-bottom: 12px;
      margin-top: 6px;
    }
    form {
      margin-top: -10px;
    }
    input {
      box-shadow: none !important;
      border: 1px solid #dedede !important;
      width: 300px;
      height: 30px;
    }
    .btn {
      width: 200px;
      height: 40px;
      border-radius: 20px;
      background-color: #51aee5;
      font-size: 15px;
      color: #ffffff;
    }
    .leftl {
      height: 40px;
      width: 80px;
      font-size: 14PX;
      margin-top: 70px;
    }
    .mb-4 {
      font-size: 12px;
    }
    .text-muted {
      margin-left: -1px;
    }
    .bottom-text {
      font-size: 12px;
      font-weight: 400;
      color: #606670;
      width: 334px;
    }
    .mainClass {
      width: 90%;
    }
  }
  `]
})
export class TwoFactorAuthComponent implements OnInit {
  public authcode: any;
  public tfa: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private toastr: ToastrService) {
    this.userService.loginData.subscribe((data) => {
      if (data['result']['dataURL']) {
        this.tfa = data['result']
      }
    })
  }

  ngOnInit(): void {

  }

  confirm() {
    console.log(this.authcode)
    this.userService.verify(this.authcode)
      .subscribe(
        data => {
          if (data['status'] == 200) {
            this.toastr.success(data['message']);
            this.router.navigate(['/login'], { queryParams: { registered: true } });
          } else {
            this.toastr.error(data['message']);
          }
        },
        error => {
          this.toastr.error('something wrong, please check the details!');
          console.log("error")
        });
  }
}
