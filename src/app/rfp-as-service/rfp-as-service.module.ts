import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfpAsServiceComponent } from './rfp-as-service.component';
import { Routes, RouterModule} from '@angular/router';
import {LoaderModule} from '../loader/loader.module'

const routes :Routes =[
  {
    path:'',component:RfpAsServiceComponent
  }
]
@NgModule({
  imports: [
    CommonModule,LoaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RfpAsServiceComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class RfpAsServiceModule { }


