import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project } from '../../../models/Project.interface';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-more-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, NgbModule, NgbNavModule, RouterModule],
  templateUrl: './more-projects.component.html',
  styleUrl: './more-projects.component.scss'
})
export class MoreProjectsComponent implements OnInit {
  isSpanish = true;

  filteredProjects: Project[] = [];
  Projects: Project[] = [];

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';
    this.isSpanish = isSpanish;

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'IA Aplicada - AI Projects, LLM y Agentes IA'
        : 'Applied AI - AI Projects, LLM and AI Agents',
      description: isSpanish
        ? 'Proyectos de IA aplicada con enfoque en AI Agents, LLM, RAG, automatizacion inteligente, metricas de impacto y arquitectura de produccion.'
        : 'Applied AI projects focused on AI Agents, LLM, RAG, intelligent automation, measurable impact, and production architecture.',
      keywords: isSpanish
        ? 'AI Developer, LLM Developer, AI Agents, RAG, IA aplicada, automatizacion, MLOps'
        : 'AI Developer, LLM Developer, AI Agents, RAG, Applied AI, automation, MLOps',
      url: `https://alex-vicente.dev/${lang}/ia-aplicada`,
      lang
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/ia-aplicada',
      enPath: '/en/ia-aplicada'
    });

    this.seoService.updateBreadcrumb([
      { name: 'Alex Vicente', url: 'https://alex-vicente.dev' },
      { name: isSpanish ? 'Inicio' : 'Home', url: `https://alex-vicente.dev/${lang}/inicio` },
      { name: isSpanish ? 'IA Aplicada' : 'Applied AI', url: `https://alex-vicente.dev/${lang}/ia-aplicada` },
    ]);

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      url: `https://alex-vicente.dev/${lang}/ia-aplicada`,
      inLanguage: lang,
      name: isSpanish ? 'IA Aplicada - Proyectos de AI' : 'Applied AI - AI Projects',
      description: isSpanish
        ? 'Proyectos de IA aplicada: AI Agents, LLM, RAG y automatización inteligente.'
        : 'Applied AI projects: AI Agents, LLM, RAG and intelligent automation.',
      author: {
        '@type': 'Person',
        '@id': 'https://alex-vicente.dev/#person',
        name: 'Alex Vicente'
      }
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
    });

    this.translateService.getTranslation(lang).subscribe((translations: any) => {
        if (translations && translations['OtherProjects.Projects']) {
            this.Projects = translations['OtherProjects.Projects'];
            this.filteredProjects = this.Projects;
          } else {
            console.error('OtherProjects.Projects is undefined');
          }
      });
  }

  redirect(route: string, event: any) {
    const id = event.target.id;
    if(id=='demoLink' || id=='ghLink'){
      return
    }
    window.open(route, '_blank');
  }

  filterProjects(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchString = target.value;

    if (this.Projects && searchString) {
      this.filteredProjects = this.Projects.filter((project: Project) =>
        project.Title.toLowerCase().includes(searchString.toLowerCase()) ||
        project.Description.toLowerCase().includes(searchString.toLowerCase())
      );
    } else {
      this.filteredProjects = this.Projects ? [...this.Projects] : [];
    }
  }

}
