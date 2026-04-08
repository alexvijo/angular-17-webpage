import { Routes } from '@angular/router';
import { AboutComponent } from './components/home/about/about.component';
import { BannerComponent } from './components/home/banner/banner.component';
import { ContactComponent } from './components/home/contact/contact.component';
import { JobsComponent } from './components/home/jobs/jobs.component';
import { MoreProjectsComponent } from './components/home/more-projects/more-projects.component';
import { BlogComponent } from './components/home/blog/blog.component';
import { BlogPostComponent } from './components/home/blog-post/blog-post.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/es/inicio',
        pathMatch: 'full',
    },
    {
        path: ':language/inicio',
        component: BannerComponent
    },
    {
        path: ':language/acerca-de-mi',
        component: AboutComponent
    },
    {
        path: ':language/me-interesa',
        component: JobsComponent
    },
    {
        path: ':language/ia-aplicada',
        component: MoreProjectsComponent
    },
    {
        path: ':language/blog',
        component: BlogComponent
    },
    {
        path: ':language/blog/:slug',
        component: BlogPostComponent
    },
    {
        path: ':language/contacto',
        component: ContactComponent
    },
    {
        path: ':language',
        component: BannerComponent
    },
    {
        path: '**',
        redirectTo: '/es/inicio',
    },
];
