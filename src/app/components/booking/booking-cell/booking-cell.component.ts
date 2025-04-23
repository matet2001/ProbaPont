import {Component, EventEmitter, HostBinding, inject, Input, Output} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {BookingIntent, BookingStatus} from "../../../models/booking.model";
import {BookingService} from "../../../services/booking/booking.service";

export enum CellState {
  OPEN,
  CLOSED,
  PLANNED,
  UNVERIFIED,
  VERIFIED
}

@Component({
  selector: 'td[booking-cell]',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
  ],
  templateUrl: './booking-cell.component.html',
})
export class BookingCellComponent {
  bookingService: BookingService = inject(BookingService);

  @Input() roomId!: number;
  @Input() time!: number;

  @Output() tryToBook: EventEmitter<BookingIntent> = new EventEmitter();
  @Output() tryToDeletePlannedBook: EventEmitter<BookingIntent> = new EventEmitter();
  @Input() getBookDisplayName!: (booking: any) => string;

  getCellStatus() : CellState {
    const booking = this.bookingService.getBooking(this.roomId, this.time);

    if (this.bookingService.isBookingPresent(this.roomId, this.time)) {
      switch (booking?.status) {
        case BookingStatus.PLANNED:
          return CellState.PLANNED;
        case BookingStatus.UNVERIFIED:
          return CellState.UNVERIFIED;
        case BookingStatus.VERIFIED:
          return CellState.VERIFIED;
      }
    }

    if(this.bookingService.isCellActive(this.roomId, this.time)) {
      return CellState.OPEN;
    }

    return CellState.CLOSED;
  }

  @HostBinding('class')
  get classList(): string {
    const baseClasses = 'p-4 text-center relative';
    let additionalClasses = '';

    switch (this.getCellStatus()) {
      case CellState.OPEN:
        additionalClasses = 'bg-light-secondary/30 hover:bg-yellow-400/30 relative transition-colors';
        break;
      case CellState.CLOSED:
        additionalClasses = 'bg-light-secondary/30';
        break;
      case CellState.PLANNED:
        additionalClasses = 'bg-yellow-500/80 hover:bg-red-500/80';
        break;
      case CellState.UNVERIFIED:
        additionalClasses = 'bg-primary/70';
        break;
      case CellState.VERIFIED:
        additionalClasses = 'bg-green-400/80';
        break;
    }

    return `${baseClasses} ${additionalClasses}`;
  }

  protected readonly CellState = CellState;
}