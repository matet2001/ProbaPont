import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BookingCellComponent } from "./booking-cell.component";

describe("BookingCellComponent", () => {
  let component: BookingCellComponent;
  let fixture: ComponentFixture<BookingCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
