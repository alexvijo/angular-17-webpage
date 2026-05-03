
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
        ? 'Acerca de mi - Alex Vicente AI Developer'
        : 'About me - Alex Vicente AI Developer',
      description: isSpanish
        ? 'Conoce mi trayectoria profesional, habilidades y experiencia como AI Developer especializado en agentes IA, LLM y Angular.'
        : 'Learn about my professional background, skills and experience as an AI Developer specialized in AI agents, LLM, and Angular.',
      keywords: isSpanish
        ? 'Sobre mí, Experiencia, Habilidades, AI Developer, Angular, LLM'
        : 'About, Experience, Skills, AI Developer, Angular, LLM',
      url: `https://alex-vicente.dev/${lang}/acerca-de-mi`,
      lang
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/acerca-de-mi',
      enPath: '/en/acerca-de-mi'
    });

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: `https://alex-vicente.dev/${lang}/acerca-de-mi`,
      inLanguage: lang,
      mainEntity: {
        '@type': 'Person',
        '@id': 'https://alex-vicente.dev/#person',
        name: 'Alex Vicente',
        jobTitle: isSpanish ? 'AI Developer y Desarrollador de Software' : 'AI Developer and Software Engineer',
        url: 'https://alex-vicente.dev',
        sameAs: [
          'https://github.com/alexvijo',
          'https://www.linkedin.com/in/alexvicente/'
        ]
      }
    });
  }

  trackByFn(index: any, item: { id: any; }) {
    return item.id; // unique id corresponding to the item
  }

}
