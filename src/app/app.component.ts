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

    // Set default SEO for the app
    this.seoService.updatePageSEO({
      title: 'Alex Vicente - Frontend Developer & Angular Specialist',
      description: 'Soy desarrollador de software especializado en Angular, con experiencia en testing, CI/CD y arquitectura de software.',
      keywords: 'Angular, TypeScript, JavaScript, Frontend, Desarrollo Web, HTML, CSS, SCSS, Bootstrap, RxJS, Node.js, REST API, CI/CD, Docker'
    });

    AOS.init();
  }
}
