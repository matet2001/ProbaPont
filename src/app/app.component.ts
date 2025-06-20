import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";

import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FooterComponent } from "./layout/footer/footer.component";
import { AuthButtonComponent } from "./layout/auth/auth-button/auth-button.component";
import { AuthModalComponent } from "./layout/auth/auth-modal/auth-modal.component";
import { AlertComponent } from "./layout/alert/alert.component";
import { ConfirmationModalComponent } from "./layout/confirmation-modal/confirmation-modal.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterOutlet,
    TranslateModule,
    MatSelectModule,
    MatFormFieldModule,
    FooterComponent,
    AuthModalComponent,
    AlertComponent,
    ConfirmationModalComponent,
  ],
})
export class AppComponent {
  title = "client";
}
