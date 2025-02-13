import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FooterComponent} from "./components/footer/footer.component";

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
    FooterComponent
  ],
})
export class AppComponent {
  title = 'client';
}
