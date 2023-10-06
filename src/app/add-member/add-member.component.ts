
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../service/user.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AppConfig } from '../../app/app.config';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit, AfterViewInit {
  @Input() que: any;
  @Input() entities: any;
  @ViewChild('inputName', { static: true }) public inputRef: ElementRef;
  public type: string = 'directive';
  public disabled: boolean = false;
  @ViewChild(DropzoneDirective, { static: true }) directiveRef?: DropzoneDirective;
  memeberForm: FormGroup;
  id: any;
  item: Object;
  item1: any;
  authToken: any;
  headers: any;
  img: any;
  toggle = false;

  public config: DropzoneConfigInterface;
  api_base: string;

  constructor(@Inject(PLATFORM_ID) public platformId, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, public appconfig: AppConfig) {
    this.loadFromLocalStorage()
    this.api_base = appconfig.apiUrl;
    console.log(this.api_base)
    console.log(this.authToken)
    this.headers = {
      id: this.id,
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
        acceptedFiles: 'image/*',
        previewTemplate: '<div  class=\"dz-preview dz-file-preview\" style=\"text-align: right; margin-right:3px;\">\n <div class=\"dz-image\" style=\"text-align: right; margin-right:3px;\"> <img data-dz-thumbnail /></div>\n <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <i style=\"color: red; text-align: center;font-size: 30px;\" class=\"fa fa-exclamation-circle\"></i>\n  </div>\n</div>'
      };
    }
  }

  ngOnInit(): void {
    this.toggle = false;
    this.id = this.route.snapshot.queryParams.id;
    console.log(this.id)
    this.memeberForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      email: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.userService.getMemeber(this.id)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data)
          this.item1 = data['data']
          console.log(this.item1['length'])
          //this.router.navigate(['/addMember'],{ queryParams: { id:data['data']._id } })

        },
        error => {
          console.log("error")
        });




  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    //this.uploading = false;
    console.log('onUploadError:', args, args[1].message);
  }
  public onUploadSuccess(args: any): void {
    //this.uploading = false;
    console.log(args)
    console.log(args[1].data)
    this.img = args[1].data
    this.toggle = true;
    // console.log(args[1].data.sbno)
    // console.log(args[1].data.boeNumber)
    // if(args[1].message == 'This file already uploaded') {
    //   this.message = args[1].message
    //   this.override = true;
    //   if(args[1].data.sbno) {
    //     this.res = new ShippingBill(args[1].data)
    //     this.sbNo = true;
    //     console.log(this.res)
    //   }
    //   else if(args[1].data.boeNumber) {
    //     this.res = new BoeBill(args[1].data)
    //     this.boeNumber = true;
    //     console.log(this.res)
    //   }

    // }
    // else if(args[1].data.sbno) {
    //   this.res = new ShippingBill(args[1].data)
    //   this.sbNo = true;
    //   console.log(this.res)
    // }
    // else if(args[1].data.boeNumber) {
    //   this.res = new BoeBill(args[1].data)
    //   this.boeNumber = true;
    //   console.log(this.res)
    // }
    // this.publicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(args[1].publicUrl);
    // console.log(this.publicUrl)
    // console.log(this.res)

  }
  onSubmit() {
    console.log(this.memeberForm.value)
    this.memeberForm.value.imageUrl = this.img
    console.log(this.memeberForm.value)
    this.userService.addMemeber(this.id, this.memeberForm.value)
      .subscribe(
        data => {
          console.log("king123")
          console.log(data)
          this.item = data
          this.ngOnInit()
          //this.router.navigate(['/addMember'],{ queryParams: { id:data['data']._id } })

        },
        error => {
          console.log("error")
        });
  }
  public loadFromLocalStorage() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    return this.authToken;
  }


  ngAfterViewInit() {
    //   window['sidebarInit']();
    //   if (isPlatformBrowser(this.platformId)) {
    //     this.filePreview();
    //   }
  }

}
