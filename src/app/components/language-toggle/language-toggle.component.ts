import {Component, inject} from '@angular/core';
import {LanguageService} from "../../services/language/language.service";
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './language-toggle.component.html',
})
export class LanguageToggleComponent {
  languageService : LanguageService = inject(LanguageService);

  changeLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  toggleLanguage(): void {
    if (this.languageService.getCurrentLanguage() == "en") this.changeLanguage("hu")
    else this.changeLanguage("en")
  }

  getCurrentLanguage(): string {
    return this.languageService.getCurrentLanguage()
  }
}
