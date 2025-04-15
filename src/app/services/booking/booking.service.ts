import { Injectable } from '@angular/core';
import {doc, Firestore, getDoc, runTransaction, setDoc} from "@angular/fire/firestore";
import {UserDetails} from "../auth/auth.service";
import {Booking, BookingStatus} from "../../models/booking.model";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private localPlannedBookings: Map<number, Map<number, Booking>> = new Map();

  constructor(private firestore: Firestore, private userService: UserService) {}

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  async getBookings(date: Date): Promise<any> {
    const ref = doc(this.firestore, 'bookings', this.formatDate(date));
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : { rooms: {} };
  }

  async mapBookings(data: any): Promise<Map<number, Map<number, Booking>>> {
    const result = new Map<number, Map<number, Booking>>();

    for (const roomId of Object.keys(data)) {
      const roomMap = new Map<number, Booking>();
      for (const time of Object.keys(data[roomId])) {
        const booking: Booking = data[roomId][time];
        booking.user = await this.userService.fetchUser(booking.userId);
        roomMap.set(Number(time), booking);
      }
      result.set(Number(roomId), roomMap);
    }

    // Merge local planned bookings
    this.localPlannedBookings.forEach((roomMap, roomId) => {
      if (!result.has(roomId)) result.set(roomId, new Map());
      const existingRoomMap = result.get(roomId)!;
      roomMap.forEach((booking, time) => {
        if (!existingRoomMap.has(time)) {
          existingRoomMap.set(time, booking);
        }
      });
    });

    return result;
  }

  planBooking(date: Date, roomId: number, time: number, user: UserDetails): void {
    const roomMap = this.localPlannedBookings.get(roomId) || new Map<number, Booking>();

    if (roomMap.has(time)) {
      throw new Error('This slot is already planned!');
    }

    roomMap.set(time, { status: BookingStatus.PLANNED, userId: user.uid, user: user });
    this.localPlannedBookings.set(roomId, roomMap);
  }

  async confirmPlannedBookings(
      bookings: Map<number, Map<number, Booking>>,
      date: Date,
      user: UserDetails
  ): Promise<{ verificationLink: string }> {
    const formattedDate = this.formatDate(date);
    const ref = doc(this.firestore, 'bookings', formattedDate);
    const verificationToken = this.generateVerificationToken();
    const verificationRef = doc(this.firestore, 'booking_verifications', verificationToken);

    await runTransaction(this.firestore, async (tx) => {
      const snap = await tx.get(ref);
      const existing = snap.data();
      if (!existing?.['rooms']) throw new Error('No bookings found!');

      const updates: any = {};
      bookings.forEach((room, roomId) => {
        room.forEach((booking, time) => {
          if (booking.userId === user.uid && booking.status === BookingStatus.PLANNED) {
            updates[`rooms.${roomId}.${time}.status`] = BookingStatus.UNVERIFIED;
            updates[`rooms.${roomId}.${time}.userId`] = user.uid;
          }
        });
      });

      if (Object.keys(updates).length === 0) {
        throw new Error('No bookings to confirm.');
      }

      tx.update(ref, updates);
    });

    const serialized = this.convertMapToObject(bookings);
    await setDoc(verificationRef, {
      userId: user.uid,
      date: formattedDate,
      bookings: serialized,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return { verificationLink: `http://localhost:4200/verify-booking?token=${verificationToken}` };
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private convertMapToObject(map: Map<any, any>): any {
    const obj: any = {};
    map.forEach((value, key) => {
      obj[key] = value instanceof Map ? this.convertMapToObject(value) : value;
    });
    return obj;
  }
}
