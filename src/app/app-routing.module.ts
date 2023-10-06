import { HomeModule } from "./home/home.module";
import { SidenavComponent } from "./home/sidenav/sidenav.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { SignupRoutingModule } from "./signup/signup-routing.module";
import { SigninRoutingModule } from "./signIn/signin-routing.module";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { CreateTeamComponent } from "./create-team/create-team.component";
import { AddMemberComponent } from "./add-member/add-member.component";
import {MatDialogModule} from '@angular/material/dialog';


import { CreateTeam1Component } from "./create-team1/create-team1.component";
import { UpdatePasswordComponent } from "./update-password/update-password.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NotVerifiedComponent } from "./not-verified/not-verified.component";
import { MembersigninComponent } from "./membersignin/membersignin.component";
import { PdfComponent } from "./pdf/pdf.component";
import {TwoFactorAuthComponent} from './shared/components/two-factor-auth';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  { path: "home", loadChildren: () => import('../app/home/home.module').then(mod => mod.HomeModule) },
  {
    path: "forgotpassword",
    component: ForgotPasswordComponent,
    pathMatch: "full",
  },
  {
    path: "2FA",
    component: TwoFactorAuthComponent,
    pathMatch: "full",
  },
  {
    path: "updatePassword/:id",
    component: UpdatePasswordComponent,
    pathMatch: "full",
  },
  {
    path: "verifyEmail/:id",
    component: VerifyEmailComponent,
    pathMatch: "full",
  },
  //{ path: 'createTeam',component: CreateTeamComponent, pathMatch: 'full'},
  { path: "createTeam", component: CreateTeam1Component, pathMatch: "full" },
  { path: "addMember", component: AddMemberComponent, pathMatch: "full" },
  { path: "newUser", component: NewUserComponent, pathMatch: "full" },
  { path: "notVerified", component: NotVerifiedComponent, pathMatch: "full" },
  { path: "membersignin/:id", component: MembersigninComponent, pathMatch: "full" },
  { path: "pdf", component: PdfComponent, pathMatch: "full" },
  {
    path: "**",
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    SignupRoutingModule,
    SigninRoutingModule,
    MatDialogModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
