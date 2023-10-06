
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../service/user.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import * as data from '../bank.json';
import * as data1 from './../currency.json';
import { AppConfig } from '../app.config';
@Component({
  selector: 'app-create-team1',
  templateUrl: './create-team1.component.html',
  styleUrls: ['./create-team1.component.scss']
})
export class CreateTeam1Component implements OnInit, AfterViewInit {
  
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
  submitted: boolean = false;
  isDisabled: boolean = false;
  jsondata: any;
  dataJson: any;
  bankName = [];
  currencyName = [];
  toggle: boolean;
  dataJson1: any;
  jsondata1: any;
  toggle1: boolean;
  submitted1: boolean;
  control: FormArray;
  x: any;
  y: any;
  api_base: any;
  dynamicVariable = false;
  modo1: any=['choose Account type'];

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
        url: `${this.api_base}/member/uploadImage`, //`${this.api_base}/member/uploadImage`
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
    this.loginForm = this.formBuilder.group({
      teamName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 _]+$"), (Validators.minLength(3))]],
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
      // accType: ['', Validators.required],
      currency: ['', Validators.required],
    });
  }

  initProduct() {
    return new FormGroup({
      product: new FormControl('')
    });
  }
  
  

  getCourses(form): any {
    return form.get('bankDetails').controls;
  }

  getCoursesLoc(form) {
    return form.get('location').controls;
  }

  getCoursesCom(form) {
    return form.get('commodity').controls;
  }

  // getProducts(form) {
  //   return form.get('products').controls;
  // }

  onAddCourse(e) {

    if (e.controls.bankDetails.invalid) {
      this.submitted1 = true
      this.toastr.error('You can add another bank after filling first one!');
      console.log("2")
      this.isDisabled = false;
      return;
    }
    console.log("fffff")
    this.currencyName.push('')
    this.bankName.push('')
    const control = this.loginForm.controls.bankDetails as FormArray;
    control.push(this.initCourse());
    this.isDisabled = false;
    this.modo1.push('Choose Account Type');
  }

  onAddCourseLoc(e) {

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

  onAddCourseCom(e) {

    if (e.controls.commodity.invalid) {
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

  removeAddress(i) {
    console.log(i)
    //console.log(this.control)
    let control1 = this.loginForm.controls.bankDetails as FormArray;
    // console.log(control1)
    // console.log(control1.length)
    // console.log(this.bankName)
    // console.log(this.currencyName)
    control1.removeAt(i);
    this.bankName.splice(i, 1)
    this.currencyName.splice(i, 1)
    // console.log(this.bankName)
    // console.log(this.currencyName)
    // console.log(control1.length)
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
      this.letterHead = true;
    }
    else if (value == 'Round Seal') {
      this.roundSeal = true;
    }
    else {
      this.forSeal = true;
    }
  }

  get f() { return this.loginForm.controls; }

  get g(): FormArray {
    return this.loginForm.get('bankDetails') as FormArray;
  }

  get h(): FormArray {
    return this.loginForm.get('location') as FormArray;
  }

  get c(): FormArray {
    return this.loginForm.get('commodity') as FormArray;
  }

  onSubmit() {
    
    console.log(this.loginForm.value.bankDetails)
    console.log(this.loginForm.value)
    console.log("1")
    this.submitted = true
    this.submitted1 = true
    this.isDisabled = true;
    if (this.loginForm.invalid) {
      this.toastr.error('Invalid inputs, please check!');
      console.log("2")
      this.isDisabled = false;
      return;
    }

    // uncomment bellow code to work of upload files
    // if (this.file.length < 3) {
    //   this.toastr.error('Invalid inputs, please upload all the file!');
    //   console.log("2")
    //   this.isDisabled = false;
    //   return;
    // }
    console.log("3")
    this.loginForm.value.file = this.file
    console.log(this.loginForm.value)
   
    let array1=[]
    this.loginForm.value.bankDetails.forEach((value, index) => {
      const newVal = { ...value };
      newVal['accType']=this.modo1[index]
      array1.push(newVal)
     
  });
  this.loginForm.value.bankDetails=array1
    this.userService.creatTeam(this.loginForm.value)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data['data']._id)
          this.item = data
          this.toastr.success('Company details uploaded successfully!');
          this.router.navigate(['/addMember'], { queryParams: { id: data['data']._id } })

        },
        error => {
          this.toastr.error('something wrong, please check the details!');
          console.log("error")
        });
  }

  searchData(e, i) {
    this.x = i
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
    this.y = i
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
    this.bankName[i] = e
    console.log(this.bankName)
    this.toggle = false;

  }

  currencyClick(e, i) {
    this.currencyName[i] = e
    console.log(this.currencyName)

    this.toggle1 = false;


  }

  modo(e, i) {
    console.log(e)
    this.modo1[i]=e
    // this.modo1[i+1]='choose Account Type'
    if (e === 'OD-over draft' || e === 'CC- cash credit' || e === 'CA-Current account') {
      this.currencyName[i] = "INR"
    }

  }
  ngAfterViewInit() {
    //   window['sidebarInit']();
    //   if (isPlatformBrowser(this.platformId)) {
    //     this.filePreview();
    //   }
  }

}
