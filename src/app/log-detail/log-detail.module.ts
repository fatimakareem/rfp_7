import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogDetailComponent } from './log-detail.component';
import { Routes, RouterModule } from '@angular/router';
import {LoaderModule} from '../loader/loader.module'
import { HttpClientModule } from '@angular/common/http';

import { MatNativeDateModule } from '@angular/material';
const routes: Routes = [
  {
    path: '', component: LogDetailComponent
  }
]
@NgModule({
  imports: [
    CommonModule,LoaderModule
    ,HttpClientModule,
   
    MatNativeDateModule,
  
    RouterModule.forChild(routes)
  ],

  declarations: [LogDetailComponent]
})
export class LogDetailModule {
 

}

