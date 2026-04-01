import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { WindowRefService } from '../../../window-ref.service';

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
export class JobsComponent {

  constructor(
    private windowRef: WindowRefService,
    private sanitizer: DomSanitizer
  ) { }

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

