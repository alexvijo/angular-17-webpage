import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BLOG_POSTS, BlogPost } from '../../../data/blog-posts';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {
  language: 'es' | 'en' = 'es';
  post: BlogPost | null = null;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.language = lang === 'en' ? 'en' : 'es';

    this.post = BLOG_POSTS.find((item) => {
      return this.language === 'es' ? item.slugEs === slug : item.slugEn === slug;
    }) || null;

    if (!this.post) {
      this.seoService.clearJsonLd();
      return;
    }

    const title = this.language === 'es' ? this.post.titleEs : this.post.titleEn;
    const description = this.language === 'es' ? this.post.excerptEs : this.post.excerptEn;
    const canonicalSlug = this.language === 'es' ? this.post.slugEs : this.post.slugEn;

    this.seoService.updatePageSEO({
      title: `${title} | Alex Vicente`,
      description,
      keywords: this.post.keywords.join(', '),
      url: `https://alex-vicente.dev/${this.language}/blog/${canonicalSlug}`,
      lang: this.language
    });

    this.seoService.updateHreflangAlternates({
      esPath: `/es/blog/${this.post.slugEs}`,
      enPath: `/en/blog/${this.post.slugEn}`
    });

    this.seoService.updateBreadcrumb([
      { name: 'Alex Vicente', url: 'https://alex-vicente.dev' },
      { name: this.language === 'es' ? 'Inicio' : 'Home', url: `https://alex-vicente.dev/${this.language}/inicio` },
      { name: 'Blog', url: `https://alex-vicente.dev/${this.language}/blog` },
      { name: title },
    ]);

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image: 'https://alex-vicente.dev/assets/images/picofme.png',
      datePublished: this.post.publishedAt,
      dateModified: this.post.publishedAt,
      inLanguage: this.language,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://alex-vicente.dev/${this.language}/blog/${canonicalSlug}`
      },
      author: {
        '@type': 'Person',
        name: 'Alex Vicente',
        url: 'https://alex-vicente.dev'
      },
      publisher: {
        '@type': 'Person',
        name: 'Alex Vicente'
      },
      keywords: this.post.keywords.join(', ')
    });
  }

  getTitle(post: BlogPost): string {
    return this.language === 'es' ? post.titleEs : post.titleEn;
  }

  getParagraphs(post: BlogPost): string[] {
    return this.language === 'es' ? post.bodyEs : post.bodyEn;
  }
}
