import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-more-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule, NgbModule, NgbNavModule],
  templateUrl: './more-projects.component.html',
  styleUrl: './more-projects.component.scss'
})
export class MoreProjectsComponent implements OnInit {

  gistUrl: SafeResourceUrl;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.gistUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://gist.github.com/alexvijo/39b151d6bec3d254cbe142b116f2951e.pibb');
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  redirect(route: string, event: any) {
    const id = event.target.id;
    if(id=='demoLink' || id=='ghLink'){
      return
    }
    window.open(route, '_blank');
  }

}
