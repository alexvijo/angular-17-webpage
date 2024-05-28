import { Routes } from '@angular/router';
import { ArchiveComponent } from './components/archive/archive.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: ':language?',      component: HomeComponent},
    {path: '**', pathMatch: 'full', redirectTo: '/es'},
];
