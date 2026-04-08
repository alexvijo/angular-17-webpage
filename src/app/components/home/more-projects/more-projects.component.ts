import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project } from '../../../models/Project.interface';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-more-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, NgbModule, NgbNavModule],
  templateUrl: './more-projects.component.html',
  styleUrl: './more-projects.component.scss'
})
export class MoreProjectsComponent implements OnInit {

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

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'IA Aplicada - Master en Inteligencia Artificial para Empresas'
        : 'Applied AI - Master in Applied Artificial Intelligence for Enterprise',
      description: isSpanish
        ? 'Índice completo de un Master en Inteligencia Artificial Aplicada para empresas. Cubre ML, Deep Learning, NLP, Computer Vision, Big Data, MLOps y más.'
        : 'Complete index of a Master in Applied Artificial Intelligence for enterprise. Covers ML, Deep Learning, NLP, Computer Vision, Big Data, MLOps and more.',
      keywords: isSpanish
        ? 'IA, Machine Learning, Deep Learning, NLP, Computer Vision, Big Data, MLOps'
        : 'AI, Machine Learning, Deep Learning, NLP, Computer Vision, Big Data, MLOps',
      url: `https://alex-vicente.dev/${lang}/ia-aplicada`
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
