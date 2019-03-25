import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRfpComponent } from './category-rfp.component';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule,MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {LoaderModule} from './../../loader/loader.module'
import { SlickModule } from 'ngx-slick';

const routes :Routes =[
  {
    path:'',component:CategoryRfpComponent
  }
]
@NgModule({
  imports: [
    CommonModule,LoaderModule,SlickModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoryRfpComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]

})
export class CategoryRfpModule { }


