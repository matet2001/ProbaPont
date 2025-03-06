import {Component, inject} from '@angular/core';
import {IconComponent} from "../../components/icon/icon.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {SalesSectionComponent} from "../../components/sales-section/sales-section.component";
import {TranslatePipe} from "@ngx-translate/core";
import {GlobalService} from "../../services/global/global.service";
import {AuthService} from "../../services/auth/auth.service";
import {async} from "rxjs";

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
        NgStyle
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

    bookings: Map<number, Map<number, Booking>> = new Map();

    constructor(public global: GlobalService, public authService: AuthService) {
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
        return this.getBooking(roomId, time) != null;
    }

    // getBooking(roomId: number, time: number) : Booking | null {
    //     for (const booking of this.bookings) {
    //         if ( booking.roomId === roomId && booking.from <= time && booking.to > time ) {
    //             return booking;
    //         }
    //     }
    //
    //     return null;
    // }

    tryToBook(roomId: number, time: number) {
        if (this.authService.isAuthenticated()) {
            this.planedBookings.push({

            })
        } else {
            this.authService.openModal();
        }
    }

    getBackgroundImage(): string {
        const fallbackImage = 'assets/images/rooms/Terrarium.webp';
        const imageUrl = "assets/images/price_background.jpg" || fallbackImage;
        return `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${imageUrl})`;
    }
}
