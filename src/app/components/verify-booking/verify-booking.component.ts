import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Firestore, doc, runTransaction } from '@angular/fire/firestore';
import {AlertService} from "../../services/alert/alert.service";
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../button/button.component";
import {BookingStatus} from "../../models/booking.model";

@Component({
  selector: 'app-verify-booking',
  templateUrl: './verify-booking.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ButtonComponent
  ]
})
export class VerifyBookingComponent implements OnInit {
  isLoading = true;

  constructor(
      private route: ActivatedRoute,
      private firestore: Firestore,
      private router: Router,
      private alertService: AlertService
  ) {}

  async ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');


    if (!token) {
      this.alertService.error('Invalid or missing token.');
      await this.router.navigate(['/']);
      return;
    }

    try {
      await this.verifyBooking(token);
    } finally {
      this.isLoading = false;
    }
  }

  async verifyBooking(token: string) {
    const verificationDocRef = doc(this.firestore, 'booking_verifications', token);

    try {
      await runTransaction(this.firestore, async (transaction) => {
        const verificationSnapshot = await transaction.get(verificationDocRef);

        if (!verificationSnapshot.exists()) {
          throw new Error('Invalid verification token.');
        }

        const verificationData = verificationSnapshot.data();
        if (!verificationData) throw new Error('Invalid data format.');
        if (verificationData['status'] === BookingStatus.VERIFIED) {
          throw new Error('Booking is already verified.');
        }

        const { userId, date, bookings } = verificationData;
        if (!bookings || typeof bookings !== 'object') {
          throw new Error('No bookings found for verification.');
        }

        const bookingDocRef = doc(this.firestore, 'bookings', date);
        const bookingSnapshot = await transaction.get(bookingDocRef);

        if (!bookingSnapshot.exists()) {
          throw new Error('Booking data not found.');
        }

        // Prepare updates to set all user's bookings as VERIFIED
        const updates: any = {};
        Object.keys(bookings).forEach((roomId) => {
          const timeSlots = bookings[roomId]; // This should be an object, not a Map
          if (typeof timeSlots !== 'object') return;

          Object.keys(timeSlots).forEach((time) => {
            const booking = timeSlots[time];
            if (booking && booking.userId === userId) {
              updates[`rooms.${roomId}.${time}.status`] = BookingStatus.VERIFIED;
            }
          });
        });

        if (Object.keys(updates).length === 0) {
          throw new Error('No bookings to verify.');
        }

        // Apply updates atomically
        transaction.update(bookingDocRef, updates);
        transaction.update(verificationDocRef, { status: 'verified' });
      });

      this.alertService.success('Booking successfully verified!');
      // await this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Verification error:', error);
      this.alertService.error(error.message);
      await this.router.navigate(['/']);
    }
  }
}
