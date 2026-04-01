import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://alex-vicente.dev';
  private defaultImage = `${this.baseUrl}/assets/images/picofme.png`;

  constructor(
    private titleService: Title,
    private metaService: Meta
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

  private updateMeta(attrName: string, attrValue: string, content: string) {
    const selector = `meta[${attrName}="${attrValue}"]`;
    const element = document.querySelector(selector);

    if (element) {
      element.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute(attrName, attrValue);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  }

  private updateCanonicalUrl(url: string) {
    const link: HTMLLinkElement = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    document.head.appendChild(link);
  }
}
