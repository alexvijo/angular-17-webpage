import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { SkillsFolderComponent } from './skills-folder/skills-folder.component';

@Component({
    selector: 'app-banner',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TranslateModule,
        SkillsFolderComponent,
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
        ? 'Alex Vicente - AI Engineer | Ingeniero de IA'
        : 'Alex Vicente - AI Engineer',
      description: isSpanish
        ? 'AI Engineer que lleva productos con IA de la idea a producción: agentes, integraciones LLM y MCP, RAG, seguridad y despliegue. Para empresas y clientes directos, en remoto desde España.'
        : 'AI Engineer taking AI products from idea to production: agents, LLM and MCP integrations, RAG, security and deployment. For companies and direct clients, remote from Spain.',
      keywords: isSpanish
        ? 'Alex Vicente, AI Engineer, Ingeniero IA, Ingeniero de IA freelance, Forward Deployed Engineer, AI Developer, LLM Developer, Agentes IA, MCP, Model Context Protocol, RAG, Seguridad LLM, Prompt Injection, LLMOps, Claude Code, IA Native, LangGraph, LangChain, Automatización con IA, Desarrollador Full Stack, Desarrollador Angular, TypeScript, Node.js, NestJS, Spring Boot, CI/CD, Docker, remoto España'
        : 'Alex Vicente, AI Engineer, Freelance AI Engineer, Forward Deployed Engineer, AI Developer, LLM Developer, AI Agents, MCP, Model Context Protocol, RAG, LLM Security, Prompt Injection, LLMOps, Claude Code, AI Native, LangGraph, LangChain, AI Automation, Full Stack Developer, Angular Developer, TypeScript, Node.js, NestJS, Spring Boot, CI/CD, Docker, remote Spain',
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
            question: '¿Qué hace un AI Engineer end-to-end?',
            answer: 'Diseño, desarrollo, pruebo y despliego productos completos que integran modelos de IA existentes: agentes con LangGraph y LangChain, integraciones LLM vía API y MCP, RAG sobre datos internos y automatizaciones, con observabilidad y control de costes.'
          },
          {
            question: '¿Trabajo con empresas y con clientes directos?',
            answer: 'Sí. Me incorporo a equipos de producto en remoto para empresas de España y Europa, y también desarrollo soluciones con IA llave en mano para pequeñas empresas y clientes directos.'
          },
          {
            question: '¿Cómo garantizo la seguridad y calidad en sistemas con IA?',
            answer: 'Aplico guardrails y defensas frente a prompt injection, protejo los datos sensibles y valido cada cambio con testing, evaluación de prompts y CI/CD. Uso Claude Code para desarrollo IA-native y modelos locales con Ollama cuando la privacidad lo requiere.'
          },
          {
            question: '¿Qué stack técnico utilizo?',
            answer: 'APIs de LLM, MCP, LangGraph, LangSmith, Angular, TypeScript, Node.js, NestJS, FastAPI y Spring Boot, con MongoDB, SQL y bases de datos vectoriales como Chroma y Pinecone. Despliegue con Docker y GitHub Actions.'
          }
        ]
      : [
          {
            question: 'What does an end-to-end AI Engineer do?',
            answer: 'I design, build, test and deploy complete products on top of existing AI models: agents with LangGraph and LangChain, LLM integrations through APIs and MCP, RAG over internal data and automations, with observability and cost control.'
          },
          {
            question: 'Do I work with companies and direct clients?',
            answer: 'Yes. I join product teams remotely for companies in Spain and Europe, and I also deliver turnkey AI solutions for small businesses and direct clients.'
          },
          {
            question: 'How do I ensure security and quality in AI systems?',
            answer: 'I apply guardrails and prompt-injection defenses, protect sensitive data and validate every change with testing, prompt evaluation and CI/CD. I use Claude Code for AI-native development and local models with Ollama when privacy requires it.'
          },
          {
            question: 'What is my technical stack?',
            answer: 'LLM APIs, MCP, LangGraph, LangSmith, Angular, TypeScript, Node.js, NestJS, FastAPI and Spring Boot, with MongoDB, SQL and vector databases like Chroma and Pinecone. Deployment with Docker and GitHub Actions.'
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
            jobTitle: 'AI Engineer',
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
