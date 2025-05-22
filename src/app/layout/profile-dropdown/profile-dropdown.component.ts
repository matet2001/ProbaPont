import {Component, HostListener, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    TranslatePipe,
    NgClass,
    RouterLink,
    NgIf
  ],
  templateUrl: './profile-dropdown.component.html',
})
export class ProfileDropdownComponent {
  isUserMenuOpen = false;
  authService = inject(AuthService);

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

  userRoutes = [
    { name: 'USER.PROFILE', href: '/account' },
  ];
}
