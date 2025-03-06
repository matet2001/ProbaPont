import {Component, Input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth: boolean = true;
  @Input() customClasses: string = '';
  @Input() disabled: boolean = false;
}
