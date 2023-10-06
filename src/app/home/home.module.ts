import { SidenavComponent } from "./sidenav/sidenav.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConfirmDialogService } from "../confirm-dialog/confirm-dialog.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalContentComponent1 } from './pipo-doc-export/pipo-doc-export.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedDataService } from './shared-Data-Servies/shared-data.service';
import {SharedHomeModule} from "./shared-home.module";
import { CreateBeneComponent } from "./create-bene/create-bene.component";
import { EditBeneComponent } from "./edit-bene/edit-bene.component";
import { ManageUserComponent } from "./manage-user/manage-user.component";
import { RequestComponent } from "./request/request.component";
import { EditBuyerComponent } from './edit-buyer/edit-buyer.component';
import { TestComponent } from './test/test/test.component';
import { HelpComponent } from './help/help.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { NgApexchartsModule } from "ng-apexcharts";
import {ProgressBarModule} from "angular-progress-bar"
import { PipoNewComponent } from './pipo-new/pipo-new.component';
import { EditPipoComponent } from './edit-pipo/edit-pipo.component';
import { ViewPipoComponent } from './view-pipo/view-pipo.component';
import { AddPipoComponent } from './add-pipo/add-pipo.component';
import { FooterComponent } from './footer/footer.component'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    SidenavComponent,
    ManageUserComponent,
    ModalContentComponent1,
    HelpComponent,
    TermsAndConditionComponent,
    PipoNewComponent,
    EditPipoComponent,
    ViewPipoComponent,
    AddPipoComponent,
    FooterComponent,
  ],
  imports: [
    SharedHomeModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    NgApexchartsModule,
    ProgressBarModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: SidenavComponent,
        children: [
          { path: "dashboardTask", loadChildren: () => import('./dashboard-task/dashboard-task.module').then(mod => mod.DashboardTaskModule) },
          { path: "upload", loadChildren: () => import('./upload/upload.module').then(mod => mod.UploadModule) },
          { path: "manage-customer", loadChildren: () => import('./manage-customer/manage-customer.module').then(mod => mod.ManageCustomerModule) },
          { path: "createBene", loadChildren: () => import('./create-bene/create-bene.module').then(mod => mod.CreateBeneModule) },
          { path: "pipo-doc", loadChildren: () => import('./pipo-documents/pipo-documents.module').then(mod => mod.PipoDocumentsModule) },
          { path: "boe", loadChildren: () => import('./boe/boe.module').then(mod => mod.BoeModule) },
          { path: "importCredit", loadChildren: () => import('./imports-credit-note/imports-credit-note.module').then(mod => mod.ImportsCreditNoteModule) },
          { path: "importDebit", loadChildren: () => import('./import-debit-note/import-debit-note.module').then(mod => mod.ImportDebitNoteModule) },
          { path: "importInsurance", loadChildren: () => import('./import-insurance/imports-insurance.module').then(mod => mod.ImportsInsuranceModule) },
          { path: "importTriParty", loadChildren: () => import('./import-tri-party/imports-tri-party.module').then(mod => mod.ImportsTriPartyModule) },
          { path: "advance-outward-remittance", loadChildren: () => import('./advance-outward-remittance/advance-outward.remittance.module').then(mod => mod.AdvanceOutwardRemittanceModule) },
          { path: "direct-import-payment", loadChildren: () => import('./direct-import-payment/direct-import-payment.module').then(mod => mod.DirectImportPaymentModule) },
          { path: "a2cum-application-yesbank", loadChildren: () => import('./yesBank/a2cum-application-yes-bank/a2cum-application-yes-bank.module').then(mod => mod.A2cumApplicationYesBankModule) },
          { path: "fbg-waiver", loadChildren: () => import('./yesBank/advance-fbg-wavier/fbg-wavier.module').then(mod => mod.FbgWavierModule) },
          { path: "lc-isurance", loadChildren: () => import('./lc-isurence/lc-isurance.module').then(mod => mod.LcIsuranceModule) },
          { path: "buyer-credit", loadChildren: () => import('./buyers-credit-request/buyers-credit-request-module').then(mod => mod.BuyersCreditRequestModule) },
          { path: "bill-under-collection", loadChildren: () => import('./bill-under-collection/bill-under-collection.module').then(mod => mod.BillUnderCollectionModule) },
          { path: "pipo-export", loadChildren: () => import('./pipo-doc-export/pipo-doc-export.module').then(mod => mod.PipoDocExportModule) },
          { path: "packing-list", loadChildren: () => import('./other-documents/other-documents.module').then(mod => mod.OtherDocumentsModule) },
          { path: "commercial", loadChildren: () => import('./commercial/commercial.module').then(mod => mod.CommercialModule) },
          { path: "destruction", loadChildren: () => import('./destruction/destruction.module').then(mod => mod.DestructionModule) },
          { path: "bill-of-exchange", loadChildren: () => import('./bill-of-exchange/bill-of-exchange.module').then(mod => mod.BillOfExchangeModule) },
          { path: "airway-bl-copy", loadChildren: () => import('./airway-blcopy/airway-blcopy.module').then(mod => mod.AirwayBlcopyModule) },
          { path: "inward-remittance-advice", loadChildren: () => import('./inward-remittance-advice/inward-remittance-advice.module').then(mod => mod.InwardRemittanceAdviceModule) },
          { path: "opinion-report", loadChildren: () => import('./opinion-reports/opinion-reports.module').then(mod => mod.OpinionReportsModule) },
          { path: "try-party", loadChildren: () => import('./try-party-agreements/try-party-agreements.module').then(mod => mod.TryPartyAgreementsModule) },
          { path: "master-services", loadChildren: () => import('./master-service/master-service.module').then(mod => mod.MasterServiceModule) },
          { path: "letterofcredit-lc", loadChildren: () => import('./letter-of-credit-export-lc/letter-of-credit-export-lc.module').then(mod => mod.LetterOfCreditExportLcModule) },
          { path: "insurance-document", loadChildren: () => import('./insurance-document/insurance-document.module').then(mod => mod.InsuranceDocumentModule) },
          { path: "debit-note", loadChildren: () => import('./debit-note/debit-note.module').then(mod => mod.DebitNoteModule) },
          { path: "credit-note", loadChildren: () => import('./credit-note/credit-note.module').then(mod => mod.CreditNoteModule) },
          { path: "view-document", loadChildren: () => import('./view-document/view-document.module').then(mod => mod.ViewDocumentModule) },
          { path: "edpms-recon-table", loadChildren: () => import('./edpms-recon-table/edpms-recon-table.module').then(mod => mod.EdpmsReconTableModule) },
          { path: "edpms-recon", loadChildren: () => import('./edpms-recon/edpms-recon.module').then(mod => mod.EdpmsReconModule) },
          { path: "bill-lodgement", loadChildren: () => import('./Export/bill-lodgement/bill-lodgement.module').then(mod => mod.BillLodgementModule) },
          { path: "packing-credit-request", loadChildren: () => import('./Export/packing-credit/packing-credit.module').then(mod => mod.PackingCreditModule) },
          { path: "export-home", loadChildren: () => import('./Export/export-home/export-home.module').then(mod => mod.ExportHomeModule) },
          { path: "account", loadChildren: () => import('./edit-company/edit-company.module').then(mod => mod.EditCompanyModule) },
          { path: "completed-task", loadChildren: () => import('./completed-task/completed-task.module').then(mod => mod.CompletedTaskModule) },
          { path: "tasks", loadChildren: () => import('./all-task/all-task.module').then(mod => mod.AllTaskModule) },
          { path: "letter-of-credit", loadChildren: () => import('./yesBank/letter-of-credit/letter-of-credit.module').then(mod => mod.LetterOfCreditModule) },
          { path: "inward-remittance", loadChildren: () => import('./yesBank/inwardRemittance/inward-remittance-module').then(mod => mod.InwardRemittanceModule) },
          { path: "againstAdvance", loadChildren: () => import('./yesBank/against-advance/against-advance-module').then(mod => mod.AgainstAdvanceModule) },
          { path: "request-letter", loadChildren: () => import('./yesBank/request-letter/request-letter-module').then(mod => mod.RequestLetterModule) },
          { path: "letter-of-credit-import", loadChildren: () => import('./yesBank/letter-of-credit-import/letter-of-credit-import.module').then(mod => mod.LetterOfCreditImportModule) },
          { path: "a2cum-application", loadChildren: () => import('./axisBank/a2cum-aplication/a2cum-application.module').then(mod => mod.A2cumApplicationModule) },
          { path: "letter-of-credit-import-axis", loadChildren: () => import('./axisBank/letter-of-credit-import-axis/letter-of-credit-import-axis.module').then(mod => mod.LetterOfCreditImportAxisModule) },
          { path: "advance-remittance", loadChildren: () => import('./axisBank/advance-remitance/advance-remitance.module').then(mod => mod.AdvanceRemitanceModule) },
          { path: "advance-remittance-fbg", loadChildren: () => import('./axisBank/advance-remitance-fbg/advance-remitance-fbg.module').then(mod => mod.AdvanceRemitanceFbgModule) },
          { path: "inward-remittance-boe", loadChildren: () => import('./yesBank/inward-remittance-boe/inward-remittance-boe.module').then(mod => mod.InwardRemittanceBoeModule) },
          { path: "payment-acceptance", loadChildren: () => import('./yesBank/payment-acceptance-letter/payment-acceptance.module').then(mod => mod.PaymentAcceptanceModule) },
          { path: "direct-import-axis", loadChildren: () => import('./axisBank/direct-import-axis/direct-import-axis.module').then(mod => mod.DirectImportAxisModule) },
          { path: "buyers-credit-axis", loadChildren: () => import('./axisBank/buyers-credit-axis/buyers-credit-axis.module').then(mod => mod.BuyersCreditAxisModule) },
          { path: "trade-request-letter", loadChildren: () => import('./yesBank/trade-request-letter/trade-request-letter.module').then(mod => mod.TradeRequestLetterModule) },
          { path: "fbg-wavier-file/:id", loadChildren: () => import('./yesBank/fbg-waiver-file/fbg-waiver-file.module').then(mod => mod.FbgWaiverFileModule) },
          { path: "request-letter1", loadChildren: () => import('./yesBank/request-letter/request-letter-module').then(mod => mod.RequestLetterModule) },
          { path: "outward-remitance", loadChildren: () => import('./outward-rem/outward-rem.module').then(mod => mod.OutwardRemModule) },
          { path: "inward-remitance", loadChildren: () => import('./inward-remmitance/inward-remmitance.module').then(mod => mod.InwardRemmitanceModule) },
          { path: "caDocuments/:file", loadChildren: () => import('./ca-documents/ca-documents.module').then(mod => mod.CaDocumentsModule) },
          { path: "inward-remmitance-p0103", loadChildren: () => import('./yesBank/inward-remmitancep0103/inward-remmitancep0103.module').then(mod => mod.InwardRemmitancep0103Module) },
          { path: "completed-export/:id", loadChildren: () => import('./Export/completed-export/completed-export.module').then(mod => mod.CompletedExportModule) },
          { path: "buyers-lodge", loadChildren: () => import('./yesBank/buyers-lodge/buyers-lodge.module').then(mod => mod.BuyersLodgeModule) },
          { path: "power-admin/:file", loadChildren: () => import('./power-admin/power-admin.module').then(mod => mod.PowerAdminModule) },
          {
            path: "createBene",
            component: CreateBeneComponent,
            pathMatch: "full",
          },
          {
            path: "pipo-new",
            component: PipoNewComponent,
            pathMatch: "full",
          },
          {
            path: "view-pipo",
            component: ViewPipoComponent,
            pathMatch: "full",
          },
          {
            path: "add-pipo",
            component: AddPipoComponent,
            pathMatch: "full",
          },
          {
            path: "edit-pipo",
            component: EditPipoComponent,
            pathMatch: "full",
          },
          {
            path: "editBene/:id",
            component: EditBeneComponent,
            pathMatch: "full",
          },
          {
            path: "editBuyer/:id",
            component: EditBuyerComponent,
            pathMatch: "full",
          },
          {
            path: "test",
            component: TestComponent,
            pathMatch: "full",
          },
          {
            path: "manageUser",
            component: ManageUserComponent,
            pathMatch: "full",
          },
          {
            path: "help",
            component: HelpComponent,
            pathMatch: "full",
          },
          {
            path: "t&c",
            component:TermsAndConditionComponent,
            pathMatch: "full",
          }

        ],
      },
    ]),
    ModalModule.forRoot(),
  ],
  entryComponents: [ModalContentComponent1],
  providers: [ConfirmDialogService, NgbModal,SharedDataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //   exports: [SharedProjectsModule]
  exports: [MatProgressBarModule, MatTabsModule],
})
export class HomeModule { }
