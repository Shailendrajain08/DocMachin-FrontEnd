import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConfirmDialogService } from "../../confirm-dialog/confirm-dialog.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {InwardRemmitanceComponent} from './inward-remmitance.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedDataService } from '../shared-Data-Servies/shared-data.service';
import {SharedHomeModule} from "../shared-home.module";

@NgModule({
  declarations: [
    InwardRemmitanceComponent
  ],
  imports: [
    SharedHomeModule,
    RouterModule.forChild([
      {
        path: "",
        component: InwardRemmitanceComponent,
        pathMatch: "full"
      },
    ]),
    ModalModule.forRoot(),
  ],
  entryComponents: [],
  providers: [ConfirmDialogService, NgbModal,SharedDataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
})
export class InwardRemmitanceModule { }
