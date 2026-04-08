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
    url?: string;
    author?: string;
  }) {
    const title = config.title;
    const description = config.description;
    const url = config.url || this.baseUrl;
    const image = config.image || this.defaultImage;
    const keywords = config.keywords || 'Alex Vicente, Developer, Angular, Software Engineer';

    // Title
    this.titleService.setTitle(title);

    // Meta tags
    this.updateMeta('name', 'description', description);
    this.updateMeta('name', 'keywords', keywords);
    this.updateMeta('name', 'author', config.author || 'Alex Vicente');
    this.updateMeta('name', 'viewport', 'width=device-width, initial-scale=1');

    // Open Graph for social sharing
    this.updateMeta('property', 'og:title', title);
    this.updateMeta('property', 'og:description', description);
    this.updateMeta('property', 'og:image', image);
    this.updateMeta('property', 'og:url', url);
    this.updateMeta('property', 'og:type', 'website');

    // Twitter Card
    this.updateMeta('name', 'twitter:card', 'summary_large_image');
    this.updateMeta('name', 'twitter:title', title);
    this.updateMeta('name', 'twitter:description', description);
    this.updateMeta('name', 'twitter:image', image);

    // Canonical URL
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

    const link: HTMLLinkElement =
      this.document.querySelector('link[rel="canonical"]') || this.document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    this.document.head.appendChild(link);
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
