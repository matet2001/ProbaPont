import {Component, Input} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {AlertService} from "../../services/alert.service";
import {of} from "rxjs";
import {TranslatePipe} from "@ngx-translate/core";

interface Alert {
  type: 'success' | 'warning' | 'error';
  translatedMessage: string;
  additionalMessage: string;
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  alerts: Alert[] = [];

  @Input() type: "default" | "auth" = "default";

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    if(this.type === "default") {
      this.alertService.registerDefaultAlert(this);
    } else if (this.type === "auth") {
      this.alertService.registerAuthAlert(this);
    }
  }

  showAlert(type: 'success' | 'warning' | 'error', translatedMessage: string, additionalMessage: string = '') {
    const alert: Alert = { type, translatedMessage: translatedMessage, additionalMessage };
    this.alerts.push(alert);

    setTimeout(() => {
      this.closeAlert(alert);
    }, 2500); // Start fade-out after 2.5s
  }

  fadeOutAlert(alert: Alert) {
    const index = this.alerts.indexOf(alert);
    if (index !== -1) {
      document.querySelectorAll('.alert')[index]?.classList.add('fade-out');
    }
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }

  closeAlert(alert: Alert) {
    if(this.alerts.includes(alert)) {
      this.fadeOutAlert(alert);
      setTimeout(() => {
        this.removeAlert(alert);
      }, 500);
    }
  }

  closeAllAlerts() {
    for(let alert of this.alerts) {
      this.closeAlert(alert);
    }
  }
}
