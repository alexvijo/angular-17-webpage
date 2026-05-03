import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-ai-systems',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  templateUrl: './ai-systems.component.html',
  styleUrl: './ai-systems.component.scss'
})
export class AiSystemsComponent implements OnInit {
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
        ? 'AI Systems - Arquitectura de agentes, LLM y RAG'
        : 'AI Systems - Agent, LLM and RAG architecture',
      description: this.language === 'es'
        ? 'Como diseno sistemas de IA con agentes, LLM, RAG y automatizacion inteligente: decisiones, trade-offs, observabilidad y resultados.'
        : 'How I design AI systems with agents, LLM, RAG, and intelligent automation: decisions, trade-offs, observability, and outcomes.',
      keywords: this.language === 'es'
        ? 'AI Developer, LLM Developer, AI Agents, RAG, arquitectura IA, observabilidad, MLOps'
        : 'AI Developer, LLM Developer, AI Agents, RAG, AI architecture, observability, MLOps',
      url: `https://alex-vicente.dev/${this.language}/ai-systems`,
      lang: this.language
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/ai-systems',
      enPath: '/en/ai-systems'
    });

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      inLanguage: this.language,
      headline: this.language === 'es'
        ? 'Como diseno sistemas de IA con agentes, LLM y RAG'
        : 'How I design AI systems with agents, LLM and RAG',
      author: {
        '@type': 'Person',
        name: 'Alex Vicente'
      },
      url: `https://alex-vicente.dev/${this.language}/ai-systems`
    });
  }
}
