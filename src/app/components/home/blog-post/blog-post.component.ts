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
      return;
    }

    const title = this.language === 'es' ? this.post.titleEs : this.post.titleEn;
    const description = this.language === 'es' ? this.post.excerptEs : this.post.excerptEn;
    const canonicalSlug = this.language === 'es' ? this.post.slugEs : this.post.slugEn;

    this.seoService.updatePageSEO({
      title: `${title} | Alex Vicente`,
      description,
      keywords: this.post.keywords.join(', '),
      url: `https://alex-vicente.dev/${this.language}/blog/${canonicalSlug}`
    });
  }

  getTitle(post: BlogPost): string {
    return this.language === 'es' ? post.titleEs : post.titleEn;
  }

  getParagraphs(post: BlogPost): string[] {
    return this.language === 'es' ? post.bodyEs : post.bodyEn;
  }
}
