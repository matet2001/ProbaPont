import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { AlertComponent } from "../alert/alert.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgIf, UpperCasePipe } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";
import { error } from "@angular/compiler-cli/src/transformers/util";
import { ButtonComponent } from "../../shared/atoms/button/button.component";
import { ConfirmModalService } from "../../services/modal/confirm-modal.service";
import { emit } from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: "app-confirmation-modal",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, ButtonComponent],
  templateUrl: "./confirmation-modal.component.html",
})
export class ConfirmationModalComponent {
  @Input() title = "";
  @Input() content = "";
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private confirmModalService: ConfirmModalService) {}

  ngOnInit(): void {
    this.confirmModalService.register(this);
  }

  confirm() {
    this.onConfirm.emit();
    this.resetComponent();
  }

  cancel() {
    this.onCancel.emit();
    this.resetComponent();
  }

  resetComponent() {
    this.confirmModalService.closeModal();

    this.onConfirm = new EventEmitter<void>();
    this.onCancel = new EventEmitter<void>();
  }
}
