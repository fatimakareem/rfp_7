import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperloginComponent } from './superlogin.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule,MatIconModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { RecapchaModule } from '../recapcha/recapcha.module';

const routes: Routes = [
  {
    path: '', component: SuperloginComponent
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
    MatIconModule,
    RouterModule.forChild(routes),
    RecapchaModule
  ],
  declarations: [SuperloginComponent],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SuperLoginModule { }
