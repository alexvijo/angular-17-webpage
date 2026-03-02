import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
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
        private location: Location,
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
        const path = this.location.path() || '';
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
        this.location.go('/' + language);
        this.languageSubject.next(language);
      }
}