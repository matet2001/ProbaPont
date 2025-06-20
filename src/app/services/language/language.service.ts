import { Inject, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService,
  ) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const savedLang = localStorage.getItem("language") || "en";
      this.translate.setDefaultLang(savedLang);
      this.translate.use(savedLang);
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem("language", lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || "en";
  }
}
