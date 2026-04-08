import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/es/inicio',
        pathMatch: 'full',
    },
    {
        path: ':language/inicio',
        loadComponent: () => import('./components/home/banner/banner.component').then((m) => m.BannerComponent)
    },
    {
        path: ':language/acerca-de-mi',
        loadComponent: () => import('./components/home/about/about.component').then((m) => m.AboutComponent)
    },
    {
        path: ':language/me-interesa',
        loadComponent: () => import('./components/home/jobs/jobs.component').then((m) => m.JobsComponent)
    },
    {
        path: ':language/ia-aplicada',
        loadComponent: () => import('./components/home/more-projects/more-projects.component').then((m) => m.MoreProjectsComponent)
    },
    {
        path: ':language/ai-systems',
        loadComponent: () => import('./components/home/ai-systems/ai-systems.component').then((m) => m.AiSystemsComponent)
    },
    {
        path: ':language/blog',
        loadComponent: () => import('./components/home/blog/blog.component').then((m) => m.BlogComponent)
    },
    {
        path: ':language/blog/:slug',
        loadComponent: () => import('./components/home/blog-post/blog-post.component').then((m) => m.BlogPostComponent)
    },
    {
        path: ':language/contacto',
        loadComponent: () => import('./components/home/contact/contact.component').then((m) => m.ContactComponent)
    },
    {
        path: ':language',
        loadComponent: () => import('./components/home/banner/banner.component').then((m) => m.BannerComponent)
    },
    {
        path: '**',
        redirectTo: '/es/inicio',
    },
];
