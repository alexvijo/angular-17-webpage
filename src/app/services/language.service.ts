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
        this.translateService.addLangs(["en", "es"])
        let language = navigator.language || (navigator as any).userLanguage; 
        language = language.split("-").includes("es") ? "es" : "en"
        this.setLanguage(language as Language);
      }
    
      getLanguage(): Language {
        return this.languageSubject.getValue();
      }
    
      setLanguage(language: Language){
        this.translateService.setDefaultLang(language)
        this.location.go(language)
        this.languageSubject.next(language);
      }
}