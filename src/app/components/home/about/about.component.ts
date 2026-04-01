
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
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
        ? 'Acerca de mi - Alex Vicente Desarrollador de Software'
        : 'About me - Alex Vicente Software Developer',
      description: isSpanish
        ? 'Conoce mi trayectoria profesional, habilidades y experiencia como desarrollador especializado en Angular y tecnologías web modernas.'
        : 'Learn about my professional background, skills and experience as a developer specialized in Angular and modern web technologies.',
      keywords: isSpanish
        ? 'Sobre mí, Experiencia, Habilidades, Angular, Backend, Frontend'
        : 'About, Experience, Skills, Angular, Backend, Frontend',
      url: `https://alex-vicente.dev/${lang}/acerca-de-mi`
    });
  }

  trackByFn(index: any, item: { id: any; }) {
    return item.id; // unique id corresponding to the item
  }

}
