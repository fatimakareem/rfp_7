import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRfpsComponent } from './all-rfps.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import {LoaderModule} from './../../loader/loader.module'

const routes: Routes = [
  {
    path: '', component: AllRfpsComponent
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
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllRfpsComponent],
})
export class AllRfpsModule { }