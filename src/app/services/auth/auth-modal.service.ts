import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthModalService {
  private modal: HTMLDialogElement | null = null;
  private document: Document;

  constructor(@Inject(DOCUMENT) private injectedDocument: Document) {
    this.document = injectedDocument;

    this.closeModal();
  }

  initModal() {
    this.modal = this.document.getElementById("authModal") as HTMLDialogElement;
  }

  openModal() {
    this.modal?.showModal();
  }

  closeModal() {
    this.modal?.close();
  }
}
