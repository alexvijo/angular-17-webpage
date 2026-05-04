import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type Language = "es" | "en";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

    private languageSubject: BehaviorSubject<Language> = new BehaviorSubject<Language>("es");
    language$ = this.languageSubject.asObservable();

    constructor(
        public translateService: TranslateService,
        @Inject(PLATFORM_ID) private platformId: object,
        @Inject(DOCUMENT) private document: Document,
      ) {
        let defaultLanguage: Language = "es";
        this.languageSubject = new BehaviorSubject<Language>(defaultLanguage);
        this.initLanguage();
      }

      initLanguage(){
        this.translateService.addLangs(["en", "es"]);

        const routeLanguage = this.getLanguageFromPath();
        const language = routeLanguage ?? "es";

        this.setLanguage(language);
      }

      private getLanguageFromPath(): Language | null {
        if (!isPlatformBrowser(this.platformId)) {
          return null;
        }
        const path = this.document.location?.pathname || '';
        const firstSegment = path.split('?')[0].split('#')[0].split('/').filter(Boolean)[0];

        if (firstSegment === 'es' || firstSegment === 'en') {
          return firstSegment;
        }

        return null;
      }

      getLanguage(): Language {
        return this.languageSubject.getValue();
      }

      setLanguage(language: Language){
        this.translateService.setDefaultLang(language);
        this.translateService.use(language);
        this.languageSubject.next(language);
      }
}