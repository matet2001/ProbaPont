import { Component, inject } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {AuthService} from "../../../services/auth/auth.service";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [NgIf, AsyncPipe, TranslatePipe],
  template: `
    <div class="text-sm">
      <button *ngIf="!(authService.isAuthenticated())" onclick="authModal.showModal()" class="btn bg-primary">
        {{ 'AUTH.LOGIN' | translate }}
      </button>
    </div>
  `,
})
export class AuthButtonComponent {
  authService = inject(AuthService);
}
