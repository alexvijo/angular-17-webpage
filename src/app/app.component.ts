import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';
import { LanguageService } from './services/language.service';
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
    private titleService: Title,
    private meta: Meta,
    private languageService: LanguageService
  ){}

  ngOnInit(): void{
    this.languageService.initLanguage()
    this.titleService.setTitle( "Alex Vicente | Frontend Dev." );
    this.meta.updateTag({ name: 'description', content: 'Soy desarrollador de software con experiencia destacada en Angular' });
    this.meta.updateTag({ name: 'keywords', content: 'Angular, TypeScript, JavaScript, Frontend, Desarrollo Web, HTML, CSS, SCSS, Bootstrap, Material Design, Reactive Forms, RxJS, NGRX, Redux, Observables, Promesas, ES6, Webpack, Babel, Node.js, NPM, Yarn, Git, GitHub, Bitbucket, VS Code, WebStorm, TDD, Jasmine, Karma, Protractor, CI/CD, Docker, Kubernetes, Agile, Scrum, Kanban, JIRA, Trello, Slack, REST API, GraphQL, JSON, AJAX, ECMA Script, SEO, Performance Optimization, Web Accessibility, i18n, l10n' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'author', content: 'Alex Vicente' });
    AOS.init();
  }
}
