import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentmethodsComponent } from './paymentmethods.component';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule,MatSelectModule,MatSlideToggleModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes :Routes =[
  {
    path:'',component:PaymentmethodsComponent
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
MatSlideToggleModule,
    Ng2SearchPipeModule,
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentmethodsComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]

})
export class PaymentmethodsModule { }