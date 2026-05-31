import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
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

  // Crosshair
  crosshairVisible = false;
  crosshairX = 0;
  crosshairDate = '';
  crosshairTooltips: { label: string; y: number; color: string; textColor: string }[] = [];

  private chartStartMs = 0;
  private chartTotalMs = 1;
  private chartMinLogY = 3.5;
  private chartLogSpan = 4.5;
  private chartGenesisMs = 0;
  private chartCenterA = -17.01593313;
  private chartCenterB = 5.84509376;
  private chartBandUp = 0.7293;
  private chartBandDown = 0.4501;
  private chartPriceData: { ts: number; price: number }[] = [];

  private platformId = inject(PLATFORM_ID);
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
    const startDate = new Date('2025-01-01T00:00:00Z');
    const endDate = new Date('2030-12-01T00:00:00Z');

    // Parametros canonicos del Power Law de Bitcoin (Harold Christopher Burger)
    const centerA = -17.01593313;
    const centerB = 5.84509376;
    // Bandas asimétricas calibradas contra BitBO: +0.7293 arriba, -0.4501 abajo
    const bandUp   = 0.7293;
    const bandDown = 0.4501;

    const supportA = centerA - bandDown;
    const supportB = centerB;
    const resistanceA = centerA + bandUp;
    const resistanceB = centerB;

    const history = await this.fetchBtcHistory().catch(() => [] as [number, number][]);

    const startMs = startDate.getTime();
    const endMs = endDate.getTime();
    const totalMs = endMs - startMs;

    // Lineas del modelo: una muestra mensual desde 2020 hasta 2040
    const modelPoints: { ts: number; support: number; center: number; resistance: number }[] = [];
    const cursor = new Date(startDate);
    while (cursor.getTime() <= endMs) {
      const days = Math.max(1, Math.floor((cursor.getTime() - genesisDate.getTime()) / (1000 * 60 * 60 * 24)));
      const logDays = Math.log10(days);
      const support = Math.pow(10, supportA + supportB * logDays);
      const center = Math.pow(10, centerA + centerB * logDays);
      const resistance = Math.pow(10, resistanceA + resistanceB * logDays);
      if (Number.isFinite(support) && Number.isFinite(center) && Number.isFinite(resistance)) {
        modelPoints.push({ ts: cursor.getTime(), support, center, resistance });
      }
      cursor.setMonth(cursor.getMonth() + 1);
    }

    // Precio real: todos los puntos diarios de la API filtrados al rango visible
    const priceDataPoints = history.filter(
      ([ts, price]) => Number.isFinite(ts) && Number.isFinite(price) && price > 0 && ts >= startMs && ts <= endMs
    );

    if (modelPoints.length < 2) {
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

    // Escala ajustada para 2025-2030: soporte inicio ~$35k, resistencia final ~$3.4M
    const minLogY = 4.3;   // ~$20,000
    const maxLogY = 6.8;   // ~$6,300,000
    const logSpan = maxLogY - minLogY;

    this.chartStartMs = startMs;
    this.chartTotalMs = totalMs;
    this.chartMinLogY = minLogY;
    this.chartLogSpan = logSpan;
    this.chartGenesisMs = genesisDate.getTime();
    this.chartCenterA = centerA;
    this.chartCenterB = centerB;
    this.chartBandUp = bandUp;
    this.chartBandDown = bandDown;
    this.chartPriceData = priceDataPoints.map(([ts, price]) => ({ ts, price }));

    // X lineal basada en timestamp para alinear precio y modelo correctamente
    const xForTs = (ts: number) => this.powerLawChartPadding.left + ((ts - startMs) / totalMs) * plotWidth;
    const yFor = (price: number) => {
      const y = (Math.log10(price) - minLogY) / logSpan;
      return this.powerLawChartPadding.top + (1 - y) * plotHeight;
    };

    const modelToPath = (vals: { ts: number; val: number }[]) => vals
      .map(p => ({ x: xForTs(p.ts), y: yFor(p.val) }))
      .filter(p => Number.isFinite(p.x) && Number.isFinite(p.y))
      .map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(' ');

    // Precio real diario
    const pricePathPts = priceDataPoints
      .map(([ts, price]) => ({ x: xForTs(ts), y: yFor(price), ts, price }))
      .filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));
    this.powerLawPricePath = pricePathPts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

    this.powerLawSupportPath    = modelToPath(modelPoints.map(p => ({ ts: p.ts, val: p.support })));
    this.powerLawCenterPath     = modelToPath(modelPoints.map(p => ({ ts: p.ts, val: p.center })));
    this.powerLawResistancePath = modelToPath(modelPoints.map(p => ({ ts: p.ts, val: p.resistance })));

    this.powerLawYearTicks = modelPoints
      .filter(p => {
        const d = new Date(p.ts);
        return d.getUTCMonth() === 0;
      })
      .map(p => ({ x: xForTs(p.ts), year: new Date(p.ts).getUTCFullYear() }));

    // Ticks en potencias de 10 dentro del rango visible
    const priceTicks = [10_000, 100_000, 1_000_000, 10_000_000, 100_000_000];
    this.powerLawPriceTicks = priceTicks
      .map(price => ({ y: yFor(price), label: this.formatUsd(price) }))
      .filter(t => t.y >= this.powerLawChartPadding.top && t.y <= this.powerLawChartHeight - this.powerLawChartPadding.bottom);

    this.powerLawModelLabel = `Power Law: log10(P) = ${centerA.toFixed(4)} + ${centerB.toFixed(4)} × log10(días desde genesis)`;
    this.cdr.markForCheck();
  }

  private async fetchBtcHistory(): Promise<[number, number][]> {
    // blockchain.info devuelve datos diarios desde 2009, sin limite de plan
    // timestamps en segundos y precio en USD como {x, y}
    const url = 'https://api.blockchain.info/charts/market-price?timespan=all&format=json&sampled=true&cors=true';
    const response = await firstValueFrom(
      this.http.get<{ values: { x: number; y: number }[] }>(url)
    );
    return (response.values ?? []).map(v => [v.x * 1000, v.y] as [number, number]);
  }

  private formatUsd(value: number): string {
    if (value >= 1_000_000_000) {
      const b = value / 1_000_000_000;
      return `$${Number.isInteger(b) ? b : b.toFixed(1)}B`;
    }
    if (value >= 1_000_000) {
      const m = value / 1_000_000;
      return `$${Number.isInteger(m) ? m : m.toFixed(1)}M`;
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

  onChartMouseMove(event: MouseEvent): void {
    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const svgX = ((event.clientX - rect.left) / rect.width) * this.powerLawChartWidth;
    const svgY = ((event.clientY - rect.top) / rect.height) * this.powerLawChartHeight;

    const pad = this.powerLawChartPadding;
    if (svgX < pad.left || svgX > this.powerLawChartWidth - pad.right ||
        svgY < pad.top  || svgY > this.powerLawChartHeight - pad.bottom) {
      this.crosshairVisible = false;
      this.cdr.markForCheck();
      return;
    }

    this.crosshairX = svgX;

    // Fecha: invertir X → timestamp
    const plotWidth = this.powerLawChartWidth - pad.left - pad.right;
    const plotHeight = this.powerLawChartHeight - pad.top - pad.bottom;
    const ratio = (svgX - pad.left) / plotWidth;
    const ts = this.chartStartMs + ratio * this.chartTotalMs;
    const d = new Date(ts);
    const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    this.crosshairDate = `${d.getUTCDate()} ${months[d.getUTCMonth()]} '${String(d.getUTCFullYear()).slice(2)}`;

    // Calcular Y en SVG para un precio dado
    const yForPrice = (price: number) => {
      const yr = (Math.log10(price) - this.chartMinLogY) / this.chartLogSpan;
      return pad.top + (1 - yr) * plotHeight;
    };

    // Dias desde genesis para la fecha bajo el cursor
    const days = Math.max(1, Math.floor((ts - this.chartGenesisMs) / 86400000));
    const logDays = Math.log10(days);
    const resistance = Math.pow(10, (this.chartCenterA + this.chartBandUp)   + this.chartCenterB * logDays);
    const center     = Math.pow(10,  this.chartCenterA                        + this.chartCenterB * logDays);
    const support    = Math.pow(10, (this.chartCenterA - this.chartBandDown)  + this.chartCenterB * logDays);

    // Precio real: punto más cercano en tiempo
    const tooltips: { label: string; y: number; color: string; textColor: string }[] = [];

    tooltips.push({ label: this.formatUsd(resistance), y: yForPrice(resistance), color: '#9b59b6', textColor: '#fff' });

    // Precio real solo si existe dato histórico en esa fecha (pasado)
    if (this.chartPriceData.length > 0 && ts <= Date.now()) {
      let closest = this.chartPriceData[0];
      let minDist = Math.abs(ts - closest.ts);
      for (const pt of this.chartPriceData) {
        const dist = Math.abs(ts - pt.ts);
        if (dist < minDist) { minDist = dist; closest = pt; }
      }
      tooltips.push({ label: this.formatUsd(closest.price), y: yForPrice(closest.price), color: '#f39c12', textColor: '#000' });
    }

    tooltips.push({ label: this.formatUsd(center),     y: yForPrice(center),     color: '#27ae60', textColor: '#fff' });
    tooltips.push({ label: this.formatUsd(support),    y: yForPrice(support),    color: '#e74c3c', textColor: '#fff' });

    // Ordenar por Y ascendente para que no se solapen
    tooltips.sort((a, b) => a.y - b.y);

    this.crosshairTooltips = tooltips;
    this.crosshairVisible = true;
    this.cdr.markForCheck();
  }

  onChartMouseLeave(): void {
    this.crosshairVisible = false;
    this.cdr.markForCheck();
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

