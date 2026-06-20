import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { PixelCoderComponent } from './pixel-coder/pixel-coder.component';

@Component({
    selector: 'app-banner',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TranslateModule,
        PixelCoderComponent,
    ],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss',
    animations: [
        trigger('bannerTrigger', [
            transition(":enter", [
                query("*", [
                    style({ opacity: 0, transform: "translateX(-50px)" }),
                    stagger(50, [
                        animate("250ms cubic-bezier(0.35, 0, 0.25, 1)", style({ opacity: 1, transform: "none" }))
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
        ? 'Alex Vicente - Desarrollador de IA | AI Developer'
        : 'Alex Vicente - AI Developer | Desarrollador de IA',
      description: isSpanish
        ? 'Desarrollador Angular y AI Developer con experiencia en agentes IA, LLM, RAG, TypeScript, RxJS, Node.js y arquitectura frontend orientada a negocio. Disponible para proyectos remotos en España.'
        : 'Angular Developer and AI Developer with experience in AI agents, LLM, RAG, TypeScript, RxJS, Node.js, and business-focused frontend architecture. Available for remote projects in Spain.',
      keywords: isSpanish
        ? 'Alex Vicente,Desarrollador Angular, Programador Angular, Developer Angular, Desarrollador Frontend, Desarrollador Backend, Desarrollador Full Stack, Programador Full Stack, AI Developer, Angular remoto España, LLM Developer, Agentes IA, RAG, TypeScript, RxJS, NgRx, Node.js, Spring Boot, CI/CD, Docker, Microfrontends, Claude Code, IA Native, Angular 18, Angular 20, NestJS, REST API, Scrum, Clean Code, SonarQube, LangGraph, LangChain, MLOps'
        : 'Alex Vicente,Angular Developer, Angular Programmer, Frontend Developer, Backend Developer, Full Stack Developer, Angular Developer Spain remote, AI Developer, LLM Developer, AI Agents, RAG, TypeScript, RxJS, NgRx, Node.js, Microfrontends, Claude Code, AI Native, Angular 18, Angular 20, NestJS, REST API, LangGraph, LangChain, MLOps',
      url: `https://alex-vicente.dev/${lang}/inicio`,
      lang
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/inicio',
      enPath: '/en/inicio'
    });

    this.seoService.updateBreadcrumb([
      { name: 'Alex Vicente', url: 'https://alex-vicente.dev' },
      { name: isSpanish ? 'Inicio' : 'Home', url: `https://alex-vicente.dev/${lang}/inicio` },
    ]);

    const faqItems = isSpanish
      ? [
          {
            question: '¿Qué stack técnico utilizo como desarrollador Angular?',
            answer: 'Angular 18-20, TypeScript, RxJS, NgRx, Angular Material, Node.js, REST APIs, CI/CD con GitHub Actions, Docker y SonarQube. También trabajo con microfrontends y standalone components.'
          },
          {
            question: '¿Estoy disponible para trabajo remoto en España?',
            answer: 'Sí, trabajo en modalidad 100% remoto para empresas en España y Europa. Tengo experiencia en equipos distribuidos con metodologías ágiles (Scrum, Kanban) y herramientas como Jira y Confluence.'
          },
          {
            question: '¿Qué experiencia tengo en IA aplicada al desarrollo?',
            answer: 'Desarrollo agentes IA con LangGraph y LangChain, pipelines RAG, integraciones LLM con Angular, y uso de Claude Code y Claude Code para desarrollo IA-native. Experiencia con MLOps, LangSmith y modelos locales con Ollama.'
          },
          {
            question: '¿Trabajo con backend además de frontend Angular?',
            answer: 'Sí. Trabajo como Full Stack con Node.js, Express, NestJS, FastAPI y Spring Boot. Manejo MongoDB, SQL y bases de datos vectoriales como Chroma y Pinecone.'
          }
        ]
      : [
          {
            question: 'What is my Angular technical stack?',
            answer: 'Angular 18-20, TypeScript, RxJS, NgRx, Angular Material, Node.js, REST APIs, CI/CD with GitHub Actions, Docker, and SonarQube. I also work with microfrontends and standalone components.'
          },
          {
            question: 'Am I available for remote work in Spain?',
            answer: 'Yes, I work 100% remotely for companies in Spain and Europe. I have experience in distributed teams with agile methodologies (Scrum, Kanban) and tools like Jira and Confluence.'
          },
          {
            question: 'What is my experience in AI-native development?',
            answer: 'I build AI agents with LangGraph and LangChain, RAG pipelines, LLM integrations with Angular, and use Claude Code and Claude Code for AI-native development. Experience with MLOps, LangSmith, and local models with Ollama.'
          },
          {
            question: 'Do I work with backend as well as Angular frontend?',
            answer: 'Yes. I work as Full Stack with Node.js, Express, NestJS, FastAPI, and Spring Boot. I handle MongoDB, SQL, and vector databases like Chroma and Pinecone.'
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
            jobTitle: isSpanish ? 'Desarrollador de IA' : 'AI Developer',
            url: 'https://alex-vicente.dev',
            sameAs: [
              'https://github.com/alexvijo',
              'https://www.linkedin.com/in/alexvicente/',
              'https://twitter.com/alexvijo',
              'https://dev.to/alexvijo',
              'https://alex-vicente.dev'
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
