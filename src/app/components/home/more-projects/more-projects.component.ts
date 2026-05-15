import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';
    this.isSpanish = isSpanish;

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'Proyectos propios - Repositorios GitHub y experimentos'
        : 'Own Projects - GitHub Repositories and experiments',
      description: isSpanish
        ? 'Listado de proyectos propios y repositorios de GitHub con pruebas y experimentos de desarrollo.'
        : 'List of own projects and GitHub repositories with development tests and experiments.',
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

    this.Projects = [
      {
        Title: isSpanish ? 'Vivienda Scraper' : 'Vivienda Scraper',
        Description: isSpanish
          ? 'Un buscador de viviendas en tiempo real que agrega resultados de múltiples portales inmobiliarios españoles con mapa interactivo integrado.'
          : 'Scraper to extract and analyze housing listings. A test and automation project on GitHub.',
        ghLink: 'https://github.com/alexvijo/vivienda-scraper',
        demoLink: 'https://github.com/alexvijo/vivienda-scraper',
        Technologies: ['Python', 'Scraping', 'Automation']
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
