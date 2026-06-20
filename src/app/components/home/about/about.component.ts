
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-about',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslateModule, NgbModule, NgbNavModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'Acerca de mi - Alex Vicente AI Developer'
        : 'About me - Alex Vicente AI Developer',
      description: isSpanish
        ? 'Conoce mi trayectoria profesional, habilidades y experiencia como AI Developer especializado en agentes IA, LLM y Angular.'
        : 'Learn about my professional background, skills and experience as an AI Developer specialized in AI agents, LLM, and Angular.',
      keywords: isSpanish
        ? 'Alex Vicente,Desarrollador Angular, Programador Angular, Desarrollador Frontend, Desarrollador Backend, Desarrollador Full Stack, Programador Full Stack, Programador Frontend, Angular España remoto, AI Developer, Angular 18, Angular 20, TypeScript, RxJS, NgRx, Node.js, NestJS, Spring Boot, Microfrontends, Standalone Components, LangGraph, LangChain, RAG, Agentes IA, Claude Code, CI/CD, Docker, Scrum, Clean Code, MLOps, LangSmith, Ollama'
        : 'Alex Vicente,Angular Developer, Angular Programmer, Frontend Developer, Backend Developer, Full Stack Developer, Angular Developer Spain remote, AI Developer, Angular 18, Angular 20, TypeScript, RxJS, NgRx, Node.js, NestJS, Spring Boot, Microfrontends, LangGraph, LangChain, RAG, AI Agents, Claude Code, CI/CD, Docker, Scrum, Clean Code, MLOps, LangSmith, Ollama',
      url: `https://alex-vicente.dev/${lang}/acerca-de-mi`,
      lang
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/acerca-de-mi',
      enPath: '/en/acerca-de-mi'
    });

    this.seoService.updateBreadcrumb([
      { name: 'Alex Vicente', url: 'https://alex-vicente.dev' },
      { name: isSpanish ? 'Inicio' : 'Home', url: `https://alex-vicente.dev/${lang}/inicio` },
      { name: isSpanish ? 'Acerca de mí' : 'About me', url: `https://alex-vicente.dev/${lang}/acerca-de-mi` },
    ]);

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': `https://alex-vicente.dev/${lang}/acerca-de-mi`,
          url: `https://alex-vicente.dev/${lang}/acerca-de-mi`,
          inLanguage: lang,
          name: isSpanish ? 'Acerca de mí - Alex Vicente' : 'About me - Alex Vicente',
          description: isSpanish
            ? 'Trayectoria profesional, habilidades y experiencia de Alex Vicente como AI Developer especializado en agentes IA, LLM y Angular.'
            : 'Professional background, skills and experience of Alex Vicente as an AI Developer specialized in AI agents, LLM, and Angular.',
          mainEntity: { '@id': 'https://alex-vicente.dev/#person' }
        },
        {
          '@type': 'Person',
          '@id': 'https://alex-vicente.dev/#person',
          name: 'Alex Vicente',
          jobTitle: isSpanish ? 'AI Developer y Desarrollador de Software' : 'AI Developer and Software Engineer',
          url: 'https://alex-vicente.dev',
          knowsAbout: [
            'Angular', 'Angular 18', 'Angular 20', 'TypeScript', 'RxJS', 'NgRx',
            'Standalone Components', 'Microfrontends', 'Angular Material',
            'Node.js', 'NestJS', 'Express.js', 'FastAPI', 'Spring Boot',
            'REST API', 'Server-Sent Events', 'WebSockets',
            'Artificial Intelligence', 'Large Language Models', 'RAG', 'AI Agents',
            'LangGraph', 'LangChain', 'LangSmith', 'MLOps', 'Ollama', 'Claude Code',
            'Python', 'Docker', 'CI/CD', 'GitHub Actions', 'Jenkins', 'SonarQube',
            'MongoDB', 'SQL', 'Chroma', 'Pinecone',
            'Scrum', 'Kanban', 'Clean Code', 'Software Architecture',
            'Trabajo remoto España', 'Angular developer Spain',
            'Desarrollador', 'Programador', 'Developer',
            'Frontend', 'Backend', 'Full Stack', 'Desarrollador Full Stack', 'Programador Full Stack'
          ],
          sameAs: [
            'https://github.com/alexvijo',
            'https://www.linkedin.com/in/alexvicente/',
            'https://twitter.com/alexvijo',
            'https://dev.to/alexvijo'
          ]
        }
      ]
    });
  }

  trackByFn(index: any, item: { id: any; }) {
    return item.id; // unique id corresponding to the item
  }

}
