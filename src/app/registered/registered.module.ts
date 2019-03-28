import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredComponent } from './registered.component';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule,MatSelectModule,MatIconModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { RecapchaModule } from '../recapcha/recapcha.module';
import { InternationalPhoneModule } from 'ng4-intl-phone';

const routes :Routes =[
  {
    path:'',component:RegisteredComponent
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
    TextMaskModule,MatIconModule,
    RouterModule.forChild(routes),RecapchaModule,InternationalPhoneModule
  ],
  declarations: [RegisteredComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class RegisteredModule { }

