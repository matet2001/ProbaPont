import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {SalesSectionComponent} from "../../components/sales-section/sales-section.component";
import {TranslatePipe} from "@ngx-translate/core";
import {GlobalService} from "../../services/global/global.service";
import {AuthService} from "../../services/auth/auth.service";
import {ButtonComponent} from "../../components/button/button.component";
import {AlertService} from "../../services/alert.service";
import {AuthModalService} from "../../services/auth/auth-modal.service";

interface OpeningHours {
    opening: number,
    closing: number,
}

interface Booking {
    user: string,
    status: BookingStatus,
}

interface BookingFromBackend {
    from: number,
    to: number,
    user: string,
    roomId: number,
}

enum BookingStatus {
    PLANNED,
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
        ButtonComponent
    ],
  templateUrl: './booking.component.html',
})
export class BookingComponent {
    openingHours: OpeningHours = {
        opening: 10,
        closing: 22,
    }

    bookingsFromBackend: BookingFromBackend[] = [
        {
            from: 15,
            to: 18,
            user: "Green Day",
            roomId: 2,
        },
        {
            from: 18,
            to: 21,
            user: "Iron Maiden",
            roomId: 3,
        }
    ]
    authModalService: AuthModalService = inject(AuthModalService);


    bookings: Map<number, Map<number, Booking>> = new Map()

    constructor(public global: GlobalService, public authService: AuthService, private cdr: ChangeDetectorRef, private alertService: AlertService) {
        this.fillBookings(this.bookingsFromBackend);
    }

    fillBookings(bookingsFromBackend: BookingFromBackend[]) {
        for (const booking of bookingsFromBackend) {
            let bookingsOnCurrentRoom : Map<number, Booking> = new Map<number, Booking>();

            for (let i = booking.from; i < booking.to; i++) {
                bookingsOnCurrentRoom.set(i, {status: BookingStatus.BOOKED, user: booking.user})
            }

            this.bookings.set(booking.roomId, bookingsOnCurrentRoom);
        }
    }

    getOpeningHours() : number[] {
        const resultArray : number[] = [];

        for (let i = this.openingHours.opening; i < this.openingHours.closing - 1; i++) {
            resultArray.push(i);
        }

        return resultArray;
    }

    isBookingPresent(roomId: number, time: number) : boolean {
        return this.getBooking(roomId, time) != undefined;
    }

    getBooking(roomId: number, time: number) : Booking | undefined {
       return this.bookings.get(roomId)?.get(time);
    }

    tryToBook(roomId: number, time: number) {
        if (this.authService.isAuthenticated()) {
            const newBookings = new Map(this.bookings);
            let roomBookings = newBookings.get(roomId) || new Map<number, Booking>();

            roomBookings.set(time, <Booking>{
                status: BookingStatus.PLANNED,
                user: this.authService.getUser()?.email
            });

            newBookings.set(roomId, roomBookings);
            this.bookings = newBookings;

            this.cdr.detectChanges();
        }
        else {
            this.alertService.warning("BOOKING.ALERT.LOGIN", "auth");
            this.authModalService.openModal();
        }
    }

    sendBooks() {
        this.bookings.forEach((roomBookings) => {
            roomBookings.forEach((booking, time) => {
                booking.status = BookingStatus.BOOKED;
            });
        });

        this.alertService.success("BOOKING.ALERT.SUCCESS");
    }

    canBook() : null | boolean {
        console.log(!this.bookings.has(BookingStatus.PLANNED));
        return !this.bookings.has(BookingStatus.PLANNED)
    }

    getBackgroundImage(): string {
        const fallbackImage = 'assets/images/rooms/Terrarium.webp';
        const imageUrl = "assets/images/price_background.jpg" || fallbackImage;
        return `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${imageUrl})`;
    }

    protected readonly BookingStatus = BookingStatus;
}
