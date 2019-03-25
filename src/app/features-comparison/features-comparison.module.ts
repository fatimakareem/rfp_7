import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComparisonComponent } from '../features-comparison/features-comparison.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '', component: FeaturesComparisonComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeaturesComparisonComponent]
})
export class FeaturesComparisonModule { }