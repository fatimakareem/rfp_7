import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import {LoaderModule} from '../loader/loader.module'

const routes: Routes = [
  {
    path: '', component: ResultsComponent
  }
]
@NgModule({
  imports: [
    CommonModule,LoaderModule,ReactiveFormsModule, FormsModule,MatInputModule, MatFormFieldModule, MatSelectModule,
   
   
    RouterModule.forChild(routes)
  ],

  declarations: [ResultsComponent]
})
export class ResultsModule {


}

