import {Component, inject} from '@angular/core';
import { ThemeService } from "../../services/theme/theme.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  standalone: true
})
export class ThemeToggleComponent {
  isDarkMode = false;
  alertService: AlertService = inject(AlertService);

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  toggleTheme() {
    this.themeService.setDarkMode(!this.isDarkMode);
    this.alertService.success("Theme toggled successfully.");
  }
}