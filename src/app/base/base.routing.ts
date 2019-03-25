import { Routes } from '@angular/router';
import { BaseComponent } from './base.component';
export const BaseRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'base',
            component: BaseComponent
        }]
    }
];
