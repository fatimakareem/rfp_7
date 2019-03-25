import { Routes } from '@angular/router';
import { RegisteredComponent } from './registered.component';

export const RegisteredRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: 'registered',
            component: RegisteredComponent
        }]
    }
];
