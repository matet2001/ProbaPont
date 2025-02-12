import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ThemeService} from "../../services/theme.service";

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
      class=""
      [height]="width"
      [width]="height">
  </a>`
})
export class LogoComponent {
  isDarkMode = false;
  @Input() width: number = 200;
  @Input() height: number = 100;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }
}
