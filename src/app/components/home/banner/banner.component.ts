import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule
],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    trigger('bannerTrigger', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class BannerComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'Alex Vicente - Desarrollo software con agentes IA'
        : 'Alex Vicente - AI Software Developer for Agentic Products',
      description: isSpanish
        ? 'Desarrollo software con agentes IA, arquitectura Angular y productos digitales orientados a negocio.'
        : 'I build AI software with agents, Angular architecture, and business-driven digital products.',
      keywords: isSpanish
        ? 'Alex Vicente, Desarrollo con agentes IA, AI Developer, Angular, TypeScript, Producto digital'
        : 'Alex Vicente, AI Developer, Agentic AI, Angular, TypeScript, Product Engineering',
      url: `https://alex-vicente.dev/${lang}/inicio`
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/inicio',
      enPath: '/en/inicio'
    });

    const faqItems = isSpanish
      ? [
          {
            question: 'Que tipo de proyectos desarrollo con IA?',
            answer: 'Desarrollo asistentes con agentes IA, integraciones LLM, automatizaciones y experiencias web de producto con Angular.'
          },
          {
            question: 'Trabajo con modelos locales y en cloud?',
            answer: 'Si. Diseno soluciones con LM Studio y Ollama en local, y tambien con proveedores cloud segun coste, latencia y seguridad.'
          },
          {
            question: 'Que stack tecnico utilizo?',
            answer: 'Angular, TypeScript, APIs, evaluacion de prompts, observabilidad y buenas practicas de despliegue continuo.'
          }
        ]
      : [
          {
            question: 'What kind of AI projects do I build?',
            answer: 'I build agentic assistants, LLM integrations, automations, and product-ready web experiences with Angular.'
          },
          {
            question: 'Do I work with local and cloud models?',
            answer: 'Yes. I design solutions with local stacks like LM Studio and Ollama, and cloud providers based on cost, latency, and security.'
          },
          {
            question: 'What is my core technical stack?',
            answer: 'Angular, TypeScript, APIs, prompt evaluation, observability, and continuous delivery best practices.'
          }
        ];

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage',
          url: `https://alex-vicente.dev/${lang}/inicio`,
          inLanguage: isSpanish ? 'es' : 'en',
          mainEntity: {
            '@type': 'Person',
            name: 'Alex Vicente',
            jobTitle: isSpanish ? 'Desarrollo software con agentes IA' : 'AI Software Developer',
            url: 'https://alex-vicente.dev',
            sameAs: [
              'https://github.com/alexvijo',
              'https://www.linkedin.com/in/alexvicente/'
            ]
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
        }
      ]
    });
  }

}
