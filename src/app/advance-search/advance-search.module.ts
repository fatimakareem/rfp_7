import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceSearchComponent } from './advance-search.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {LoaderModule} from '../loader/loader.module'

import { MatNativeDateModule, DateAdapter } from '@angular/material';
const routes: Routes = [
  {
    path: '', component: AdvanceSearchComponent
  }
]
@NgModule({
  imports: [
    CommonModule,LoaderModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    MatDatepickerModule,
    RouterModule.forChild(routes)
  ],

  declarations: [AdvanceSearchComponent]
})
export class AdvanceSearchModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-us'); // DD/MM/YYYY
  }

}

