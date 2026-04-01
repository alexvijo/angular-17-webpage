import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Language, LanguageService } from '../../../services/language.service';
import { TranslateModule} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgbDropdown, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule, NgbModule, NgbNavModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  responsiveMenuVisible: Boolean = false;
  pageYPosition: number | undefined;
  languageFormControl: FormControl= new FormControl();
  cvName: string = "";

  @ViewChild('myDropdown') myDropdown!: NgbDropdown;

  constructor(
    private router: Router,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languageFormControl.setValue(this.languageService.getLanguage(), { emitEvent: false });
  }

  navigateTo(page: string) {
    const language = this.getCurrentLanguage();
    this.router.navigate(['/', language, page]);
    this.responsiveMenuVisible = false;
  }

  private getCurrentLanguage(): Language {
    return (this.languageFormControl.value as Language) || this.languageService.getLanguage();
  }

  private getCurrentPathSegments(): string[] {
    return this.router.url.split('?')[0].split('#')[0].split('/').filter(Boolean);
  }

  @HostListener('window:scroll', ['getScrollPosition($event)'])
    getScrollPosition(event: any) {
        this.pageYPosition = window.scrollY;
    }

    setLanguage(language: Language) {
      this.languageService.setLanguage(language);
      this.languageFormControl.setValue(language, { emitEvent: false });

      const currentSegments = this.getCurrentPathSegments();
      if (currentSegments.length === 0) {
        this.router.navigate(['/', language, 'inicio']);
      } else {
        currentSegments[0] = language;
        this.router.navigate(['/', ...currentSegments]);
      }

      if (this.myDropdown) {
        this.myDropdown.close();
      }
    }
}
