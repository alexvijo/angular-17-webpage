import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project } from '../../../models/Project.interface';
import { SeoService } from '../../../services/seo.service';
import { PixelCoderComponent } from '../../general/pixel-coder/pixel-coder.component';

@Component({
    selector: 'app-more-projects',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslateModule, NgbModule, NgbNavModule, RouterModule, PixelCoderComponent],
    templateUrl: './more-projects.component.html',
    styleUrl: './more-projects.component.scss'
})
export class MoreProjectsComponent implements OnInit {
  isSpanish = true;

  filteredProjects: Project[] = [];
  Projects: Project[] = [];

  constructor(
    private router: Router,
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';
    this.isSpanish = isSpanish;

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'Proyectos - Alex Vicente | AI Engineer · Full-stack'
        : 'Projects - Alex Vicente | AI Engineer · Full-stack',
      description: isSpanish
        ? 'Proyectos de Alex Vicente contados como problema, solución y resultado: RAG privado con IA local, agregador de vivienda y automatización de búsqueda de empleo.'
        : 'Projects by Alex Vicente told as problem, solution and result: private RAG with local AI, a housing aggregator and job-search automation.',
      keywords: isSpanish
        ? 'proyectos propios, github, repositorios, experimentos, portfolio'
        : 'own projects, github, repositories, experiments, portfolio',
      url: `https://alex-vicente.dev/${lang}/proyectos-propios`,
      lang
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/proyectos-propios',
      enPath: '/en/proyectos-propios'
    });

    this.seoService.updateBreadcrumb([
      { name: 'Alex Vicente', url: 'https://alex-vicente.dev' },
      { name: isSpanish ? 'Inicio' : 'Home', url: `https://alex-vicente.dev/${lang}/inicio` },
      { name: isSpanish ? 'Proyectos propios' : 'Own projects', url: `https://alex-vicente.dev/${lang}/proyectos-propios` },
    ]);

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      url: `https://alex-vicente.dev/${lang}/proyectos-propios`,
      inLanguage: lang,
      name: isSpanish ? 'Proyectos propios - Repositorios GitHub' : 'Own projects - GitHub repositories',
      description: isSpanish
        ? 'Listado de proyectos y repositorios de GitHub con pruebas y experimentos.'
        : 'List of projects and GitHub repositories with tests and experiments.',
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

    // Cada proyecto se cuenta como problema → solución → resultado, no como lista de tecnologías.
    this.Projects = [
      {
        Title: 'Private RAG',
        Description: isSpanish
          ? 'Problema: usar IA sobre documentación interna sin enviarla a terceros. Solución: chat RAG que responde sobre tus PDF, DOCX, XLSX, EPUB, TXT y CSV citando la fuente exacta de cada dato, con un LLM local (Ollama) u OpenAI. Resultado: respuestas verificables y datos que nunca salen del equipo.'
          : 'Problem: using AI on internal documents without sending them to third parties. Solution: a RAG chat that answers over your PDF, DOCX, XLSX, EPUB, TXT and CSV files citing the exact source of every fact, with a local LLM (Ollama) or OpenAI. Result: verifiable answers and data that never leaves the machine.',
        ghLink: 'https://github.com/alexvijo/private-rag',
        demoLink: 'https://github.com/alexvijo/private-rag',
        Technologies: ['RAG', 'FastAPI', 'ChromaDB', 'Ollama', 'Angular']
      },
      {
        Title: 'Vivienda Scraper',
        Description: isSpanish
          ? 'Problema: buscar piso obliga a revisar a mano varios portales con anuncios duplicados. Solución: buscador en tiempo real que agrega 6 portales inmobiliarios (Idealista, Fotocasa, Pisos.com, Habitaclia, YaEncontre, Trovimap) en un mapa interactivo, con filtros y caché de 30 minutos. Resultado: una sola búsqueda en lugar de seis.'
          : 'Problem: house hunting means checking several portals by hand, full of duplicate listings. Solution: a real-time search that aggregates 6 Spanish real-estate portals (Idealista, Fotocasa, Pisos.com, Habitaclia, YaEncontre, Trovimap) on an interactive map, with filters and a 30-minute cache. Result: one search instead of six.',
        ghLink: 'https://github.com/alexvijo/vivienda-scraper',
        demoLink: 'https://github.com/alexvijo/vivienda-scraper',
        Technologies: ['Python', 'FastAPI', 'Angular', 'Leaflet', 'SQLite']
      },
      {
        Title: 'Empleo Scraper',
        Description: isSpanish
          ? 'Problema: las ofertas relevantes se pierden entre portales y las mejores se cubren en horas. Solución: agregador que automatiza las búsquedas en portales de empleo españoles, deduplica resultados y los centraliza en un panel. Resultado: búsqueda de empleo automatizada en lugar de manual.'
          : 'Problem: relevant job offers get lost across portals and the best ones are filled within hours. Solution: an aggregator that automates searches on Spanish job portals, deduplicates results and centralizes them in one dashboard. Result: automated job search instead of manual.',
        ghLink: 'https://github.com/alexvijo/empleo-scraper',
        demoLink: 'https://github.com/alexvijo/empleo-scraper',
        Technologies: ['Python', 'FastAPI', 'Playwright', 'SQLAlchemy', 'Angular']
      }
    ];
    this.filteredProjects = [...this.Projects];
  }

  redirect(project: Project, event: Event) {
    const route = project.demoLink || project.ghLink;
    if (!route) {
      return;
    }

    const target = event.target as HTMLElement | null;
    const id = target?.id;
    if(id=='demoLink' || id=='ghLink' || id=='repoLink'){
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
