import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule,MatSlideToggleModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
const routes: Routes = [
  {
    path: '', component: PricingComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PricingComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PricingModule { }
