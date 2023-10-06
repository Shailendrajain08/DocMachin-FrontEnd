import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  DropzoneModule,
} from "ngx-dropzone-wrapper";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ConfirmDialogService } from "../confirm-dialog/confirm-dialog.service";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalContentComponent1 } from './pipo-doc-export/pipo-doc-export.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedDataService } from './shared-Data-Servies/shared-data.service';
import {CommonModule} from "@angular/common";
import { FilternewPipe } from './filterpipo/filternew.pipe';
import { FilterdatePipe } from './datefilter/filterdate.pipe';
import { NumberToWordsPipe } from "./pipe/number-to-words.pipe";

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    FilternewPipe,
    FilterdatePipe,
    NumberToWordsPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropzoneModule,
    DragDropModule,
    MatProgressBarModule,
    MatTabsModule,
    ModalModule.forRoot(),
  ],
  entryComponents: [ModalContentComponent1],
  providers: [ConfirmDialogService, NgbModal,SharedDataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //   exports: [SharedProjectsModule]
  exports: [
    FilternewPipe,
    FilterdatePipe,
    NumberToWordsPipe,
    CommonModule,
    FormsModule,
    DropzoneModule,
    DragDropModule,
    MatProgressBarModule,
    MatTabsModule,
    ReactiveFormsModule],
})
export class SharedHomeModule { }
