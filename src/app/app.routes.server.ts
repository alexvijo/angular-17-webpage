import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_POSTS } from './data/blog-posts';

const languages = ['es', 'en'];

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: ':language/inicio',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => languages.map(lang => ({ language: lang })),
  },
  {
    path: ':language/acerca-de-mi',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => languages.map(lang => ({ language: lang })),
  },
  {
    path: ':language/me-interesa',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => languages.map(lang => ({ language: lang })),
  },
  {
    path: ':language/proyectos-propios',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => languages.map(lang => ({ language: lang })),
  },
  {
    path: ':language/ia-y-futuro-del-trabajo',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => languages.map(lang => ({ language: lang })),
  },
  {
    path: ':language/blog',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => languages.map(lang => ({ language: lang })),
  },
  {
    path: ':language/blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const params: { language: string; slug: string }[] = [];
      for (const post of BLOG_POSTS) {
        params.push({ language: 'es', slug: post.slugEs });
        params.push({ language: 'en', slug: post.slugEn });
      }
      return params;
    },
  },
  {
    path: ':language/contacto',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => languages.map(lang => ({ language: lang })),
  },
  {
    path: ':language',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => languages.map(lang => ({ language: lang })),
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
