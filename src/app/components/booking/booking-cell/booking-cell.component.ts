import {Component, EventEmitter, HostBinding, inject, Input, Output, SimpleChanges} from '@angular/core';
import {AsyncPipe, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {Booking, BookingIntent, BookingStatus} from "../../../models/booking.model";
import {BookingService} from "../../../services/booking/booking.service";
import {UserService} from "../../../services/user/user.service";

export enum CellState {
  OPEN,
  CLOSED,
  PLANNED,
  PLANNED_CANCELABLE,
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
    NgIf,
  ],
  templateUrl: './booking-cell.component.html',
})
export class BookingCellComponent {
  @Input() booking?: Booking;
  @Input() roomId!: number;
  @Input() time!: number;

  @Output() tryToBook = new EventEmitter<BookingIntent>();
  @Output() tryToDeletePlannedBook = new EventEmitter<BookingIntent>();

  userService = inject(UserService);
  bookingService = inject(BookingService);

  displayName: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['booking']) {
      this.getBookDisplayName();
    }
  }

  getBookDisplayName() {
    const booking = this.booking;

    if (!booking) {
      this.displayName = '';
      return;
    }

    if (booking.user) {
      this.displayName =
          booking.user.bandName ||
          `${booking.user.fullName.split(' ')[0]} ${booking.user.fullName.charAt(0)}.`;
      return;
    }

    if (!booking.userId) {
      this.displayName = '';
      return;
    }

    this.userService.getCachedUser(booking.userId).then((user) => {
      if (user) {
        this.displayName =
            user.bandName || `${user.fullName.split(' ')[0]} ${user.fullName.charAt(0)}.`;
      } else {
        this.displayName = '';
      }
    });
  }

  getCellStatus() : CellState {
    if (this.booking) {
      switch (this.booking?.status) {
        case BookingStatus.PLANNED:
          if (this.bookingService.isCellCancelable(this.roomId, this.time)) {
            return CellState.PLANNED_CANCELABLE;
          }
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
    const baseClasses = 'p-4 text-center relative transition-colors';
    let additionalClasses = '';

    switch (this.getCellStatus()) {
      case CellState.OPEN:
        additionalClasses = 'bg-light-secondary/30 hover:bg-yellow-400/30 relative';
        break;
      case CellState.CLOSED:
        additionalClasses = 'bg-light-secondary/30';
        break;
      case CellState.PLANNED:
        additionalClasses = 'bg-yellow-500/80';
        break;
      case CellState.PLANNED_CANCELABLE:
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