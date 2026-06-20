# GEO Audit Report: Alex Vicente Portfolio

**Audit Date:** 2026-06-20
**URL:** https://alex-vicente.dev
**Business Type:** Personal Portfolio / Agency (AI Developer & Software Engineer)
**Pages Analyzed:** 22 URLs (sitemap) + código fuente completo
**Auditor:** geo-seo-claude (análisis desde código fuente — SPA Angular sin SSR activo en prod)

---

## Executive Summary

**Overall GEO Score: 47/100 (Poor)**

El sitio tiene una base técnica sólida (robots.txt bien configurado, schema.org implementado, hreflang, Open Graph completo) pero sufre un problema crítico que anula casi todo el trabajo SEO: **es una SPA Angular desplegada en GitHub Pages sin prerendering**, lo que significa que los crawlers de Google, ChatGPT, Perplexity y Claude ven páginas vacías en todas las rutas excepto la homepage. El contenido del blog — el activo GEO más valioso del sitio — es invisible para los motores de IA.

### Score Breakdown

| Categoría | Score | Peso | Weighted Score |
|---|---|---|---|
| AI Citability | 55/100 | 25% | 13.75 |
| Brand Authority | 35/100 | 20% | 7.00 |
| Content E-E-A-T | 60/100 | 20% | 12.00 |
| Technical GEO | 40/100 | 15% | 6.00 |
| Schema & Structured Data | 55/100 | 10% | 5.50 |
| Platform Optimization | 30/100 | 10% | 3.00 |
| **Overall GEO Score** | | | **47.25/100** |

---

## 🔴 Critical Issues (Fix Immediately)

### 1. SPA sin prerendering — todo el contenido es invisible para crawlers
**Afecta:** todas las rutas excepto `/` (homepage)
**Evidencia:** WebFetch devuelve 404 en `/es/inicio`, `/es/blog/*`, `/es/acerca-de-mi`, etc. El `build:github-pages` usa `ng deploy` sin `--prerender`, y el `dist/` solo tiene el bundle de browser sin HTML prerrenderizado por ruta.
**Impacto:** Los 4 artículos del blog (el contenido GEO más valioso) son completamente invisibles para GPTBot, ClaudeBot, PerplexityBot y Googlebot. El schema `BlogPosting`, breadcrumbs y meta tags por página se generan via `SeoService` **solo en el navegador** — los crawlers nunca los ven.
**Fix:** Activar prerendering estático con `ng build --prerender` y definir las rutas en `angular.json`.

### 2. No existe `llms.txt`
**Afecta:** Visibilidad en LLMs (Claude, ChatGPT, Perplexity)
**Evidencia:** `https://alex-vicente.dev/llms.txt` → no existe.
**Impacto:** Los LLMs no tienen un fichero estructurado que les diga quién eres, qué haces y qué páginas son más relevantes. Es el equivalente moderno del `robots.txt` para IA.
**Fix:** Crear `/llms.txt` y `/llms-full.txt` en la raíz del sitio.

---

## 🟠 High Priority Issues (Fix Within 1 Week)

### 3. Schema `BlogPosting` solo se inyecta en el cliente
**Afecta:** `/es/blog/*`, `/en/blog/*`
**Evidencia:** `blog-post.component.ts:61` — `seoService.updateJsonLd()` se llama en `ngOnInit()`, que solo ejecuta en el browser. La comprobación `isPlatformBrowser` en `seo.service.ts:92` confirma que el JSON-LD **nunca se escribe en el servidor**.
**Fix:** Con prerendering activo esto se resuelve solo. Sin prerendering, mover el JSON-LD estático al `index.html` o usar transferState.

### 4. FAQ schema tiene acentos faltantes (datos corruptos)
**Afecta:** Schema FAQPage en homepage
**Evidencia:** `banner.component.ts:68-93` — las preguntas en español tienen acentos eliminados:
- `"Que tipo de proyectos desarrollo con IA?"` (falta acento en "Qué")
- `"Trabajo con modelos locales y en cloud?"` (falta "¿")
- Las respuestas también: `"Si. Diseno..."` → debería ser `"Sí. Diseño..."`

Esto degrada la calidad percibida por los LLMs que leen el schema.
**Fix:** Corregir acentos en `banner.component.ts`.

### 5. `publisher` en BlogPosting es `Person`, debería ser `Organization`
**Afecta:** Schema credibilidad en Google y LLMs
**Evidencia:** `blog-post.component.ts:78-81` — `publisher: { '@type': 'Person' }`. Google recomienda `Organization` para publisher.
**Fix:** Cambiar a `Organization` con logo.

### 6. Schema `Person` en `index.html` no tiene `@id` cross-reference consistente
**Afecta:** Entity recognition por LLMs
**Evidencia:** `index.html:50` — el `@id` es `https://alex-vicente.dev/#person` pero en `banner.component.ts:104` el schema `ProfilePage.mainEntity` no referencia ese `@id`, duplica la entidad.
**Fix:** En `banner.component.ts` usar `{ '@id': 'https://alex-vicente.dev/#person' }` en lugar de objeto completo.

---

## 🟡 Medium Priority Issues (Fix Within 1 Month)

### 7. Todos los posts tienen `publishedAt: '2026-05-03'` — misma fecha
**Afecta:** Freshness signals, E-E-A-T
**Evidencia:** `blog-posts.ts:37,60,83,106` — los 4 posts tienen la misma fecha.
**Fix:** Asignar fechas de publicación reales o escalonadas.

### 8. `dateModified` igual a `datePublished` en todos los posts
**Afecta:** Señales de contenido actualizado para Google y LLMs
**Evidencia:** `blog-post.component.ts:68-69` — `dateModified: this.post.publishedAt` (mismo valor).
**Fix:** Añadir campo `updatedAt` al tipo `BlogPost` y usarlo en `dateModified`.

### 9. Ausencia de schema `AboutPage` en `/acerca-de-mi`
**Afecta:** E-E-A-T, reconocimiento de entidad
**Fix:** Añadir schema `AboutPage` con `mainEntity: { '@id': '.../#person' }`.

### 10. Imagen OG no es 1200×630 real
**Afecta:** Social sharing, credibilidad
**Evidencia:** `index.html:21` — usa `picofme.png` (foto de perfil cuadrada). Las dimensiones declaradas son 1200×630 pero la imagen es probablemente cuadrada.
**Fix:** Crear una imagen OG real de 1200×630 px con branding del sitio.

### 11. Canonical en `index.html` apunta a la raíz, no a `/es/inicio`
**Afecta:** Señales de URL canónica para crawlers
**Evidencia:** `index.html:40` — `<link rel="canonical" href="https://alex-vicente.dev">` pero la homepage redirige a `/es/inicio`.
**Fix:** Canonical debería apuntar a `https://alex-vicente.dev/es/inicio` o la página principal real.

### 12. No hay schema `WebPage` individual en páginas internas (About, Contact, Projects)
**Afecta:** Comprensión de estructura por LLMs
**Fix:** Añadir schema básico en cada componente de página.

---

## 🟢 Low Priority Issues (Optimize When Possible)

### 13. `meta name="keywords"` en `index.html` tiene términos en inglés y español mezclados
**Evidencia:** `index.html:7` — `"Alex Vicente, Desarrollo con agentes IA, AI Engineer, LLM, MLOps, Angular..."`
**Fix:** Separar por idioma; el `index.html` es ES, usar solo keywords en español.

### 14. `meta name="language"` no es estándar
**Evidencia:** `index.html:12` — no existe el meta `language` como estándar HTML. Usar `<html lang="es">` (ya existe) es suficiente.
**Fix:** Eliminar `<meta name="language" content="es">`.

### 15. `meta name="revisit-after"` está obsoleto
**Evidencia:** `index.html:13` — ignorado por todos los crawlers modernos.
**Fix:** Eliminar.

### 16. Presencia en plataformas IA escasa
**Evidencia:** No hay artículos en Wikipedia, Reddit, o Medium verificados. Dev.to está en `sameAs` pero sin verificar contenido activo.
**Impacto:** Los LLMs priorizan entidades con presencia cross-platform para citaciones.

---

## Category Deep Dives

### AI Citability (55/100)
Los 4 artículos del blog tienen contenido de alta citabilidad: párrafos concisos de ~100-150 palabras, afirmaciones directas, ejemplos técnicos específicos. El artículo sobre Ollama tiene estructura de pasos numerados (ideal para extracción por LLMs). Sin embargo, **ningún crawler puede acceder a este contenido** sin prerendering. La homepage sí es accesible y tiene FAQ schema, pero el contenido es genérico.

**Puntos fuertes:** Longitud de párrafos adecuada, tono directo y factual, keywords técnicas específicas.
**Puntos débiles:** Contenido inaccesible para crawlers, sin headings H2/H3 dentro de los posts del blog, sin listas o tablas que faciliten extracción.

### Brand Authority (35/100)
El schema `Person.sameAs` lista GitHub, LinkedIn, Twitter y dev.to — buena base. Pero sin verificar presencia activa. No hay menciones en Wikipedia, Reddit, ni artículos externos que citen a Alex Vicente. El `publisher` sin logo y sin `Organization` schema reduce la autoridad percibida.

### Content E-E-A-T (60/100)
Los artículos demuestran experiencia real: referencias a herramientas específicas (LangSmith, LangGraph, Pinecone, LM Studio), casos de uso propios, stack real documentado. La bio del autor en el schema es correcta. El punto débil es que no hay bio del autor visible dentro de cada post (solo en schema), no hay fecha de actualización visible, y no hay enlaces a fuentes externas citadas.

### Technical GEO (40/100)
**Bien:** robots.txt permite GPTBot, ClaudeBot, PerplexityBot explícitamente. Meta robots `index,follow`. Open Graph completo. Twitter Card completo. hreflang ES/EN correcto. HTTPS activo.
**Mal:** Sin prerendering — crítico. Sin `llms.txt`. El SSR está implementado en código (`app.config.server.ts`) pero no activo en producción (GitHub Pages es hosting estático). El `SeoService` tiene guards `isPlatformBrowser` que impiden que el JSON-LD se sirva en server-side.

### Schema & Structured Data (55/100)
**Implementado:** `Person`, `WebSite` con `SearchAction`, `FAQPage`, `BlogPosting`, `BreadcrumbList`, `ProfilePage`.
**Problemas:** FAQ con acentos corruptos, `publisher` incorrecto, entidad `Person` duplicada, JSON-LD de páginas internas solo se inyecta en cliente, sin `AboutPage`, sin `Organization`.

### Platform Optimization (30/100)
Sin YouTube (el campo `youtubeUrl` en los posts está vacío en todos). Sin Wikipedia. LinkedIn y GitHub listados en schema pero sin contenido cruzado verificado. Sin `llms.txt` que guíe a los LLMs. Twitter/X activo pero sin verificar actividad.

---

## Quick Wins (Implement This Week)

1. **Activar prerendering** — `ng build --prerender` con rutas definidas. Desbloquea TODO el SEO/GEO del sitio de golpe. Estimado: 2-3 horas.
2. **Crear `llms.txt`** — fichero de 30 líneas que describe el sitio para LLMs. Estimado: 30 min.
3. **Corregir acentos en FAQ schema** (`banner.component.ts`) — 5 minutos, impacto en calidad de datos estructurados.
4. **Añadir `wordCount` y `articleBody` al schema `BlogPosting`** — mejora extracción por LLMs.
5. **Añadir `dateModified` real** añadiendo campo `updatedAt` a `BlogPost` type.

---

## 30-Day Action Plan

### Semana 1: Desbloquear crawlers (máximo impacto)
- [ ] Configurar prerendering en `angular.json` para las 11 rutas ES + 11 EN
- [ ] Ejecutar `ng build --prerender` y verificar que genera HTML por ruta
- [ ] Actualizar script `build:github-pages` para incluir prerendering
- [ ] Crear `llms.txt` en `/src/` (se copiará a la raíz en build)
- [ ] Corregir acentos en FAQ schema (`banner.component.ts`)

### Semana 2: Schema & Structured Data
- [ ] Añadir `Organization` schema con logo al publisher de BlogPosting
- [ ] Refactorizar entidad `Person` — usar `@id` reference en lugar de duplicar
- [ ] Añadir schema `AboutPage` en `about.component.ts`
- [ ] Añadir `wordCount` y `articleSection` al schema BlogPosting
- [ ] Añadir fechas reales/escalonadas a cada post y campo `updatedAt`

### Semana 3: Contenido E-E-A-T
- [ ] Añadir sección de bio del autor visible dentro de cada post del blog
- [ ] Añadir al menos 2-3 enlaces externos a fuentes en cada artículo
- [ ] Crear imagen OG real 1200×630 px
- [ ] Añadir H2/H3 headings dentro de los posts (actualmente solo párrafos planos)

### Semana 4: Brand Authority & Platform
- [ ] Publicar posts en dev.to (cross-post del blog)
- [ ] Crear hilo en Reddit r/MachineLearning o r/learnmachinelearning con el roadmap
- [ ] Añadir `llms-full.txt` con contenido completo de los artículos
- [ ] Verificar y completar perfil de LinkedIn con keywords del schema

---

## Appendix: Pages Analyzed

| URL | Estado | Issues GEO |
|---|---|---|
| https://alex-vicente.dev/ | ✅ Accesible | Schema correcto, canonical mejorable |
| https://alex-vicente.dev/es/inicio | ❌ 404 para crawlers | Sin prerendering |
| https://alex-vicente.dev/es/acerca-de-mi | ❌ 404 para crawlers | Sin prerendering, sin AboutPage schema |
| https://alex-vicente.dev/es/blog | ❌ 404 para crawlers | Sin prerendering |
| https://alex-vicente.dev/es/blog/roadmap-ingeniero-ia-2026 | ❌ 404 para crawlers | Sin prerendering, BlogPosting solo en cliente |
| https://alex-vicente.dev/es/blog/como-construyo-agentes-ia-en-producto | ❌ 404 para crawlers | Sin prerendering |
| https://alex-vicente.dev/es/blog/angular-llm-rag-en-produccion | ❌ 404 para crawlers | Sin prerendering |
| https://alex-vicente.dev/es/blog/openclaw-llm-studio-local-guia-paso-a-paso | ❌ 404 para crawlers | Sin prerendering |
| https://alex-vicente.dev/en/* | ❌ 404 para crawlers | Mismo problema en todas las rutas EN |
| https://alex-vicente.dev/robots.txt | ✅ Correcto | AI crawlers permitidos |
| https://alex-vicente.dev/sitemap.xml | ✅ Existe | 22 URLs mapeadas |
| https://alex-vicente.dev/llms.txt | ❌ No existe | Crear urgente |
