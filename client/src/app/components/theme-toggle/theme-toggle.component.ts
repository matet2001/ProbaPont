import { Component } from '@angular/core';
import { ThemeService } from "../../services/theme/theme.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  imports: [
    MatIcon,
  ],
  standalone: true
})
export class ThemeToggleComponent {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  toggleTheme() {
    this.themeService.setDarkMode(!this.isDarkMode);
  }
}
