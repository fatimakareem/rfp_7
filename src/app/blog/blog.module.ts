import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '', component: BlogComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BlogModule { }