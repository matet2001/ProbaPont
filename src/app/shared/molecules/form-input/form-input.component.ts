import { Component, forwardRef, Input } from "@angular/core";
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-form-input",
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: "./form-input.component.html",
})
export class FormInputComponent {
  @Input() label!: string;
  @Input() type: string = "text";
  @Input() placeholder!: string;
  @Input() model!: PanningModelType; // ngModel binding
  @Input() name!: string;
  @Input() required: boolean = false;
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() pattern?: string;
  @Input() errorMessage?: string;
}
