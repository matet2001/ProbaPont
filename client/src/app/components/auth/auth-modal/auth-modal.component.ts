import {Component, Inject, inject, Input, Renderer2} from '@angular/core';
import {DOCUMENT, NgClass, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass],
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent {
  authService = inject(AuthService);

  isLoginMode = true;
  email = '';
  password = '';
  username = '';

  // ngOnDestroy() {
  //   this.renderer.removeClass(document.body, 'overflow-hidden');
  // }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit() {
    if (this.isLoginMode) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => this.authService.closeModal(),
        error: (err) => console.error(err),
      });
    } else {
      this.authService.register(this.username, this.email, this.password).subscribe({
        next: () => this.authService.closeModal(),
        error: (err) => console.error(err),
      });
    }
  }
}
