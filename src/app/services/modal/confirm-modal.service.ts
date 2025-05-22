import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ConfirmationModalComponent} from "../../layout/confirmation-modal/confirmation-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  private modal: HTMLDialogElement | null = null;
  private modalComponent: ConfirmationModalComponent | null = null;
  private document: Document;

  constructor(@Inject(DOCUMENT) private injectedDocument: Document) {
    this.document = injectedDocument;
  }

  register(modalComponent: ConfirmationModalComponent) {
    this.modalComponent = modalComponent;
    this.initModal();
  }

  initModal() {
    this.modal = this.document.getElementById("confirmationModal") as HTMLDialogElement;
  }

  openModal(title: string, content: string, onConfirm?: () => void, onCancel?: () => void) {
    if (!this.modalComponent) return;

    this.modalComponent.title = title;
    this.modalComponent.content = content;

    if (onConfirm) this.modalComponent.onConfirm.subscribe(onConfirm);
    if (onCancel) this.modalComponent.onCancel.subscribe(onCancel);

    this.modal?.showModal();
  }

  closeModal() {
    this.modal?.close();
  }
}
