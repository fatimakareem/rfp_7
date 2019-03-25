import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-penal.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,MatSlideToggleModule,MatCheckboxModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import {LoaderModule} from '../loader/loader.module'
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { MatNativeDateModule, DateAdapter } from '@angular/material';
const routes: Routes = [
  {
    path: '', component: AdminPanelComponent
  }
]
@NgModule({
  imports: [
    CommonModule,LoaderModule,
    CKEditorModule,Ng2SearchPipeModule,
    ReactiveFormsModule,HttpClientModule,
    FormsModule,MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TextMaskModule,
    MatDatepickerModule,MatCheckboxModule,
    RouterModule.forChild(routes)
  ],

  declarations: [AdminPanelComponent]
})
export class AdminPenalModule {
 

}

