import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileDropdownComponent } from "./profile-dropdown.component";

describe("ProfileDropdownComponent", () => {
  let component: ProfileDropdownComponent;
  let fixture: ComponentFixture<ProfileDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
