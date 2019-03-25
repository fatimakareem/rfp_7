import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleblogComponent } from './singleblog.component';
import { Routes, RouterModule} from '@angular/router';
const routes :Routes =[
  {
    path:'',component:SingleblogComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SingleblogComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class SingleblogModule { }


