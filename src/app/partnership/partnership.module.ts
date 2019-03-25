import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnershipComponent } from './partnership.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
const routes: Routes = [
  {
    path: '', component: PartnershipComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PartnershipComponent]
})
export class PartnershipModule { }