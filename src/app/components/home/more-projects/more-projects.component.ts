import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project } from '../../../models/Project.interface';

@Component({
  selector: 'app-more-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, NgbModule, NgbNavModule],
  templateUrl: './more-projects.component.html',
  styleUrl: './more-projects.component.scss'
})
export class MoreProjectsComponent implements OnInit {

  filteredProjects: Project[] = [];
  Projects: Project[] = [];

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
    });
    
    // Get the entire es.json
    this.translateService.getTranslation('es').subscribe((translations: any) => {
        console.log("translations", translations)
        if (translations && translations['OtherProjects.Projects']) {
            this.Projects = translations['OtherProjects.Projects'];
            this.filteredProjects = this.Projects;
          } else {
            console.error('OtherProjects.Projects is undefined');
          }
      });
  }

  redirect(route: string, event: any) {
    const id = event.target.id;
    if(id=='demoLink' || id=='ghLink'){
      return
    }
    window.open(route, '_blank');
  }

  filterProjects(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchString = target.value;
  
    if (this.Projects && searchString) {
      this.filteredProjects = this.Projects.filter((project: Project) =>
        project.Title.toLowerCase().includes(searchString.toLowerCase()) ||
        project.Description.toLowerCase().includes(searchString.toLowerCase())
      );
    } else {
      this.filteredProjects = this.Projects ? [...this.Projects] : [];
    }
  }

}
