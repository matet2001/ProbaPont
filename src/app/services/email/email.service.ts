import { Injectable } from '@angular/core';
import {addDoc, collection, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private firestore: Firestore) {}

  sendEmail(to: string, subject: string, body: string) {
    const mailCollection = collection(this.firestore, 'mail');
    return addDoc(mailCollection, {
      to: [to],
      message: {
        subject: subject,
        html: body,
      }
    });
  }
}
