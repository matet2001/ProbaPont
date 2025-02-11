import {Component, HostListener} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgOptimizedImage,
    RouterLink,
    NgForOf
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
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
