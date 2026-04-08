import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BLOG_POSTS, BlogPost } from '../../../data/blog-posts';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = BLOG_POSTS;
  language: 'es' | 'en' = 'es';

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    this.language = lang === 'en' ? 'en' : 'es';

    this.seoService.updatePageSEO({
      title: this.language === 'es'
        ? 'IA y Futuro del Trabajo | Alex Vicente'
        : 'AI and Future of Work | Alex Vicente',
      description: this.language === 'es'
        ? 'Analisis sobre futuro del empleo, adaptacion profesional, velocidad de cambio por IA y transformacion del sector tecnologico.'
        : 'Analysis on the future of jobs, professional adaptation, AI-driven speed of change, and transformation in the technology sector.',
      keywords: this.language === 'es'
        ? 'Futuro del empleo, IA, trabajos del futuro, reconversion laboral, sector tecnologico'
        : 'Future of jobs, AI, workforce transformation, reskilling, technology sector',
      url: `https://alex-vicente.dev/${this.language}/blog`
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/blog',
      enPath: '/en/blog'
    });

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      inLanguage: this.language,
      name: this.language === 'es' ? 'IA y Futuro del Trabajo' : 'AI and Future of Work',
      url: `https://alex-vicente.dev/${this.language}/blog`
    });
  }

  getTitle(post: BlogPost): string {
    return this.language === 'es' ? post.titleEs : post.titleEn;
  }

  getExcerpt(post: BlogPost): string {
    return this.language === 'es' ? post.excerptEs : post.excerptEn;
  }

  getSlug(post: BlogPost): string {
    return this.language === 'es' ? post.slugEs : post.slugEn;
  }

  getYouTubeUrl(post: BlogPost): string {
    return post.youtubeUrl;
  }
}
