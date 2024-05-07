import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { BannerComponent } from './banner/banner.component';
import { ContactComponent } from './contact/contact.component';
import { JobsComponent } from './jobs/jobs.component';
import { MoreProjectsComponent } from './more-projects/more-projects.component';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    AboutComponent,
    ProjectsComponent,
    MoreProjectsComponent,
    JobsComponent,
    ContactComponent,
    CommonModule,
    NgbNavModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
