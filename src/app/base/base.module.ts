import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatNativeDateModule, DateAdapter } from '@angular/material';
import {LoaderModule} from '../loader/loader.module'
const routes: Routes = [
  {
    path: '', component: BaseComponent
  }
]
@NgModule({
  imports: [
    CommonModule,LoaderModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    Ng2SearchPipeModule,
    MatNativeDateModule,
    TextMaskModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BaseComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BaseModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-us'); // DD/MM/YYYY
  }

}