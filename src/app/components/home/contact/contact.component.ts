
import { ChangeDetectionStrategy, Component, OnInit, SecurityContext } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Platform } from '@angular/cdk/platform';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule
],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  constructor(
    private platform: Platform,
    private sanitizer: DomSanitizer,
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
        ? 'Ponte en contacto conmigo por email o WhatsApp. Estaré encantado de hablar sobre proyectos de IA, agentes y colaboraciones.'
        : 'Get in touch with me by email or WhatsApp. Happy to discuss AI projects, agents, and collaboration opportunities.',
      keywords: isSpanish
        ? 'Contacto, Email, WhatsApp, Consultoría, AI Developer, Agentes IA'
        : 'Contact, Email, WhatsApp, Consulting, AI Developer, AI Agents',
      url: `https://alex-vicente.dev/${lang}/contacto`,
      lang
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/contacto',
      enPath: '/en/contacto'
    });

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
        email: 'alexvicentejose@gmail.com',
        sameAs: [
          'https://github.com/alexvijo',
          'https://www.linkedin.com/in/alexvicente/'
        ]
      }
    });
  }

  openWhatsApp() {
    const url = this.platform.ANDROID || this.platform.IOS
                ? 'whatsapp://send?phone=34644720496'
                : 'https://web.whatsapp.com/send?phone=34644720496';
    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, safeUrl) || '';
    window.open(sanitizedUrl, '_blank');
  }

}
