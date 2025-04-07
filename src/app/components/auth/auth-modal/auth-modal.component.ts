import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from "../../../services/auth/auth.service";
import {TranslatePipe} from "@ngx-translate/core";
import {AlertComponent} from "../../alert/alert.component";
import {AlertService} from "../../../services/alert.service";
import {AuthModalService} from "../../../services/auth/auth-modal.service";
import {FormInputComponent} from "../../form-input/form-input.component";
import {Auth, sendPasswordResetEmail} from "@angular/fire/auth";

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [NgIf, FormsModule, TranslatePipe, AlertComponent, FormInputComponent, UpperCasePipe],
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent {
  @ViewChild('authModal') authModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('authForm') authForm!: NgForm;

  isLoginMode = true;
  isForgotPasswordMode = false;
  showPassword = false;

  fullName = '';
  bandName = '';
  phone = '';
  email = '';
  password = '';
  error = ''; // Store error message

  authService: AuthService = inject(AuthService);
  authModalService: AuthModalService = inject(AuthModalService);
  alertService: AlertService = inject(AlertService);

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.authModalService.initModal();
  }

  ngAfterViewInit() {
    this.authModal.nativeElement.addEventListener('close', () => {
      this.resetForm();
      this.alertService.closeAllAuthAlerts();
    });
  }

  closeModal() {
    this.authModal.nativeElement.close(); // Close modal
  }

  resetForm() {
    this.authForm?.resetForm(); // Reset form
    this.error = ''; // Clear error message
    this.isLoginMode = true;
    this.isForgotPasswordMode = false;
    this.showPassword = false;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = ''; // Clear errors when switching mode
  }

  switchToForgotPassword() {
    this.isForgotPasswordMode = true;
    this.error = '';
  }

  switchToRegister() {
    this.isForgotPasswordMode = false;
    this.isLoginMode = false;
    this.error = '';
  }


  submit() {
    this.error = ''; // Clear previous errors

    if (this.isForgotPasswordMode) {
      sendPasswordResetEmail(this.auth, this.email)
          .then(() => {
            this.alertService.success('AUTH.PASSWORD_RESET.SUCCESS');
            this.closeModal();
            this.resetForm();
          })
          .catch(error => console.error(`Error: ${error.message}`));
    } else {
      const authRequest = this.isLoginMode
          ? this.authService.login(this.email, this.password)
          : this.authService.register(this.email, this.password, this.fullName, this.bandName, this.phone);

      authRequest
          .then(() => {
            this.closeModal();
            this.resetForm();
          })
          .catch((error) => {
            this.error = this.mapFirebaseError(error.message); // Convert error to translation key
          });
    }
  }

  private mapFirebaseError(errorCode: string): string {
    const errorMap: { [key: string]: string } = {
      "auth/email-already-in-use": "EMAIL_IN_USE",
      "auth/invalid-email": "INVALID_EMAIL",
      "auth/weak-password": "WEAK_PASSWORD",
      "auth/user-not-found": "USER_NOT_FOUND",
      "auth/invalid-credential": "INVALID_CREDENTIAL",
    };

    return errorMap[errorCode] || "DEFAULT";
  }
}