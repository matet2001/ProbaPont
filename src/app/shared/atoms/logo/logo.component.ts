import {Component, Input, numberAttribute} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ThemeService} from "../../../services/theme/theme.service";

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  template: `<a routerLink="/" class="flex shrink-0 items-center">
    <img
      priority
      [ngSrc]="isDarkMode ? 'assets/Logo-dark.png' : 'assets/Logo.png'"
      alt="Logo"
      [height]="height * size"
      [width]="width * size">
  </a>`
})
export class LogoComponent {
  isDarkMode = false;

  @Input({transform: numberAttribute}) size: number = 1;
  width: number = 211;
  height: number = 105;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }
}
