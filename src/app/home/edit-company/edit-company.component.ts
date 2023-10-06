import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../service/user.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as data from '../../bank.json';
import * as data1 from '../../currency.json';
import { AppConfig } from 'src/app/app.config';
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['../../../sass/application.scss', './edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit, AfterViewInit {
  @Input() que: any;
  @Input() entities: any;
  @ViewChild('inputName', { static: true }) public inputRef: ElementRef;
  public type: string = 'directive';
  public disabled: boolean = false;
  @ViewChild(DropzoneDirective, { static: true }) directiveRef?: DropzoneDirective;
  item: any;
  authToken: any;
  headers: any;
  file: Array<any> = [];
  loginForm: FormGroup;
  letterHead = false;
  roundSeal = false;
  forSeal = false;
  letterHeadDone = false;
  roundSealDone = false;
  forSealDone = false;
  public config: DropzoneConfigInterface;
  letterHead1: any;
  roundSeal1: any;
  forSeal1: any;
  fs: boolean = true;
  rs: boolean = true;
  lh: boolean = true;
  editable: boolean = false;
  isItem: boolean = false;
  submitted: boolean;
  isDisabled: boolean;
  file1: any;
  bankDetails: any;
  Details: any;
  details: any;
  i: number;
  k = 2;
  showLess = false;
  jsondata: any;
  dataJson: any;
  bankName = [];
  currencyName = [];
  toggle: boolean;
  dataJson1: any;
  jsondata1: any;
  toggle1: boolean;
  value = 100;
  value1: any;
  submitted1: boolean;
  z: any;
  api_base: any;
  l: number = 2;
  showLessLoc: boolean;
  m: number = 2;
  showLessCom: boolean;
  location: any;
  commodity: any;
  x: number;
  y: number;
  p: any;
  q: any;

  constructor(@Inject(PLATFORM_ID) public platformId, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private userService: UserService, private router: Router, private toastr: ToastrService, public appconfig: AppConfig) {
    this.loadFromLocalStorage()
    this.api_base = appconfig.apiUrl;
    console.log(this.api_base)
    console.log(this.authToken)
    this.headers = {
      Authorization: this.authToken,
    }

    if (isPlatformBrowser(this.platformId)) {
      this.config = {
        url: `${this.api_base}/member/uploadImage`,
        method: `POST`,
        maxFiles: 5,
        maxFilesize: 5,
        addRemoveLinks: true,
        headers: this.headers,
        timeout: 120000,
        // autoProcessQueue: false,
        dictDefaultMessage: 'Drag a document here',
        acceptedFiles: 'image/*,application/pdf',
        previewTemplate: '<div  class=\"dz-preview dz-file-preview\" style=\"text-align: right; margin-right:3px;\">\n <div class=\"dz-image\" style=\"text-align: right; margin-right:3px;\"> <img data-dz-thumbnail /></div>\n <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <i style=\"color: red; text-align: center;font-size: 30px;\" class=\"fa fa-exclamation-circle\"></i>\n  </div>\n</div>'
      };
    }
  }



  ngOnInit(): void {
    this.jsondata = data['default'];
    this.dataJson = data['default']
    this.jsondata1 = data1['default'];
    this.dataJson1 = data1['default']
    this.userService.getTeam()
      .subscribe(
        data => {
          console.log("king123")
          console.log(data['data'][0])
          this.item = data['data'][0]
          this.isItem = true
          console.log(this.item)
          this.letterHead1 = data['data'][0].file[0]["Letter Head"]
          this.roundSeal1 = data['data'][0].file[1]["Round Seal"]
          this.forSeal1 = data['data'][0].file[2]["For Seal"]
          this.file1 = data['data'][0].file
          this.details = data['data'][0].bankDetails
          this.location = data['data'][0].location
          this.commodity = data['data'][0].commodity
          this.z = this.details.length
          console.log(this.z)
          if (this.details.length > 1) {
            console.log("1")
            this.i = 1
            for (let j = 1; j < this.details.length; j++) {
              this.onAddCourse(1)
            }

          }
          if (this.item.location) {
            this.p = this.location.length
            if (this.location.length > 1) {
              console.log("1")
              this.x = 1
              for (let j = 1; j < this.location.length; j++) {
                this.onAddCourseLoc(1)
              }

            }
          }

          if (this.item.commodity) {
            this.q = this.commodity.length
            if (this.commodity.length > 1) {
              console.log("1")
              this.y = 1
              for (let j = 1; j < this.commodity.length; j++) {
                this.onAddCourseCom(1)
              }

            }
          }



          //this.router.navigate(['/addMember'], { queryParams: { id: data['data']._id } })

        },
        error => {
          console.log("error")
        });

    // this.menuForm = new FormGroup({
    //   name: new FormControl('', [
    //     Validators.required,
    //     Validators.maxLength(100)
    //   ]),
    //   description: new FormControl('', Validators.maxLength(255)),
    //   price: new FormControl('', [Validators.required, Validators.min(0)]),
    //   courses: new FormArray([this.initCourse()])
    // });

    this.loginForm = this.formBuilder.group({
      teamName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 _]+$")]],
      iec: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 _]{10}$"), Validators.maxLength(10)]],
      adress: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9 _]{10}$"), Validators.maxLength(10)]],
      caEmail: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      chaEmail: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      gst: ['', [Validators.required, Validators.pattern("^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"), Validators.maxLength(15)]],
      location: new FormArray([this.initLocation()]),
      commodity: new FormArray([this.initComo()]),
      bankDetails: new FormArray([this.initCourse()], Validators.required)
    });


  }

  initLocation() {
    return this.formBuilder.group({
      loc: ['']
    });
  }

  initComo() {
    return this.formBuilder.group({
      como: ['']
    });
  }

  initCourse() {
    return this.formBuilder.group({
      bank: ['', Validators.required],
      bicAddress: ['', [Validators.required, Validators.pattern("^[A-Za-z]{6}[A-Za-z0-9]{5}$"), Validators.maxLength(11)]],
      accNumber: ['', [Validators.required, Validators.pattern("^[0-9]{3,34}")]],
      accType: ['', Validators.required],
      currency: ['', Validators.required],
    });
  }

  initProduct() {
    return new FormGroup({
      product: new FormControl('')
    });
  }

  get g(): FormArray {
    return this.loginForm.get('bankDetails') as FormArray;
  }

  get b(): FormArray {
    return this.loginForm.get('location') as FormArray;
  }

  get c(): FormArray {
    return this.loginForm.get('commodity') as FormArray;
  }

  getCourses(form) {
    return form.get('bankDetails').controls;
  }

  getLoc(form) {
    return form.get('location').controls;
  }

  getCom(form) {
    return form.get('commodity').controls;
  }

  // getProducts(form) {
  //   return form.get('products').controls;
  // }

  onAddCourse(a) {
    console.log(a)
    if (a === 1) {
      console.log(a)
      let control = this.loginForm.controls.bankDetails as FormArray;
      control.push(this.initCourse());
      if (this.i >= this.details.length) {
        this.details.push([])
      }
      this.i++
    }
    else {
      console.log(a)

      if (a.controls.bankDetails.invalid) {
        this.submitted1 = true
        this.toastr.error('You can add another bank after filling first one!');
        console.log("2")
        this.isDisabled = false;
        return;
      }

      const control = this.loginForm.get('bankDetails') as FormArray;
      control.push(this.initCourse());
      console.log("my back details",this.details)
      console.log(this.details.length)
      console.log(this.i)

      console.log("this.details")
      this.details.push([])
      console.log(this.details)

      this.z++
      this.i++
    }


  }

  onAddCourseLoc(a) {
    console.log(a)
    if (a === 1) {
      console.log(a)
      let control = this.loginForm.controls.location as FormArray;
      control.push(this.initLocation());
      if (this.x >= this.location.length) {
        this.location.push([])
      }
      this.x++
    }
    else {
      console.log(a)

      if (a.controls.location.invalid) {
        this.submitted1 = true
        this.toastr.error('You can add another bank after filling first one!');
        console.log("2")
        this.isDisabled = false;
        return;
      }

      const control = this.loginForm.get('location') as FormArray;
      control.push(this.initLocation());
      // console.log(this.details)
      // console.log(this.details.length)
      // console.log(this.i)

      // console.log("this.details")
      this.location.push([])
      console.log(this.details)

      this.p++
      this.x++
    }


  }

  onAddCourseCom(a) {
    console.log(a)
    if (a === 1) {
      console.log(a)
      let control = this.loginForm.controls.commodity as FormArray;
      control.push(this.initComo());
      if (this.y >= this.commodity.length) {
        this.commodity.push([])
      }
      this.y++
    }
    else {
      console.log(a)

      if (a.controls.commodity.invalid) {
        this.submitted1 = true
        this.toastr.error('You can add another bank after filling first one!');
        console.log("2")
        this.isDisabled = false;
        return;
      }

      const control = this.loginForm.get('commodity') as FormArray;
      control.push(this.initComo());
      console.log(this.details)
      console.log(this.details.length)
      console.log(this.i)

      console.log("this.details")
      this.commodity.push([])
      console.log(this.commodity)

      this.q++
      this.y++
    }


  }

  onAddCourseLoc1(e) {

    if (e.controls.location.invalid) {
      this.submitted1 = true
      this.toastr.error('You can add another bank after filling first one!');
      console.log("2")
      this.isDisabled = false;
      return;
    }
    console.log("fffff")
    const control = this.loginForm.controls.location as FormArray;
    control.push(this.initLocation());
    this.isDisabled = false;
  }

  onAddCourseLCom1(e) {

    if (e.controls.location.invalid) {
      this.submitted1 = true
      this.toastr.error('You can add another bank after filling first one!');
      console.log("2")
      this.isDisabled = false;
      return;
    }
    console.log("fffff")
    const control = this.loginForm.controls.commodity as FormArray;
    control.push(this.initComo());
    this.isDisabled = false;
  }

  removeAddressLoc(i) {
    console.log(i)
    //console.log(this.control)
    let control1 = this.loginForm.controls.location as FormArray;
    // console.log(control1)
    // console.log(control1.length)
    // console.log(this.bankName)
    // console.log(this.currencyName)
    control1.removeAt(i);
    // console.log(this.bankName)
    // console.log(this.currencyName)
    // console.log(control1.length)
  }

  removeAddressCom(i) {
    console.log(i)
    //console.log(this.control)
    let control1 = this.loginForm.controls.commodity as FormArray;
    // console.log(control1)
    // console.log(control1.length)
    // console.log(this.bankName)
    // console.log(this.currencyName)
    control1.removeAt(i);
    // console.log(this.bankName)
    // console.log(this.currencyName)
    // console.log(control1.length)
  }
  removeAddress(i) {
    console.log(i)
    //console.log(this.control)
    let control1 = this.loginForm.controls.bankDetails as FormArray;
    control1.removeAt(i);
    this.details.splice(i, 1)
    this.bankName.splice(i, 1)
    this.currencyName.splice(i, 1)
    this.z = this.z - 1
  }

  removeLoc(i) {
    console.log(i)
    //console.log(this.control)
    let control1 = this.loginForm.controls.location as FormArray;
    control1.removeAt(i);
    this.location.splice(i, 1)
    this.p = this.p - 1
  }

  removeCom(i) {
    console.log(i)
    //console.log(this.control)
    let control1 = this.loginForm.controls.commodity as FormArray;
    control1.removeAt(i);
    this.commodity.splice(i, 1)
    this.q = this.q - 1
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    //this.uploading = false;
    console.log('onUploadError:', args, args[1].message);
  }
  public onUploadSuccess(args: any): void {
    //this.uploading = false;]
    console.log(args[1].data)
    console.log(Object.keys(args[1].data)[0])
    this.file.push(args[1].data)
    console.log(this.file)
    this.letterHead = false;
    this.roundSeal = false;
    this.forSeal = false;
    if (Object.keys(args[1].data)[0] == 'Letter Head') {
      this.letterHeadDone = true;
    }
    else if (Object.keys(args[1].data)[0] == 'Round Seal') {
      this.roundSealDone = true;
    }
    else {
      this.forSealDone = true;
    }

  }

  public sending(args: any, value) {
    args[2].append('fileType', value);
    if (value == 'Letter Head') {
      this.lh = false
      this.letterHead = true;
    }
    else if (value == 'Round Seal') {
      this.rs = false
      this.roundSeal = true;
    }
    else {
      this.fs = false
      this.forSeal = true;
    }
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log("1")
    console.log(this.loginForm.value)
    this.submitted = true
    this.submitted1 = true
    this.isDisabled = true;
    this.editable = false;
    if (this.loginForm.invalid) {
      this.toastr.error('Invalid inputs, please check!');
      console.log("2")
      this.isDisabled = false;
      return;
    }
    if (this.file.length > 0) {
      console.log("11")
      this.loginForm.value.file = this.file
    }
    else {
      console.log("12")
      console.log(this.file1)
      this.loginForm.value.file = this.file1
    }

    this.loginForm.value.member = this.item.member
    console.log(this.loginForm.value)
    this.userService.updateTeam(this.loginForm.value)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data['data'])
          this.toastr.success('Company details updated successfully.');
          // this.router.navigate(['/home/dashboardTask']);
        },
        error => {
          this.toastr.error('Invalid inputs, please check!');
          console.log("error")
        });
  }
  searchData(e, i) {
    this.value = i
    this.toggle = true;
    console.log(e)
    this.jsondata = []
    for (let data of this.dataJson) {
      if (data.bank.toLowerCase().includes(e.toLowerCase())) {
        this.jsondata.push(data)
      }


    }
  }

  searchCurrency(e, i) {
    this.value1 = i
    this.toggle1 = true;
    console.log(e)
    this.jsondata1 = []
    for (let data of this.dataJson1) {
      if (data.currency.toLowerCase().includes(e.toLowerCase())) {
        console.log('1')
        this.jsondata1.push(data)
      }


    }
    console.log(this.jsondata1)
    console.log(this.currencyName.length)
  }

  public loadFromLocalStorage() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    return this.authToken;
  }

  bankClick(e, i) {
    this.details[i].bank = e
    //console.log(this.bankName)
    this.toggle = false;
  }

  currencyClick(e, i) {
    this.details[i].currency = e
    //console.log(this.currencyName)
    this.toggle1 = false;
  }

  modo(e, i) {
    console.log(e)
    if (e === 'OD-over draft' || e === 'CC- cash credit' || e === 'CA-Current account') {
      this.details[i].currency = "INR"
    }
  }

  showMore() {
    this.k = this.k + 2
    if (this.k >= this.details.length) {
      this.showLess = true
    }
  }

  showMoreLoc() {
    this.l = this.l + 2
    if (this.l >= this.item.location.length) {
      this.showLessLoc = true
    }
  }

  showMoreCom() {
    this.m = this.m + 2
    if (this.m >= this.item.commodity.length) {
      this.showLessCom = true
    }
  }

  lessShow() {
    this.k = 2;
    this.showLess = false
  }

  lessShowLoc() {
    this.l = 2;
    this.showLessLoc = false
  }

  lessShowCom() {
    this.m = 2;
    this.showLessCom = false
  }

  edit() {
    this.editable = true;
  }

  ngAfterViewInit() {
    //   window['sidebarInit']();
    //   if (isPlatformBrowser(this.platformId)) {
    //     this.filePreview();
    //   }
  }

}
