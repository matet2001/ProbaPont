import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsSectionComponent } from './rooms-section.component';

describe('RoomsComponent', () => {
  let component: RoomsSectionComponent;
  let fixture: ComponentFixture<RoomsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
