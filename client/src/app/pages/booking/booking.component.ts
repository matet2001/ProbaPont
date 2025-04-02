import { ChangeDetectorRef, Component } from '@angular/core';
import {CommonModule, DatePipe, NgForOf, NgStyle} from "@angular/common";
import { SalesSectionComponent } from "../../components/sales-section/sales-section.component";
import { TranslatePipe } from "@ngx-translate/core";
import { GlobalService } from "../../services/global/global.service";
import { AuthService } from "../../services/auth/auth.service";
import { ButtonComponent } from "../../components/button/button.component";
import { AlertService } from "../../services/alert.service";
import { DatePickerComponent } from "../../components/date-picker/date-picker.component";
import { Firestore, doc, runTransaction, getDoc } from '@angular/fire/firestore';
import { AuthModalService } from "../../services/auth/auth-modal.service";
import { UserDetails } from "../../services/auth/auth.service";

interface OpeningHours {
    opening: number,
    closing: number,
}

interface Booking {
    userId: string;
    status: BookingStatus;
}

export enum BookingStatus {
    PLANNED,
    UNVERIFIED,
    BOOKED
}

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [
        NgForOf,
        SalesSectionComponent,
        TranslatePipe,
        NgStyle,
        ButtonComponent,
        DatePickerComponent,
        DatePipe,
        CommonModule
    ],
    templateUrl: './booking.component.html',
})
export class BookingComponent {
    selectedDate: Date = new Date();
    bookings: Map<number, Map<number, Booking>> = new Map();
    private userCache: Map<string, UserDetails> = new Map();

    constructor(
        private firestore: Firestore,
        public global: GlobalService,
        private authModalService: AuthModalService,
        public authService: AuthService,
        private cdr: ChangeDetectorRef,
        private alertService: AlertService
    ) {
        this.fetchBookings(this.selectedDate);
    }

    openingHours: OpeningHours = { opening: 10, closing: 22 };

    getOpeningHours(): number[] {
        return Array.from({ length: this.openingHours.closing - this.openingHours.opening }, (_, i) => i + this.openingHours.opening);
    }

    isBookingPresent(roomId: number, time: number): boolean {
        return !!this.getBooking(roomId, time);
    }

    getBooking(roomId: number, time: number): Booking | undefined {
        return this.bookings.get(roomId)?.get(time);
    }

    async fetchBookings(date: Date) {
        const formattedDate = this.formatDate(date);
        const bookingDocRef = doc(this.firestore, 'bookings', formattedDate);
        const bookingSnapshot = await getDoc(bookingDocRef);

        if (bookingSnapshot.exists()) {
            const data = bookingSnapshot.data() as any;
            await this.mapBookingsFromFirestore(data.rooms);
        } else {
            this.bookings = new Map();
        }
        this.cdr.detectChanges();
    }

    async mapBookingsFromFirestore(data: any) {
        this.bookings.clear();

        for (const roomId of Object.keys(data)) {
            const roomBookings = new Map<number, Booking>();

            for (const timeSlot of Object.keys(data[roomId])) {
                const booking = data[roomId][timeSlot];
                const userId = booking.userId;

                let userDetails = this.userCache.get(userId);

                // Fetch user from Firestore only if not in cache
                if (!userDetails) {
                    const userDocRef = doc(this.firestore, "users", userId);
                    const userSnapshot = await getDoc(userDocRef);

                    if (userSnapshot.exists()) {
                        userDetails = userSnapshot.data() as UserDetails;
                        this.userCache.set(userId, userDetails); // Cache the user
                    }
                }

                roomBookings.set(Number(timeSlot), { userId: userId, status: booking.status });
            }

            this.bookings.set(Number(roomId), roomBookings);
        }

        this.cdr.detectChanges();
    }


    onDatePicked(date: Date) {
        this.selectedDate = date;
        this.fetchBookings(date);
    }

    async tryToBook(roomId: number, time: number) {
        if (!this.authService.isAuthenticated()) {
            this.alertService.warning("BOOKING.ALERT.LOGIN", "auth");
            this.authModalService.openModal();
            return;
        }

        const user = this.authService.getUser();
        if (!user) return;

        const formattedDate = this.formatDate(this.selectedDate);
        const bookingDocRef = doc(this.firestore, "bookings", formattedDate);

        try {
            await runTransaction(this.firestore, async (transaction) => {
                const bookingSnapshot = await transaction.get(bookingDocRef);
                const existingData = bookingSnapshot.data();

                // Initialize rooms object if it doesn't exist
                if (!existingData) {
                    transaction.set(bookingDocRef, {
                        rooms: { [roomId]: { [time]: { userId: user.uid, status: BookingStatus.PLANNED } } }
                    });
                    return;
                }

                // Check if the slot is already booked
                if (existingData["rooms"]?.[roomId]?.[time]) {
                    throw new Error("This slot is already booked!");
                }

                // Update only the new slot
                transaction.update(bookingDocRef, {
                    [`rooms.${roomId}.${time}`]: { userId: user.uid, status: BookingStatus.PLANNED }
                });
            });

            // Cache the user immediately after booking
            this.userCache.set(user.uid, user);

            this.alertService.success("Booking confirmed!");
        } catch (error: any) {
            console.error("Booking error:", error);
            this.alertService.error(error.message);
        }

        this.fetchBookings(this.selectedDate);
        this.cdr.detectChanges();
    }



    async sendBooks() {
        const formattedDate = this.formatDate(this.selectedDate);
        const bookingDocRef = doc(this.firestore, "bookings", formattedDate);

        try {
            await runTransaction(this.firestore, async (transaction) => {
                const bookingSnapshot = await transaction.get(bookingDocRef);
                const existingData = bookingSnapshot.data();

                if (!existingData?.["rooms"]) {
                    throw new Error("No bookings found!");
                }

                // Only update the current user's planned bookings
                const updates: any = {};
                this.bookings.forEach((roomBookings, roomId) => {
                    roomBookings.forEach((booking, time) => {
                        if (booking.status === BookingStatus.PLANNED && booking.userId === this.authService.getUser()?.uid) {
                            updates[`rooms.${roomId}.${time}.status`] = BookingStatus.UNVERIFIED;
                        }
                    });
                });

                if (Object.keys(updates).length === 0) {
                    throw new Error("No bookings to confirm.");
                }

                transaction.update(bookingDocRef, updates);
            });

            this.alertService.success("All planned bookings confirmed!");
        } catch (error: any) {
            console.error("Send Books error:", error);
            this.alertService.error(error.message);
        }

        this.fetchBookings(this.selectedDate);
        this.cdr.detectChanges();
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    getBackgroundImage(): string {
        const fallbackImage = 'assets/images/rooms/Terrarium.webp';
        const imageUrl = "assets/images/price_background.jpg" || fallbackImage;
        return `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${imageUrl})`;
    }

    getUserNameFromBooking(booking: Booking | undefined): string {
        if (!booking?.userId) {
            return "Unknown User"; // No userId found in booking
        }

        // Check cache for user details
        const user = this.userCache.get(booking.userId);
        return user ? user.firstName : "Unknown User";
    }

    protected readonly BookingStatus = BookingStatus;
}
