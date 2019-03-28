import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule,MatIconModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { RecapchaModule } from '../recapcha/recapcha.module';

const routes: Routes = [
  {
    path: '', component: LoginComponent
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
    RecapchaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginModule { }
