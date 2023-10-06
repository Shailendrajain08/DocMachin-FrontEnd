import { DragDropModule } from "@angular/cdk/drag-drop";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import {
  DropzoneModule,
  DropzoneConfigInterface,
  DROPZONE_CONFIG,
} from "ngx-dropzone-wrapper";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { SignupModule } from "./signup/signup.module";
import { SigninModule } from "./signIn/signin.module";
import { AppComponent } from "./app.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { CreateTeamComponent } from "./create-team/create-team.component";
import { CreateTeam1Component } from "./create-team1/create-team1.component";
import { AddMemberComponent } from "./add-member/add-member.component";
import { UpdatePasswordComponent } from "./update-password/update-password.component";
import {RouterModule} from "@angular/router";
//import { SidenavComponent } from './home/sidenav/sidenav.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: "https://httpbin.org/post",
  acceptedFiles: "image/*",
  maxFilesize: 3,
  createImageThumbnails: true,
};
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    CreateTeamComponent,
    CreateTeam1Component,
    AddMemberComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropzoneModule,
    DragDropModule,
    SharedModule,
    SignupModule,
    SigninModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
