import {Component, HostListener, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {ThemeService} from "../../services/theme/theme.service";
import {MatIcon} from "@angular/material/icon";
import {LanguageService} from "../../services/language/language.service";
import {TranslatePipe} from "@ngx-translate/core";
import {LogoComponent} from "../logo/logo.component";
import {AuthButtonComponent} from "../auth/auth-button/auth-button.component";
import {ProfileDropdownComponent} from "../profile-dropdown/profile-dropdown.component";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    ThemeToggleComponent,
    CommonModule,
    NgOptimizedImage,
    TranslatePipe,
    LogoComponent,
    AuthButtonComponent,
    ProfileDropdownComponent
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isDarkMode = false;
  authService = inject(AuthService);

  constructor(private themeService: ThemeService, private languageService: LanguageService) {
    this.themeService.isDarkMode$.subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

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

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  routes = [
    { cta: false, name: 'NAV.HOME', href: '/' },
    { cta: false, name: 'NAV.ROOMS', href: '/rooms' },
    { cta: true, name: 'NAV.BOOKING', href: '/booking' },
    { cta: false, name: 'NAV.PRICES', href: '/prices' },
    { cta: false, name: 'NAV.CONTACT', href: '/contact' }
  ];
}
