import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://alex-vicente.dev';
  private defaultImage = `${this.baseUrl}/assets/images/picofme.png`;
  private readonly managedAlternateSelector = 'link[rel="alternate"][data-seo-managed="true"]';
  private readonly managedJsonLdId = 'seo-jsonld-managed';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  updatePageSEO(config: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    imageAlt?: string;
    url?: string;
    author?: string;
    lang?: string;
  }) {
    const title = config.title;
    const description = config.description;
    const url = config.url || this.baseUrl;
    const image = config.image || this.defaultImage;
    const imageAlt = config.imageAlt || title;
    const keywords = config.keywords || 'Alex Vicente, Developer, Angular, Software Engineer';
    const lang = config.lang || 'es';
    const ogLocale = lang === 'en' ? 'en_US' : 'es_ES';
    const ogLocaleAlternate = lang === 'en' ? 'es_ES' : 'en_US';

    this.titleService.setTitle(title);

    this.updateMeta('name', 'description', description);
    this.updateMeta('name', 'keywords', keywords);
    this.updateMeta('name', 'author', config.author || 'Alex Vicente');
    this.updateMeta('name', 'viewport', 'width=device-width, initial-scale=1');

    // Open Graph
    this.updateMeta('property', 'og:title', title);
    this.updateMeta('property', 'og:description', description);
    this.updateMeta('property', 'og:image', image);
    this.updateMeta('property', 'og:image:alt', imageAlt);
    this.updateMeta('property', 'og:image:width', '1200');
    this.updateMeta('property', 'og:image:height', '630');
    this.updateMeta('property', 'og:url', url);
    this.updateMeta('property', 'og:type', 'website');
    this.updateMeta('property', 'og:locale', ogLocale);
    this.updateMeta('property', 'og:locale:alternate', ogLocaleAlternate);

    // Twitter Card
    this.updateMeta('name', 'twitter:card', 'summary_large_image');
    this.updateMeta('name', 'twitter:site', '@alexvijo');
    this.updateMeta('name', 'twitter:creator', '@alexvijo');
    this.updateMeta('name', 'twitter:title', title);
    this.updateMeta('name', 'twitter:description', description);
    this.updateMeta('name', 'twitter:image', image);
    this.updateMeta('name', 'twitter:image:alt', imageAlt);

    this.updateCanonicalUrl(url);
  }

  updateHreflangAlternates(paths: { esPath: string; enPath: string }) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document
      .querySelectorAll(this.managedAlternateSelector)
      .forEach((element) => element.remove());

    const esUrl = this.toAbsoluteUrl(paths.esPath);
    const enUrl = this.toAbsoluteUrl(paths.enPath);

    this.appendAlternateLink('es', esUrl);
    this.appendAlternateLink('en', enUrl);
    this.appendAlternateLink('x-default', enUrl);
  }

  updateJsonLd(schema: Record<string, unknown>) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const existingScript = this.document.getElementById(this.managedJsonLdId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = this.managedJsonLdId;
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  updateBreadcrumb(items: { name: string; url?: string }[]) {
    const listItems = items.map((item, index) => {
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      if (item.url) {
        entry['item'] = item.url;
      }
      return entry;
    });

    const existing = this.document.getElementById('seo-breadcrumb-jsonld');
    if (existing) existing.remove();

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seo-breadcrumb-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: listItems,
    });
    this.document.head.appendChild(script);
  }

  clearJsonLd() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.getElementById(this.managedJsonLdId)?.remove();
  }

  private updateMeta(attrName: string, attrValue: string, content: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const selector = `meta[${attrName}="${attrValue}"]`;
    const element = this.document.querySelector(selector);

    if (element) {
      element.setAttribute('content', content);
    } else {
      const meta = this.document.createElement('meta');
      meta.setAttribute(attrName, attrValue);
      meta.setAttribute('content', content);
      this.document.head.appendChild(meta);
    }
  }

  private updateCanonicalUrl(url: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private appendAlternateLink(hreflang: string, href: string) {
    const link = this.document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;
    link.setAttribute('data-seo-managed', 'true');
    this.document.head.appendChild(link);
  }

  private toAbsoluteUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }
}
