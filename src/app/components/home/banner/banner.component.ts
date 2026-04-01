import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule
],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    trigger('bannerTrigger', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class BannerComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';

    this.seoService.updatePageSEO({
      title: isSpanish
        ? 'Alex Vicente - Desarrollador de Software Especializado en Angular'
        : 'Alex Vicente - Software Developer Angular Specialist',
      description: isSpanish
        ? 'Soy desarrollador de software especializado en Angular, apasionado por crear interfaces web intuitivas y eficientes.'
        : 'I am a software developer specialized in Angular, passionate about creating intuitive and efficient web interfaces.',
      keywords: isSpanish
        ? 'Alex Vicente, Desarrollador, Angular, Frontend, Software, TypeScript'
        : 'Alex Vicente, Developer, Angular, Frontend, Software, TypeScript',
      url: `https://alex-vicente.dev/${lang}/inicio`
    });
  }

}
