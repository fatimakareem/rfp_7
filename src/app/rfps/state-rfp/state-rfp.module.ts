import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateRfpComponent } from './state-rfp.component';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule,MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {LoaderModule} from './../../loader/loader.module'
const routes :Routes =[
  {
    path:'',component:StateRfpComponent
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
    Ng2SearchPipeModule,
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StateRfpComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]

})
export class StateRfpModule { }


