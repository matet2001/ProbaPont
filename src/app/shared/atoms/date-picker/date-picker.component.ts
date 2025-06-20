import { Component, EventEmitter, Output } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-date-picker",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    TranslatePipe,
  ],
  templateUrl: "./date-picker.component.html",
})
export class DatePickerComponent {
  selectedDate: Date | undefined;

  @Output() dateSelected = new EventEmitter<Date>(); // Emits the date to parent component

  // Function to disable past dates
  pastDatesFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day
    return d >= today; // Allow only today and future dates
  };

  // Handle date change
  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.dateSelected.emit(this.selectedDate); // Emit to parent
  }
}
