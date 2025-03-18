import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FooterComponent} from "./components/footer/footer.component";
import {AuthButtonComponent} from "./components/auth/auth-button/auth-button.component";
import {AuthModalComponent} from "./components/auth/auth-modal/auth-modal.component";
import {AlertComponent} from "./components/alert/alert.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
        AlertComponent
    ],
})
export class AppComponent {
  title = 'client';
}
