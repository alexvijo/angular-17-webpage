import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';
import { VisitStatsMailService } from './services/visit-stats-mail.service';
import * as AOS from 'aos';

@Component({
    selector: 'app-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        HeaderComponent,
        RouterOutlet,
        FooterComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'alexvijo';
  constructor(
    private languageService: LanguageService,
    private seoService: SeoService,
    private visitStatsMailService: VisitStatsMailService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.languageService.initLanguage();

    this.seoService.updatePageSEO({
      title: 'Alex Vicente - AI Developer | Desarrollador de IA',
      description: 'AI Developer especializado en agentes IA, LLM, automatización inteligente, RAG y arquitectura Angular orientada a negocio.',
      keywords: 'Alex Vicente, AI Developer, Desarrollador de IA, AI Agents, LLM, RAG, Angular, TypeScript, MLOps'
    });

    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
      void this.visitStatsMailService.trackVisitAndSendStats();
    }
  }
}
