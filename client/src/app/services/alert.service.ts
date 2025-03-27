import { Injectable } from '@angular/core';
import {AlertComponent} from "../components/alert/alert.component";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertComponentDefault!: AlertComponent;
  private alertComponentAuth!: AlertComponent;

  registerDefaultAlert(alertComponent: AlertComponent) {
    this.alertComponentDefault = alertComponent;
  }

  registerAuthAlert(alertComponent: AlertComponent) {
    this.alertComponentAuth = alertComponent;
  }

  success(message: string, type: "default" | "auth" = "default", additionalMessage: string = '') {
    const targetAlertComponent: AlertComponent = (type === "default") ? this.alertComponentDefault : this.alertComponentAuth;
    targetAlertComponent.showAlert('success', message, additionalMessage);
  }

  warning(message: string, type: "default" | "auth" = "default") {
    const targetAlertComponent: AlertComponent = (type === "default") ? this.alertComponentDefault : this.alertComponentAuth;
    targetAlertComponent.showAlert('warning', message);
  }

  error(message: string, type: "default" | "auth" = "default") {
    const targetAlertComponent: AlertComponent = (type === "default") ? this.alertComponentDefault : this.alertComponentDefault;
    targetAlertComponent.showAlert('error', message);
  }

  closeAllAuthAlerts(): void {
    this.alertComponentAuth.closeAllAlerts();
  }
}
