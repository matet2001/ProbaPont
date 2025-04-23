import {Component, EventEmitter, HostBinding, inject, Input, Output} from '@angular/core';
import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";
import {BookingIntent, BookingStatus} from "../../../models/booking.model";
import {BookingService} from "../../../services/booking/booking.service";

@Component({
  selector: 'td[booking-cell]',
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
  ],
  templateUrl: './booking-cell.component.html',
})
export class BookingCellComponent {
  bookingService: BookingService = inject(BookingService);

  @Input() roomId!: number;
  @Input() time!: number;

  @Output() tryToBook: EventEmitter<BookingIntent> = new EventEmitter();
  @Input() getBookDisplayName!: (booking: any) => string;

  @HostBinding('class')
  get classList(): string {
    const baseClasses = 'p-4 text-center';
    const booking = this.bookingService.getBooking(this.roomId, this.time);

    if (this.bookingService.isBookingPresent(this.roomId, this.time)) {
      switch (booking?.status) {
        case BookingStatus.PLANNED:
          return `${baseClasses} bg-yellow-500/80`;
        case BookingStatus.UNVERIFIED:
          return `${baseClasses} bg-primary/70`;
        case BookingStatus.VERIFIED:
          return `${baseClasses} bg-green-400/80`;
      }
    }

    if(this.bookingService.isCellActive(this.roomId, this.time)) {
      return `${baseClasses} bg-light-secondary/30 hover:bg-yellow-400/30 relative`;
    }

    return `${baseClasses} bg-light-secondary/30`;
  }
}