import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {BookingIntent, BookingStatus} from "../../../models/booking.model";

@Component({
  selector: 'td[booking-cell]',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
  ],
  templateUrl: './booking-cell.component.html',
})
export class BookingCellComponent {
  @Input() roomId!: number;
  @Input() time!: number;

  @Output() tryToBook: EventEmitter<BookingIntent> = new EventEmitter();
  @Input() isBookingPresent!: (roomId: number, time: number) => boolean;

  @Input() getBooking!: (roomId: number, time: number) => any;
  @Input() getBookDisplayName!: (booking: any) => string;

  @HostBinding('class')
  get classList(): string {
    const booking = this.getBooking(this.roomId, this.time);
    if (this.isBookingPresent(this.roomId, this.time)) {
      switch (booking?.status) {
        case BookingStatus.VERIFIED:
          return 'p-4 text-center bg-green-400/80';
        case BookingStatus.PLANNED:
          return 'p-4 text-center bg-yellow-500/80';
        case BookingStatus.UNVERIFIED:
          return 'p-4 text-center bg-primary/70';
      }
    }
    return 'bg-light-secondary/30 hover:bg-yellow-400/30 relative text-center p-4';
  }

}
