import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, PLATFORM_ID, Renderer2, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class JobsComponent implements OnInit, AfterViewInit {
  @ViewChild('btcWidget') btcWidget!: ElementRef;
  @ViewChild('mstrWidget') mstrWidget!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);

  categories: { key: string; label: string; items: any[] }[] = [
    { key: 'humanidades', label: 'Humanidades', items: [] },
    { key: 'economia', label: 'Economía', items: [] },
    { key: 'conocimiento', label: 'Conocimiento', items: [] },
    { key: 'software', label: 'Software', items: [] },
  ];

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


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTradingViewWidget(this.btcWidget, 'BITSTAMP:BTCUSD');
      this.loadTradingViewWidget(this.mstrWidget, 'NASDAQ:MSTR');
    }
  }

  private loadTradingViewWidget(container: ElementRef, symbol: string): void {
    const config = {
      autosize: true,
      symbol,
      interval: '240',
      range: '1M',
      timezone: 'Europe/Madrid',
      theme: 'dark',
      style: '1',
      locale: 'es',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com'
    };

    const widgetDiv = container.nativeElement.querySelector('.tradingview-widget-container__widget');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.textContent = JSON.stringify(config);
    container.nativeElement.appendChild(script);
    if (widgetDiv) {
      widgetDiv.style.height = '100%';
      widgetDiv.style.width = '100%';

      const observer = new MutationObserver(() => {
        const iframe = widgetDiv.querySelector('iframe');
        if (iframe) {
          iframe.style.userSelect = 'none';
          iframe.style.boxSizing = 'border-box';
          iframe.style.display = 'block';
          iframe.style.height = '500px';
          iframe.style.width = '100%';
          observer.disconnect();
        }
      });
      observer.observe(widgetDiv, { childList: true, subtree: true });
    }
  }

  // Recibe el array de jobs traducido desde el template
  categorizeJobs(jobs: any[]): any {
    // Asignación manual por nombre (Tab o Title)
    const map: { [key: string]: string[] } = {
      humanidades: [
        "Pablo d'Ors", 'Bernardo Souvirón', 'Agustín Garcia Calvo', 'Ángel García Galiano', 'Marco Aurelio'
      ],
      economia: [
        'Miguel Anxo Bastos' ,'José Luis Cava', 'David Battaglia', 'Juan Ramón Rallo', 'Dani Sóñora', 'Luis Miguel Ortiz', 'Andrej Karpathy'
      ],
      conocimiento: [
        'Steven Bartlett', 'Lorenzo Ramirez', 'Marc Vidal', 'Brian Tracy', 'Gerry Garbulsky', 'Frank Suarez', 'Anton Krupicka'
      ],
      software: [
        'Fernando Herrera', 'Daniel Santos', 'Joshua Morony', 'Alejandro Cuba Ruiz', 'Brad Traversy', 'Bezael Pérez', 'Jimy Dolores', 'FaszCode', 'Miguel Ángel Durán', 'Leifer Mendez', 'Dot CSV'
      ]
    };
    // Limpiar
    this.categories.forEach(cat => cat.items = []);
    jobs.forEach(job => {
      let assigned = false;
      for (const cat of this.categories) {
        if (map[cat.key].some(name => job.Tab === name || job.Title === name)) {
          cat.items.push(job);
          assigned = true;
          break;
        }
      }
      // Si no coincide, poner en "Conocimiento" por defecto
      if (!assigned) {
        this.categories[2].items.push(job);
      }
    });
    return this.categories;
  }

  getCategoryIndex(idx: number): string {
    return (idx + 1).toString().padStart(2, '0') + '.';
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

