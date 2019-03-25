import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
const routes: Routes = [
  {
    path: '', component: ContactUsComponent
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
  declarations: [ContactUsComponent]
})
export class ContactUsModule { }