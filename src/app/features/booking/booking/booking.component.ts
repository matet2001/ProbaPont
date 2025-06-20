import { ChangeDetectorRef, Component } from "@angular/core";
import { CommonModule, NgForOf, NgStyle } from "@angular/common";
import { SalesSectionComponent } from "../../../shared/organisms/sales-section/sales-section.component";
import { TranslatePipe } from "@ngx-translate/core";
import { ButtonComponent } from "../../../shared/atoms/button/button.component";
import { DatePickerComponent } from "../../../shared/atoms/date-picker/date-picker.component";
import { BookingService } from "../../../services/booking/booking.service";
import { UserService } from "../../../services/user/user.service";
import { EmailService } from "../../../services/email/email.service";
import { GlobalService } from "../../../services/global/global.service";
import { AuthService } from "../../../services/auth/auth.service";
import { AuthModalService } from "../../../services/auth/auth-modal.service";
import { AlertService } from "../../../services/alert/alert.service";
import { RouterLink } from "@angular/router";
import { OpeningHours, BookingIntent } from "../../../models/booking.model";
import { BookingCellComponent } from "../booking-cell/booking-cell.component";
import { ConfirmModalService } from "../../../services/modal/confirm-modal.service";

@Component({
  selector: "app-booking",
  standalone: true,
  imports: [
    NgForOf,
    SalesSectionComponent,
    TranslatePipe,
    NgStyle,
    ButtonComponent,
    DatePickerComponent,
    CommonModule,
    RouterLink,
    BookingCellComponent,
  ],
  templateUrl: "./booking.component.html",
})
export class BookingComponent {
  selectedDate: Date = new Date();

  openingHours: OpeningHours = { opening: 10, closing: 22 };

  constructor(
    public global: GlobalService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    private authModalService: AuthModalService,
    public authService: AuthService,
    public bookingService: BookingService,
    private emailService: EmailService,
    private confirmModalService: ConfirmModalService,
  ) {
    this.fetchBookings(this.selectedDate);
  }

  getOpeningHours(): number[] {
    return Array.from(
      { length: this.openingHours.closing - this.openingHours.opening },
      (_, i) => i + this.openingHours.opening,
    );
  }

  onDatePicked(date: Date) {
    this.selectedDate = date;
    this.fetchBookings(date);
  }

  async fetchBookings(date: Date) {
    await this.bookingService.getBookings(date);
    this.cdr.detectChanges();
  }

  tryToPlanBook($event: BookingIntent) {
    if (!this.authService.isAuthenticated()) {
      this.alertService.warning("BOOKING.ALERT.LOGIN", "auth");
      this.authModalService.openModal();
      return;
    }

    this.planBooking($event);
  }

  async planBooking($event: BookingIntent) {
    const user = this.authService.getUser();
    if (!user) return;

    try {
      this.bookingService.planBooking($event.roomId, $event.time, user);
      await this.bookingService.getBookings(this.selectedDate);
      this.cdr.detectChanges();
    } catch (error: any) {
      this.alertService.error(error.message);
    }
  }

  tryToDeletePlannedBook($event: BookingIntent) {
    this.bookingService.deletePlannedBooking($event.roomId, $event.time);
  }

  async tryToSendBooks() {
    if (!this.bookingService.isTherePlannedBooking()) return;

    this.confirmModalService.openModal(
      "BOOKING.CONFIRM_MODAL.TITLE",
      "BOOKING.CONFIRM_MODAL.CONTENT",
      () => this.sendBooks(),
      () => console.log("Cancelled"),
    );
  }

  async sendBooks() {
    const user = this.authService.getUser();
    if (!user) return;

    try {
      const result = await this.bookingService.confirmPlannedBookings(
        this.selectedDate,
        user,
      );
      this.emailService.sendVerificationEmail(
        user.email,
        "Verify Your Booking",
        result.verificationLink,
      );
      this.alertService.success("A verification email has been sent!");
      this.fetchBookings(this.selectedDate);
    } catch (error: any) {
      this.alertService.error(error.message);
    }
  }

  getBackgroundImage(): string {
    const fallbackImage = "assets/images/room/Terrarium.webp";
    const imageUrl = "assets/images/price_background.jpg" || fallbackImage;
    return `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${imageUrl})`;
  }
}
