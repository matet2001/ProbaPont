import {Inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DOCUMENT} from "@angular/common";
import {LocalStorageService} from "../locale-storage/local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document, private localStorageService: LocalStorageService) {
    // const localStorage = document.defaultView?.localStorage;
    //
    // if (localStorage) {
    //   const storedTheme = localStorage.getItem('theme');
    //   const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //   const isDark = storedTheme ? storedTheme === 'dark' : systemPrefersDark;
    //
      this.setDarkMode(true);
    // }
  }

  setDarkMode(darkMode: boolean) {
    this.isDarkModeSubject.next(darkMode);
    this.localStorageService.set('theme', darkMode ? 'dark' : 'light');

    if (darkMode) {
      this.document.body.classList.add('dark');
    } else {
      this.document.body.classList.remove('dark');
    }
  }
}
