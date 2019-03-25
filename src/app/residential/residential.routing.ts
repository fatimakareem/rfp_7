import { Routes } from '@angular/router';
import { DialogOverviewExample } from './residential.component';

export const ResidentialRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: DialogOverviewExample
        }
        ]
    }
];
