import {Component, EventEmitter, HostBinding, inject, Input, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {BookingIntent, BookingStatus} from "../../../models/booking.model";
import {BookingService} from "../../../services/booking/booking.service";

@Component({
  selector: 'td[booking-cell]',
  standalone: true,
  imports: [
    NgIf,
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
    const booking = this.bookingService.getBooking(this.roomId, this.time);
    if (this.bookingService.isBookingPresent(this.roomId, this.time)) {
      switch (booking?.status) {
        case BookingStatus.PLANNED:
          return 'p-4 text-center bg-yellow-500/80 max-h-20';
        case BookingStatus.UNVERIFIED:
          return 'p-4 text-center bg-primary/70';
        case BookingStatus.VERIFIED:
          return 'p-4 text-center bg-green-400/80';
      }
    }
    return 'bg-light-secondary/30 hover:bg-yellow-400/30 relative text-center p-4';
  }

}
