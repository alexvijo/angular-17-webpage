
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

  readonly tools = [
    { name: 'FortiClient', icon: 'https://cdn.simpleicons.org/fortinet/8892b0' },
    { name: 'Visual Studio Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Claude Code', icon: 'https://cdn.simpleicons.org/claude/8892b0' },
    { name: 'Jira', icon: 'https://cdn.simpleicons.org/jira/8892b0' },
    { name: 'Bitbucket', icon: 'https://cdn.simpleicons.org/bitbucket/8892b0' },
    { name: 'Microsoft Teams', emoji: '💬' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/8892b0' },
    { name: 'SonarQube', icon: 'https://cdn.simpleicons.org/sonarqubeserver/8892b0' },
  ];

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'Sobre mí - Alex Vicente | AI Engineer · Full-stack'
        : 'About me - Alex Vicente | AI Engineer · Full-stack',
      description: isSpanish
        ? 'Ingeniero de software generalista: producto, frontend, backend e IA en producción. Resuelvo problemas de principio a fin con criterio y calidad.'
        : 'Generalist software engineer: product, frontend, backend and AI in production. I solve problems end to end with judgment and quality.',
      keywords: isSpanish
        ? 'Alex Vicente, AI Engineer, Ingeniero IA, Ingeniero de software generalista, Forward Deployed Engineer, AI Developer, Agentes IA, MCP, RAG, Seguridad LLM, LLMOps, LangGraph, LangChain, LangSmith, Claude Code, Ollama, Desarrollador Full Stack, Desarrollador Angular, TypeScript, Node.js, NestJS, Spring Boot, CI/CD, Docker, Clean Code, remoto España'
        : 'Alex Vicente, AI Engineer, Generalist Software Engineer, Forward Deployed Engineer, AI Developer, AI Agents, MCP, RAG, LLM Security, LLMOps, LangGraph, LangChain, LangSmith, Claude Code, Ollama, Full Stack Developer, Angular Developer, TypeScript, Node.js, NestJS, Spring Boot, CI/CD, Docker, Clean Code, remote Spain',
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
          jobTitle: isSpanish ? 'Ingeniero de Software generalista y AI Engineer' : 'Generalist Software Engineer and AI Engineer',
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
