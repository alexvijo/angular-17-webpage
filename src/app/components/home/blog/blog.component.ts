import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
        ? 'Blog IA y Software | Alex Vicente'
        : 'AI and Software Blog | Alex Vicente',
      description: this.language === 'es'
        ? 'Blog sobre Ingenieria IA, agentes, LLM, RAG, MLOps y desarrollo de producto con Angular.'
        : 'Blog about AI Engineering, agents, LLM, RAG, MLOps, and product development with Angular.',
      keywords: this.language === 'es'
        ? 'Blog IA, Ingeniero IA, LLM, RAG, MLOps, Angular'
        : 'AI Blog, AI Engineer, LLM, RAG, MLOps, Angular',
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
}
