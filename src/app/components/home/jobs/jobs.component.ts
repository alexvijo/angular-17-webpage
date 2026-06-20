import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, PLATFORM_ID, Renderer2, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { WindowRefService } from '../../../window-ref.service';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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

  powerLawPricePath = '';
  powerLawSupportPath = '';
  powerLawCenterPath = '';
  powerLawResistancePath = '';
  powerLawYearTicks: { x: number; year: number }[] = [];
  powerLawPriceTicks: { y: number; label: string }[] = [];
  powerLawModelLabel = '';

  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  private readonly powerLawChartWidth = 1000;
  private readonly powerLawChartHeight = 500;
  private readonly powerLawChartPadding = { top: 14, right: 12, bottom: 24, left: 84 };

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
      if (this.btcWidget) {
        this.loadTradingViewWidget(this.btcWidget, 'BITSTAMP:BTCUSD');
      }
      if (this.mstrWidget) {
        this.loadTradingViewWidget(this.mstrWidget, 'NASDAQ:MSTR');
      }
      void this.buildPowerLawChartPaths().catch(() => {
        this.powerLawModelLabel = 'No se pudo cargar el grafico ahora mismo.';
        this.cdr.markForCheck();
      });
    }
  }

  private async buildPowerLawChartPaths(): Promise<void> {
    const genesisDate = new Date('2009-01-03T00:00:00Z');
    const regressionStartDate = new Date('2010-07-01T00:00:00Z');
    const startDate = new Date('2020-01-01T00:00:00Z');
    const endDate = new Date('2030-12-01T00:00:00Z');

    let centerA = -16.4945;
    let centerB = 5.68823;
    let residualStd = 0.5;

    const history = await this.fetchBtcHistory().catch(() => [] as [number, number][]);
    if (history.length > 0) {
      const regression = this.computeLogLogRegression(history, genesisDate, regressionStartDate);
      if (regression) {
        centerA = regression.intercept;
        centerB = regression.slope;
        residualStd = regression.residualStd;
      }
    }

    // Si la regresion devuelve valores no validos, usa parametros de respaldo.
    if (!Number.isFinite(centerA) || !Number.isFinite(centerB) || !Number.isFinite(residualStd) || centerB <= 0) {
      centerA = -16.4945;
      centerB = 5.68823;
      residualStd = 0.5;
    }

    const supportA = centerA - residualStd;
    const supportB = centerB;
    const resistanceA = centerA + residualStd;
    const resistanceB = centerB;

    const points: { date: Date; support: number; center: number; resistance: number; price?: number }[] = [];
    const cursor = new Date(startDate);

    const monthlyPriceMap = new Map<string, number>();
    for (const [ts, price] of history) {
      if (!Number.isFinite(ts) || !Number.isFinite(price) || price <= 0) {
        continue;
      }
      const d = new Date(ts);
      const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
      monthlyPriceMap.set(key, price);
    }

    while (cursor <= endDate) {
      const days = Math.max(1, Math.floor((cursor.getTime() - genesisDate.getTime()) / (1000 * 60 * 60 * 24)));
      const logDays = Math.log10(days);
      const key = `${cursor.getUTCFullYear()}-${cursor.getUTCMonth()}`;
      const support = Math.pow(10, supportA + supportB * logDays);
      const center = Math.pow(10, centerA + centerB * logDays);
      const resistance = Math.pow(10, resistanceA + resistanceB * logDays);
      if (!Number.isFinite(support) || !Number.isFinite(center) || !Number.isFinite(resistance)) {
        cursor.setMonth(cursor.getMonth() + 1);
        continue;
      }

      points.push({
        date: new Date(cursor),
        support,
        center,
        resistance,
        price: monthlyPriceMap.get(key),
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }

    if (points.length < 2) {
      this.powerLawPricePath = '';
      this.powerLawSupportPath = '';
      this.powerLawCenterPath = '';
      this.powerLawResistancePath = '';
      this.powerLawYearTicks = [];
      this.powerLawPriceTicks = [];
      this.powerLawModelLabel = 'No se pudo construir el grafico con los datos actuales.';
      this.cdr.markForCheck();
      return;
    }

    const plotWidth = this.powerLawChartWidth - this.powerLawChartPadding.left - this.powerLawChartPadding.right;
    const plotHeight = this.powerLawChartHeight - this.powerLawChartPadding.top - this.powerLawChartPadding.bottom;
    const minX = 0;
    const maxX = Math.max(1, points.length - 1);
    const valuesForScale = points
      .flatMap(p => [p.support, p.center, p.resistance, p.price || p.center])
      .filter(v => Number.isFinite(v) && v > 0);
    if (valuesForScale.length === 0) {
      this.cdr.markForCheck();
      return;
    }
    const minLogY = Math.floor(Math.log10(Math.min(...valuesForScale)) * 2) / 2;
    const maxLogY = Math.ceil(Math.log10(Math.max(...valuesForScale)) * 2) / 2;
    const logSpan = Math.max(0.5, maxLogY - minLogY);

    const xFor = (i: number) => this.powerLawChartPadding.left + ((i - minX) / (maxX - minX)) * plotWidth;
    const yFor = (price: number) => {
      const y = (Math.log10(price) - minLogY) / logSpan;
      return this.powerLawChartPadding.top + (1 - y) * plotHeight;
    };

    const toPath = (values: number[]) => values
      .map((v, i) => ({ x: xFor(i), y: yFor(v) }))
      .filter(p => Number.isFinite(p.x) && Number.isFinite(p.y))
      .map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(' ');

    const priceSeries = points.map(p => p.price ?? p.center);
    this.powerLawPricePath = toPath(priceSeries);
    this.powerLawSupportPath = toPath(points.map(p => p.support));
    this.powerLawCenterPath = toPath(points.map(p => p.center));
    this.powerLawResistancePath = toPath(points.map(p => p.resistance));

    this.powerLawYearTicks = points
      .map((p, i) => ({ i, year: p.date.getUTCFullYear(), month: p.date.getUTCMonth() }))
      .filter(p => p.month === 0)
      .map(p => ({ x: xFor(p.i), year: p.year }));

    const priceTickSet = new Set<number>();
    for (let v = Math.ceil(minLogY); v <= Math.floor(maxLogY); v += 1) {
      priceTickSet.add(Math.pow(10, v));
    }
    for (let v = Math.ceil(minLogY * 2) / 2; v <= Math.floor(maxLogY * 2) / 2; v += 0.5) {
      priceTickSet.add(Math.pow(10, v));
    }

    this.powerLawPriceTicks = Array.from(priceTickSet)
      .sort((a, b) => b - a)
      .filter(price => {
        const y = yFor(price);
        return y >= this.powerLawChartPadding.top && y <= this.powerLawChartHeight - this.powerLawChartPadding.bottom;
      })
      .map(price => ({ y: yFor(price), label: this.formatUsd(price) }));

    this.powerLawModelLabel = `Regresion log-log real: log10(P) = ${centerA.toFixed(4)} + ${centerB.toFixed(4)} * log10(dias)`;
    this.cdr.markForCheck();
  }

  private async fetchBtcHistory(): Promise<[number, number][]> {
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=daily';
    const response = await firstValueFrom(this.http.get<{ prices: [number, number][] }>(url));
    return response.prices ?? [];
  }

  private computeLogLogRegression(
    prices: [number, number][],
    genesisDate: Date,
    startDate: Date
  ): { intercept: number; slope: number; residualStd: number } | null {
    const samples = prices
      .filter(([ts, price]) => ts >= startDate.getTime() && price > 0)
      .map(([ts, price]) => {
        const days = Math.max(1, Math.floor((ts - genesisDate.getTime()) / (1000 * 60 * 60 * 24)));
        return { x: Math.log10(days), y: Math.log10(price) };
      });

    if (samples.length < 20) {
      return null;
    }

    const n = samples.length;
    const sumX = samples.reduce((acc, s) => acc + s.x, 0);
    const sumY = samples.reduce((acc, s) => acc + s.y, 0);
    const sumXY = samples.reduce((acc, s) => acc + s.x * s.y, 0);
    const sumX2 = samples.reduce((acc, s) => acc + s.x * s.x, 0);

    const denominator = n * sumX2 - sumX * sumX;
    if (denominator === 0) {
      return null;
    }

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    const residualVariance = samples.reduce((acc, s) => {
      const est = intercept + slope * s.x;
      const residual = s.y - est;
      return acc + residual * residual;
    }, 0) / n;

    return {
      intercept,
      slope,
      residualStd: Math.sqrt(residualVariance),
    };
  }

  private formatUsd(value: number): string {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `$${Math.round(value / 1_000)}k`;
    }
    return `$${Math.round(value)}`;
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

