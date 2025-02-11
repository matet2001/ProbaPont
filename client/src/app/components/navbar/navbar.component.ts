import {Component, HostListener} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    NgOptimizedImage,
    RouterLink,
    NgForOf,
    ThemeToggleComponent
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isUserMenuOpen = false;

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.menu-container')) {
      this.isUserMenuOpen = false;
    }
  }

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigation = [
    { name: 'Főoldal', href: '/', current: true },
    { name: 'Termek', href: '/rooms', current: false },
    { name: 'Foglalás', href: '/booking', current: false },
    { name: 'Árak', href: '/prices', current: false },
    { name: 'Kapcsolat', href: '/contact', current: false },
  ]
}
