import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';
import { JobsComponent } from './jobs/jobs.component';
import { MoreProjectsComponent } from './more-projects/more-projects.component';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BannerComponent,
    AboutComponent,
    MoreProjectsComponent,
    JobsComponent,
    ContactComponent,
    NgbNavModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
