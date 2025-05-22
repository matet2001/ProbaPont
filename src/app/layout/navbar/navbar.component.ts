import {Component, HostListener, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ThemeToggleComponent} from "../../shared/atoms/theme-toggle/theme-toggle.component";
import {ThemeService} from "../../services/theme/theme.service";
import {MatIcon} from "@angular/material/icon";
import {LanguageService} from "../../services/language/language.service";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {LogoComponent} from "../../shared/atoms/logo/logo.component";
import {AuthButtonComponent} from "../auth/auth-button/auth-button.component";
import {ProfileDropdownComponent} from "../profile-dropdown/profile-dropdown.component";
import {AuthService} from "../../services/auth/auth.service";
import {LanguageToggleComponent} from "../../shared/atoms/language-toggle/language-toggle.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TranslatePipe,
    LogoComponent,
    AuthButtonComponent,
    ProfileDropdownComponent,
    LanguageToggleComponent
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isDarkMode = false;
  translationReady = false;
  authReady = false;
  isMobileMenuOpen = false;

  authService = inject(AuthService);
  translateService = inject(TranslateService);

  routes = [
    { cta: false, name: 'NAV.HOME', href: '/' },
    { cta: false, name: 'NAV.ROOMS', href: '/room' },
    { cta: true, name: 'NAV.BOOKING', href: '/booking' },
    { cta: false, name: 'NAV.PRICES', href: '/prices' },
    { cta: false, name: 'NAV.CONTACT', href: '/contact' }
  ];

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  ngOnInit() {
    this.translateService.use('en').subscribe(() => {
      this.translationReady = true;
    });

    this.authService.authReady.subscribe(authReady => {
      this.authReady = true;
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
