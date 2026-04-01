
import { ChangeDetectionStrategy, Component, OnInit, SecurityContext } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Platform } from '@angular/cdk/platform';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SeoService } from '../../../services/seo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule
],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  constructor(
    private platform: Platform, 
    private sanitizer: DomSanitizer,
    private seoService: SeoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const lang = this.route.snapshot.paramMap.get('language') || 'es';
    const isSpanish = lang === 'es';

    this.seoService.updatePageSEO({
      title: isSpanish 
        ? 'Contacto - Alex Vicente Desarrollador de Software' 
        : 'Contact - Alex Vicente Software Developer',
      description: isSpanish 
        ? 'Ponte en contacto conmigo por email o WhatsApp. Estaré encantado de hablar sobre oportunidades de colaboración.' 
        : 'Get in touch with me by email or WhatsApp. I will be happy to discuss collaboration opportunities.',
      keywords: isSpanish 
        ? 'Contacto, Email, WhatsApp, Consultoría'
        : 'Contact, Email, WhatsApp, Consulting',
      url: `https://alex-vicente.dev/${lang}/contacto`
    });
  }

  openWhatsApp() {
    const url = this.platform.ANDROID || this.platform.IOS
                ? 'whatsapp://send?phone=34644720496'
                : 'https://web.whatsapp.com/send?phone=34644720496';
    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, safeUrl) || '';
    window.open(sanitizedUrl, '_blank');
  }

}
