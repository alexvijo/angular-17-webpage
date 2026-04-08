# Alex Vicente - AI Engineer Portfolio

Sitio profesional en Angular orientado a visibilidad SEO para Google, agentes IA y reclutadores que buscan perfiles de Ingeniero IA.

## Objetivo SEO

Este proyecto esta optimizado para:
- Indexacion tecnica (meta tags, robots, sitemap, canonical, hreflang).
- Descubrimiento por agentes IA (llms.txt).
- Relevancia semantica para keywords de AI Engineer e Ingeniero IA.
- Contenido rastreable con blog activo y rutas dedicadas.

## Keywords Principales

- Ingeniero IA
- AI Engineer
- LLM
- RAG
- MLOps
- Angular
- TypeScript
- Software Engineer
- Agentes IA
- IA aplicada

## Estructura Relevante

- SEO base: src/index.html
- Reglas crawler: src/robots.txt
- Mapa del sitio: src/sitemap.xml
- AI crawler profile: src/llms.txt
- Blog: src/app/components/home/blog
- Posts: src/app/components/home/blog-post
- Dataset de posts: src/app/data/blog-posts.ts

## Ejecutar en local

1. Instalar dependencias:
   npm install
2. Iniciar proyecto:
   npm run start
3. Abrir:
   http://localhost:4200

## Build de produccion

- npm run build

## Checklist SEO aplicado

- Meta title y description orientados a AI Engineer.
- Open Graph y Twitter Cards configuradas.
- Canonical y hreflang base incluidos.
- JSON-LD para Person y WebSite.
- robots.txt con acceso para Googlebot y crawlers IA.
- sitemap.xml con rutas ES/EN, blog y posts.
- llms.txt con rutas clave para agentes IA.
- Blog activo con rutas rastreables por post.
- Copy optimizado en banner y secciones de proyectos IA.

## Backlinks (Plan de Ejecucion)

Los backlinks reales requieren publicacion externa. Para construir autoridad rapidamente:

1. LinkedIn:
   - Publicar 2-3 posts resumidos del blog.
   - Enlazar a rutas del blog y a la home.
2. GitHub profile README:
   - Incluir enlace al portfolio y al blog.
3. Medium o Dev.to:
   - Re-publicar versiones resumidas de 1-2 articulos.
4. Comunidades tecnicas:
   - Compartir casos practicos de LLM/RAG con enlace fuente.
5. Directorios profesionales:
   - Actualizar perfil con keyword AI Engineer + enlace al sitio.

## Nota importante

Este sitio es SPA en Angular. Para maximo rendimiento SEO en contenido dinamico a gran escala, considera incorporar pre-render o SSR en una iteracion futura.
