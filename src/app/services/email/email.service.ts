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

  sendVerificationEmail(to: string, subject: string, verificationLink: string) {
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
<!--            &lt;!&ndash; Logo &ndash;&gt;-->
<!--            <div style="text-align: center; margin-bottom: 20px;">-->
<!--                <img ngSrc="cid:logo" alt="Company Logo" style="max-width: 150px;">-->
<!--            </div>-->

            <!-- Title -->
            <h2 style="color: #008080; text-align: center;">Confirm Your Booking</h2>

            <!-- Message -->
            <p style="font-size: 16px; color: #555;">Hello,</p>
            <p style="font-size: 16px; color: #555;">
                You requested to verify your booking. Click the button below to complete your verification:
            </p>

            <!-- Button -->
            <div style="text-align: center; margin: 20px 0;">
                <a href="${verificationLink}" 
                   style="background-color: #008080; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
                    Verify Booking
                </a>
            </div>

            <!-- Footer -->
            <p style="font-size: 14px; color: #777; text-align: center;">
                If you did not request this, you can ignore this email.
            </p>
            <p style="font-size: 14px; color: #777; text-align: center;">Thank you!</p>
        </div>
    `;
    this.sendEmail(to, subject, emailHtml);
  }
}
