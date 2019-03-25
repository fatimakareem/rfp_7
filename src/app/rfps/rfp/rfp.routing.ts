import { Routes } from '@angular/router';

import { RfpComponent } from './rfp.component';

export const RfpRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'rfp',
        component: RfpComponent
    }]
    }
];
