import { Injectable } from "@angular/core";
import {
  doc,
  Firestore,
  getDoc,
  runTransaction,
  setDoc,
} from "@angular/fire/firestore";
import { UserDetails } from "../auth/auth.service";
import { Booking, BookingStatus } from "../../models/booking.model";
import { UserService } from "../user/user.service";
import { format } from "date-fns";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private localPlannedBookings: Map<number, Map<number, Booking>> = new Map();
  fetchedBookings: Map<number, Map<number, Booking>> = new Map();

  constructor(
    private firestore: Firestore,
    private userService: UserService,
  ) {}

  async getBookings(date: Date) {
    this.fetchedBookings = await this.fetchBookings(date);
  }

  async fetchBookings(date: Date): Promise<Map<number, Map<number, Booking>>> {
    const ref = doc(this.firestore, "bookings", this.formatDate(date));
    const snap = await getDoc(ref);

    const bookingMap = new Map<number, Map<number, Booking>>();

    if (snap.exists()) {
      const data = snap.data() as {
        rooms: Record<number | string, Record<number | string, Booking>>;
      };

      for (const roomId in data.rooms) {
        const timeMap = new Map<number, Booking>();
        const bookings = data.rooms[roomId];

        for (const time in bookings) {
          timeMap.set(Number(time), bookings[time]);
        }

        bookingMap.set(Number(roomId), timeMap);
      }
    }

    return bookingMap;
  }

  async mapBookings(): Promise<Map<number, Map<number, Booking>>> {
    const result = new Map<number, Map<number, Booking>>();
    const data: any = this.fetchedBookings;

    for (const [roomId, timeMap] of data.entries()) {
      const roomMap = new Map<number, Booking>();
      for (const [time, booking] of timeMap.entries()) {
        booking.user = await this.userService.fetchUser(booking.userId);
        roomMap.set(time, booking);
      }
      result.set(roomId, roomMap);
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

  planBooking(roomId: number, time: number, user: UserDetails): void {
    const roomMap =
      this.localPlannedBookings.get(roomId) || new Map<number, Booking>();

    if (roomMap.has(time)) {
      throw new Error("This slot is already planned!");
    }

    roomMap.set(time, {
      status: BookingStatus.PLANNED,
      userId: user.uid,
      user: user,
    });
    this.localPlannedBookings.set(roomId, roomMap);
  }

  deletePlannedBooking(roomId: number, time: number): void {
    if (!this.localPlannedBookings.has(roomId)) return;

    const roomMap = this.localPlannedBookings.get(roomId)!;
    roomMap.delete(time);

    if (roomMap.size === 0) {
      this.localPlannedBookings.delete(roomId);
    }
  }

  async confirmPlannedBookings(
    date: Date,
    user: UserDetails,
  ): Promise<{ verificationLink: string }> {
    const formattedDate = this.formatDate(date);
    const ref = doc(this.firestore, "bookings", formattedDate);

    await runTransaction(this.firestore, async (tx) => {
      const snap = await tx.get(ref);
      let existing = snap.data();

      if (!snap.exists()) {
        existing = { rooms: {} };
        tx.set(ref, existing);
      }

      const updates: any = {};
      this.localPlannedBookings.forEach((roomMap, roomId) => {
        roomMap.forEach((booking, time) => {
          if (
            booking.userId === user.uid &&
            booking.status === BookingStatus.PLANNED
          ) {
            updates[`rooms.${roomId}.${time}.status`] =
              BookingStatus.UNVERIFIED;
            updates[`rooms.${roomId}.${time}.userId`] = user.uid;
          }
        });
      });

      if (Object.keys(updates).length === 0) {
        throw new Error("No bookings to confirm.");
      }

      tx.update(ref, updates);
    });

    const verificationToken = this.generateVerificationToken();
    const verificationRef = doc(
      this.firestore,
      "booking_verifications",
      verificationToken,
    );
    const combinedMaps = await this.mapBookings();
    const serialized = this.convertMapToObject(combinedMaps);
    await setDoc(verificationRef, {
      userId: user.uid,
      date: formattedDate,
      bookings: serialized,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    this.localPlannedBookings.clear();
    return {
      verificationLink: `http://localhost:4200/verify-booking?token=${verificationToken}`,
    };
  }

  private convertMapToObject(map: Map<any, any>): any {
    const obj: any = {};
    map.forEach((value, key) => {
      obj[key] = value instanceof Map ? this.convertMapToObject(value) : value;
    });
    return obj;
  }

  public isCellActive(cellRoomId: number, cellTime: number): boolean {
    if (this.localPlannedBookings.size === 0) return true;

    for (const [roomId, roomMap] of this.localPlannedBookings) {
      if (roomMap.size === 0) return true;
      if (roomId === cellRoomId) {
        for (const [time, _] of roomMap) {
          if (Math.abs(cellTime - time) === 1) {
            return true;
          }
        }
      }
    }

    return false;
  }

  public isCellCancelable(cellRoomId: number, cellTime: number): boolean {
    for (const [roomId, roomMap] of this.localPlannedBookings) {
      if (roomId === cellRoomId) {
        const array = Array.from(roomMap.keys());
        array.sort((a, b) => a - b);
        if (array[0] === cellTime || array.at(-1) === cellTime) {
          return true;
        }
      }
    }
    return false;
  }

  public isTherePlannedBooking(): boolean {
    for (const [_, roomMap] of this.localPlannedBookings) {
      for (const [time, _] of roomMap) {
        if (roomMap?.get(time)?.status === BookingStatus.PLANNED) {
          return true;
        }
      }
    }

    return false;
  }

  public getBooking(roomId: number, time: number): Booking | undefined {
    return (
      this.fetchedBookings?.get(roomId)?.get(time) ||
      this.localPlannedBookings?.get(roomId)?.get(time)
    );
  }

  private formatDate(date: Date): string {
    return format(date, "yyyy-MM-dd");
  }

  private generateVerificationToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
