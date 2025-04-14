import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, NgForOf, NgStyle } from '@angular/common';
import { SalesSectionComponent } from '../../components/sales-section/sales-section.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../components/button/button.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { BookingService } from '../../services/booking/booking.service';
import { UserService } from '../../services/user/user.service';
import { EmailService } from '../../services/email/email.service';
import { GlobalService } from '../../services/global/global.service';
import { AuthService } from '../../services/auth/auth.service';
import { AuthModalService } from '../../services/auth/auth-modal.service';
import { AlertService } from '../../services/alert/alert.service';
import { RouterLink } from '@angular/router';
import { BookingStatus, Booking, OpeningHours } from '../../models/booking.model';

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
        CommonModule,
        RouterLink
    ],
    templateUrl: './booking.component.html',
})
export class BookingComponent {
    selectedDate: Date = new Date();
    bookings: Map<number, Map<number, Booking>> = new Map();

    openingHours: OpeningHours = { opening: 10, closing: 22 };
    protected readonly BookingStatus = BookingStatus;

    constructor(
        public global: GlobalService,
        private cdr: ChangeDetectorRef,
        private alertService: AlertService,
        private authModalService: AuthModalService,
        public authService: AuthService,
        private bookingService: BookingService,
        private userService: UserService,
        private emailService: EmailService
    ) {
        this.fetchBookings(this.selectedDate);
    }

    getOpeningHours(): number[] {
        return Array.from({ length: this.openingHours.closing - this.openingHours.opening }, (_, i) => i + this.openingHours.opening);
    }

    isBookingPresent(roomId: number, time: number): boolean {
        return !!this.getBooking(roomId, time);
    }

    getBooking(roomId: number, time: number): Booking | undefined {
        return this.bookings.get(roomId)?.get(time);
    }

    onDatePicked(date: Date) {
        this.selectedDate = date;
        this.fetchBookings(date);
    }

    async fetchBookings(date: Date) {
        const data = await this.bookingService.getBookings(date);
        this.bookings = await this.bookingService.mapBookings(data.rooms);
        this.cdr.detectChanges();
    }

    isBookButtonDisabled(): boolean {
        for (const outerMap of this.bookings.values()) {
            for (const booking of outerMap.values()) {
                if (booking.status === BookingStatus.PLANNED) {
                    return true;
                }
            }
        }
        return false;
    }

    async tryToBook(roomId: number, time: number) {
        if (!this.authService.isAuthenticated()) {
            this.alertService.warning("BOOKING.ALERT.LOGIN", "auth");
            this.authModalService.openModal();
            return;
        }

        const user = this.authService.getUser();
        if (!user) return;

        try {
            this.bookingService.planBooking(this.selectedDate, roomId, time, user);
            const updatedBookings = await this.bookingService.getBookings(this.selectedDate);
            this.bookings = await this.bookingService.mapBookings(updatedBookings.rooms);
            this.cdr.detectChanges();
        } catch (error: any) {
            this.alertService.error(error.message);
        }
    }

    async sendBooks() {
        const user = this.authService.getUser();
        if (!user) return;

        try {
            const result = await this.bookingService.confirmPlannedBookings(this.bookings, this.selectedDate, user);
            this.emailService.sendVerificationEmail(user.email, 'Verify Your Booking', result.verificationLink);
            this.alertService.success("A verification email has been sent!");
            this.fetchBookings(this.selectedDate);
        } catch (error: any) {
            this.alertService.error(error.message);
        }
    }

    getBookDisplayName(booking: Booking | undefined): string {
        if (booking?.user) {
            return booking.user.bandName || `${booking.user.fullName.split(" ")[0]} ${booking.user.fullName.charAt(0)}.`;
        }

        if (!booking?.userId) return 'Unknown User';

        const user = this.userService.getCachedUser(booking.userId);
        if (user) {
            return user?.bandName || `${user.fullName.split(" ")[0]} ${user.fullName.charAt(0)}.`;
        }
        return 'Unknown User';
    }

    getBackgroundImage(): string {
        const fallbackImage = 'assets/images/rooms/Terrarium.webp';
        const imageUrl = 'assets/images/price_background.jpg' || fallbackImage;
        return `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${imageUrl})`;
    }
}
