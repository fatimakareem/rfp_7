import { Routes } from '@angular/router';
import { SingleRfpComponent} from './single-rfp.component';

export const SingleRfpRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: SingleRfpComponent
        }]
    }
];
