
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-contact',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TranslateModule
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'Contacto - Alex Vicente AI Developer'
        : 'Contact - Alex Vicente AI Developer',
      description: isSpanish
        ? 'Ponte en contacto conmigo por email o LinkedIn. Estaré encantado de hablar sobre proyectos de IA, agentes y colaboraciones.'
        : 'Get in touch with me by email or LinkedIn. Happy to discuss AI projects, agents, and collaboration opportunities.',
      keywords: isSpanish
        ? 'Contacto, Email, LinkedIn, Consultoría, AI Developer, Agentes IA'
        : 'Contact, Email, LinkedIn, Consulting, AI Developer, AI Agents',
      url: `https://alex-vicente.dev/${lang}/contacto`,
      lang
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/contacto',
      enPath: '/en/contacto'
    });

    this.seoService.updateBreadcrumb([
      { name: 'Alex Vicente', url: 'https://alex-vicente.dev' },
      { name: isSpanish ? 'Inicio' : 'Home', url: `https://alex-vicente.dev/${lang}/inicio` },
      { name: isSpanish ? 'Contacto' : 'Contact', url: `https://alex-vicente.dev/${lang}/contacto` },
    ]);

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: `https://alex-vicente.dev/${lang}/contacto`,
      inLanguage: lang,
      name: isSpanish ? 'Contacto - Alex Vicente' : 'Contact - Alex Vicente',
      mainEntity: {
        '@type': 'Person',
        '@id': 'https://alex-vicente.dev/#person',
        name: 'Alex Vicente',
        email: 'alex-vicente.dev.lyricist910@passmail.net',
        sameAs: [
          'https://github.com/alexvijo',
          'https://www.linkedin.com/in/alexvicente/',
          'https://twitter.com/alexvijo',
          'https://dev.to/alexvijo',
          'https://alex-vicente.dev'
        ]
      }
    });
  }

}
