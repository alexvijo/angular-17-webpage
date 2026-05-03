import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
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
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.languageService.initLanguage();

    this.seoService.updatePageSEO({
      title: 'Alex Vicente - AI Developer | Desarrollador de IA',
      description: 'AI Developer especializado en agentes IA, LLM, automatización inteligente, RAG y arquitectura Angular orientada a negocio.',
      keywords: 'Alex Vicente, AI Developer, Desarrollador de IA, AI Agents, LLM, RAG, Angular, TypeScript, MLOps'
    });

    AOS.init();
  }
}
