import {Component, ElementRef, Inject, inject, Input, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT, NgClass, NgIf} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthResponse, AuthService} from "../../../services/auth/auth.service";
import {IconComponent} from "../../icon/icon.component";
import {LogoComponent} from "../../logo/logo.component";
import {TranslatePipe} from "@ngx-translate/core";
import {AlertComponent} from "../../alert/alert.component";
import {AlertService} from "../../../services/alert.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [NgIf, FormsModule, TranslatePipe, AlertComponent],
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent {
  @ViewChild('authModal') authModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('authForm') authForm!: NgForm;

  isLoginMode = true;
  showPassword = false;
  username = '';
  email = '';
  password = '';
  error = ''; // Store error message

  authService: AuthService = inject(AuthService);
  alertService: AlertService = inject(AlertService);

  ngOnInit() {
    this.authService.initModal();
  }

  ngAfterViewInit() {
    this.authModal.nativeElement.addEventListener('close', () => {
      this.resetForm();
      this.alertService.closeAllAuthAlerts();
    });
  }

  submit() {
    this.error = ''; // Clear previous errors

    const authRequest = this.isLoginMode
        ? this.authService.login(this.email, this.password)
        : this.authService.register(this.username, this.email, this.password);

    authRequest.subscribe({
      next: (response) => this.onSuccessfulResponse(response), // Success
      error: (err) => this.handleError(err), // Handle error
    });
  }

  onSuccessfulResponse(response: AuthResponse) {
    this.alertService.success(response.data);
    this.closeModal();
  }

  closeModal() {
    this.authModal.nativeElement.close(); // Close modal
    // this.alertService.closeAllAlerts();
  }

  resetForm() {
    this.authForm?.resetForm(); // Reset form
    this.error = ''; // Clear error message
    this.isLoginMode = true;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = ''; // Clear errors when switching mode
  }

  private handleError(error: any) {
    this.error = error.message || 'Something went wrong. Please try again.';
    this.alertService.error(error.message || 'Something went wrong. Please try again.', "auth");

  }
}