import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { WindowRefService } from '../../../window-ref.service';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
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
        : 'I am interested - Influences and Mentors of Alex Vicente',
      description: isSpanish 
        ? 'Descubre las personas e influencias que me inspiran profesionalmente. Creadores de contenido, mentores y referentes en tecnología.' 
        : 'Discover the people and influences that inspire me professionally. Content creators, mentors and technology leaders.',
      keywords: isSpanish 
        ? 'Influencias, Mentores, Referentes, Podcasts, YouTubers'
        : 'Influences, Mentors, Leaders, Podcasts, YouTubers',
      url: `https://alex-vicente.dev/${lang}/me-interesa`
    });
  }

  openLink(link: string) {
    console.log(link);
    this.openNewWindow(link);
  }

  getBackgroundImage(imageUrl: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${imageUrl}")`);
  }

  openNewWindow(url: string) {
    this.windowRef.nativeWindow.open(url, '_blank');
  }

}

