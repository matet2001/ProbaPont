import {Inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const storedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = storedTheme ? storedTheme === 'dark' : systemPrefersDark;

      this.setDarkMode(isDark); // Initialize theme
    }
  }

  setDarkMode(darkMode: boolean) {
    this.isDarkModeSubject.next(darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
