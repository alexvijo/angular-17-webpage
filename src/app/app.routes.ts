import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/es',
        pathMatch: 'full',
    },
    {
        path: ':language',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: '/es',
    },
];
