import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
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
    private languageService: LanguageService
    ){}

  ngOnInit(): void{
    this.languageService.initLanguage()
    this.titleService.setTitle( "Alex Vicente | Frontend Dev." );
    AOS.init();
  }
}
