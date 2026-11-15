import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { WindowRefService } from '../../../window-ref.service';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-jobs',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TranslateModule,
        NgbModule,
        NgbNavModule
    ],
    templateUrl: './jobs.component.html',
    styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit {
  allJobs: any[] = [];

  constructor(
    private windowRef: WindowRefService,
    private sanitizer: DomSanitizer,
    private seoService: SeoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'Me Interesa - Influencias y Mentores de Alex Vicente'
        : 'What I Follow - Influences and Mentors of Alex Vicente',
      description: isSpanish
        ? 'Descubre las personas e influencias que me inspiran profesionalmente. Creadores de contenido, mentores y referentes en tecnología.'
        : 'Discover the people and influences that inspire me professionally. Content creators, mentors and technology leaders.',
      keywords: isSpanish
        ? 'Influencias, Mentores, Referentes, Podcasts, YouTubers'
        : 'Influences, Mentors, Leaders, Podcasts, YouTubers',
      url: `https://alex-vicente.dev/${lang}/me-interesa`,
      lang
    });

    this.seoService.updateHreflangAlternates({
      esPath: '/es/me-interesa',
      enPath: '/en/me-interesa'
    });

    this.seoService.updateBreadcrumb([
      { name: 'Alex Vicente', url: 'https://alex-vicente.dev' },
      { name: isSpanish ? 'Inicio' : 'Home', url: `https://alex-vicente.dev/${lang}/inicio` },
      { name: isSpanish ? 'Me Interesa' : 'What I Follow', url: `https://alex-vicente.dev/${lang}/me-interesa` },
    ]);

    this.seoService.updateJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      url: `https://alex-vicente.dev/${lang}/me-interesa`,
      inLanguage: lang,
      name: isSpanish ? 'Me Interesa - Influencias y Mentores' : 'What I Follow - Influences and Mentors',
      description: isSpanish
        ? 'Personas, podcasts y referentes que inspiran mi trabajo como AI Developer.'
        : 'People, podcasts and leaders that inspire my work as an AI Developer.',
      author: {
        '@type': 'Person',
        '@id': 'https://alex-vicente.dev/#person',
        name: 'Alex Vicente'
      }
    });
  }


  openLink(link: string) {
    this.openNewWindow(link);
  }

  getBackgroundImage(imageUrl: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${imageUrl}")`);
  }

  openNewWindow(url: string) {
    this.windowRef.nativeWindow.open(url, '_blank');
  }
}

