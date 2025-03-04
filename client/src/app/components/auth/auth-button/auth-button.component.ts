import { Component, inject } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <div class="text-sm">
      <button *ngIf="!(authService.isAuthenticated() | async)" (click)="authService.openModal()" class="px-4 py-2 bg-primary text-white rounded-lg">
        Login
      </button>
      <button *ngIf="authService.isAuthenticated() | async" (click)="authService.logout()" class="px-4 py-2 bg-red-600 text-white rounded-lg">
        Logout
      </button>
    </div>
  `,
})
export class AuthButtonComponent {
  authService = inject(AuthService);
}
