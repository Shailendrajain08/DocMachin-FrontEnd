import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import {ConfirmDialogComponent} from './confirm-dialog.component';
import {ConfirmDialogService} from './confirm-dialog.service';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
      RouterModule,
        CommonModule
    ],
    exports: [
        ConfirmDialogComponent
    ],
    providers: [
       ConfirmDialogService
    ]
})
export class ConfirmDialogModule
{
}
