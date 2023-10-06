import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConfirmDialogService } from "../../confirm-dialog/confirm-dialog.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {ModalContentComponent1} from '../pipo-doc-export/pipo-doc-export.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedDataService } from '../shared-Data-Servies/shared-data.service';
import {SharedHomeModule} from "../shared-home.module";
import {CompletedTaskComponent} from "./completed-task.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CompletedTaskComponent
  ],
  imports: [
    SharedHomeModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: ":id",
        component: CompletedTaskComponent,
        pathMatch: "full"
      },
    ]),
    ModalModule.forRoot(),
  ],
  entryComponents: [ModalContentComponent1],
  providers: [ConfirmDialogService, NgbModal,SharedDataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
})
export class CompletedTaskModule { }
