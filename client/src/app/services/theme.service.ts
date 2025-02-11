import { Injectable, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnInit {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    this.loadTheme();
  }

  private loadTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = storedTheme ? storedTheme === 'dark' : systemPrefersDark;
      this.setDarkMode(isDark);
    }
  }

  setDarkMode(darkMode: boolean) {
    this.isDarkModeSubject.next(darkMode);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');

      if (darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }
}
