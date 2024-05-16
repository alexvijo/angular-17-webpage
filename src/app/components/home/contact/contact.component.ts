import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, SecurityContext } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Platform } from '@angular/cdk/platform';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule, CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(private platform: Platform, private sanitizer: DomSanitizer) { }

  openWhatsApp() {
    const url = this.platform.ANDROID || this.platform.IOS
                ? 'whatsapp://send?phone=34644720496'
                : 'https://web.whatsapp.com/send?phone=34644720496';
    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.URL, safeUrl) || '';
    window.open(sanitizedUrl, '_blank');
  }

}
