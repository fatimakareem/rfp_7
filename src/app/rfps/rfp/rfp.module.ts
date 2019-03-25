import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RfpRoutes } from './rfp.routing';
import { RfpComponent } from './rfp.component';
import {MatTableModule} from '@angular/material';
import {MaterialModule} from '../../app.module';
// import { DataTableModule } from 'angular4-smart-table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RfpRoutes),
    FormsModule,
    MaterialModule,
    // DataTableModule
  ],
  declarations: [
  ],
  providers: [
  ]
})

export class RfpModule {}
